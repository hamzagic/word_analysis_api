import { RequestHandler } from "express";
import AWS, { TranscribeService } from "aws-sdk";
import fs from "fs";
import { config } from "dotenv";
import { v4 as uuid } from "uuid";
import { GetObjectRequest, PutObjectRequest } from "aws-sdk/clients/s3";
import TranscriptionService from "../services/TranscriptionService";
import Validator from '../validators/Validator';

config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const transcribeService = new AWS.TranscribeService({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

let jobName: string | undefined;
let savedJobName: string;
let audioUrl: string;
const parentId = "0a1377c8-2439-4b3f-a646-6b1867a1fc5b";
const childId = "054c1d61-ad26-46b8-9c47-a19b10a3a84c";

export const sendTranscriptionJob: RequestHandler = async (req, res, next) => {
  // example model
  // const email = (req.body as { email: string }).email;
  const fileName = req.file.originalname;
  const filePath = req.file.path;
  const fileStream = fs.createReadStream(filePath);

  const params: PutObjectRequest | any = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `data/${fileName}`,
    Body: fileStream,
    ContentType: "audio/mpeg",
  };

  s3.upload(params, (error: Error, data: any) => {
    if (error) {
      res.status(500).send(error);
    }
    audioUrl = data.Location;
    let audioS3Key = data.key;
    fs.unlinkSync("./uploads/" + req.file.filename);

    const id: string = uuid();
    const awsUrl = "s3://" + process.env.AWS_BUCKET_NAME + "/" + data.key;
    const transcribeParams: TranscribeService.Types.StartTranscriptionJobRequest =
      {
        TranscriptionJobName: `${id}.job`,
        LanguageCode: "en-US",
        Media: {
          MediaFileUri: awsUrl,
        },
        OutputBucketName: process.env.AWS_BUCKET_NAME!,
        OutputKey: "jobs/" + id,
        Settings: {
          MaxSpeakerLabels: 2,
          ShowSpeakerLabels: true,
          ShowAlternatives: true,
          MaxAlternatives: 2,
        },
      };

    transcribeService.startTranscriptionJob(
      transcribeParams,
      (err, transcriptResult) => {
        if (err) {
          res.status(500).send(err);
        }

        jobName = transcriptResult.TranscriptionJob?.TranscriptionJobName;
        if (jobName) {
          saveJobName(jobName);
          const mediaUri =
            transcriptResult!.TranscriptionJob!.Media!.MediaFileUri;
          const transcriptionService = new TranscriptionService();
          transcriptionService
            .addTranscriptionJob(
              parentId,
              childId,
              audioUrl,
              mediaUri!,
              jobName
            )
            .then((result) => {
              console.log(result);
             res.status(201).json({
               "data":
                 {
                   "transcriptionJob": transcriptResult,
                   "transcription": result.rows
                 },
               "error": []
             })
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    );
  });
};

export const status: RequestHandler = (req, res, next) => {
  let tempJob = getJobName();
  console.log(tempJob);
  const params = {
    TranscriptionJobName: tempJob,
  };

  transcribeService.getTranscriptionJob(params, (error, data) => {
    if (error) {
      res.status(500).send(error);
    }

    if (
      data.TranscriptionJob &&
      data.TranscriptionJob.TranscriptionJobStatus === "COMPLETED"
    ) {
      let url = data.TranscriptionJob.Transcript?.TranscriptFileUri;
      const obj = url?.split("/jobs/")[1];
      const getParams: GetObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: `jobs/${obj}`,
      };
      s3.getObject(getParams, (statusError, jobData) => {
        if (statusError) {
          res.status(500).send(statusError);
        }
        const jsonFile = jobData.Body?.toString("utf-8");
        if (jsonFile) {
          const parsedJson = JSON.parse(jsonFile);
          const transcriptionText = parsedJson.results.transcripts[0].transcript;
          const transcriptionService = new TranscriptionService();
          transcriptionService.updateTranscription(tempJob, transcriptionText)
          .then(resultData => {
            res.status(200).send(JSON.parse(jsonFile));
          })
          .catch(errors => {
            console.log(errors);
          })
        }
      });
    } else {
      console.log("File not processed yet");
      res.status(200).json({ Message: "File not processed yet" });
    }
  });
};

export const listJobsByParentId: RequestHandler = (req, res, next) => {
  // todo: desc order (newer jobs first)
  const parentId = req.body.parentId.trim();
  
  if(parentId) {
    const transcriptionService = new TranscriptionService();
    transcriptionService.listJobsByParentId(parentId)
    .then(response => {
      res.json({
        "data": response.rows,
        "error": []
      });
    })
    .catch(err => {
      res.json({
        "data": [],
        "error": err
      });
    });
  } else {
    res.status(400).json({
      "data": [],
      "error": "invalid blank fields"
    });
  }

};

function saveJobName(name: string) {
  savedJobName = name;
}

function getJobName() {
  return savedJobName;
}