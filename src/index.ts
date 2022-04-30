import express, { Application, Request, Response, NextFunction, json } from 'express';
import multer from 'multer';

import transcriptRouter from './routes/transcriptionRoute';
import parentRoute from './routes/parentRoute';
import childRoutes from './routes/childRoutes';
import wordCategoryRoutes from './routes/wordCategoryRoutes';
import wordRoutes from './routes/wordRoutes';

import { config } from 'dotenv';

config();

const app: Application = express();
const upload = multer();

app.use(json());

app.use('/transcript', transcriptRouter);
app.use(parentRoute);
app.use(childRoutes);
app.use(wordCategoryRoutes);
app.use(wordRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send("hello");
});

// error handling on routes - todo: add proper folder/file to it
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

app.listen(3300, () => {
    console.log('Server running...');
});
