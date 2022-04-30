import { RequestHandler } from 'express';
import WordService from '../services/wordService';
import Validator from '../validators/Validator';

export const create:RequestHandler = (req, res, next) => {
    const name = req.body.name.trim();
    const description = req.body.description.trim();
    const categoryId = req.body.categoryId;
    // create class to handle file uploads

    const validator = new Validator();
    validator.minLengthValidator(name, 2, 'name');
    validator.minLengthValidator(description, 6, 'description');
    validator.isInteger(categoryId, 'categoryId');

    const errors = validator.validateInputs();

    if(errors.length > 0) {
        res.status(400).json({
            "data": [],
            "error": errors
        });
    }

    const wordService = new WordService();
    wordService.create(name, categoryId, description)
    .then(response => {
        if(response) {
            res.status(201).json({
                "data": response.rows,
                "error": []
            });
        } else {
            res.status(400).json({
                "data": [],
                "error": "word category was not found"
            });
        }
    })
    .catch(err => {
        console.log(err);
    })
}

export const update: RequestHandler = (req, res, next) => {

}

export const list:RequestHandler = (req, res, next) => {
    const wordService = new WordService();
    wordService.list()
    .then(response => {
        res.json({
            "data": response.rows,
            "error": []
        });
    })
    .catch(err => {
        res.status(400).json({
            "data": [],
            "error": err    
        })
    })
}

export const updateStatus:RequestHandler = (req, res, next) => {
    const categoryId = parseInt(req.params.id);
    const wordService = new WordService();
    wordService.updateStatus(categoryId)
    .then(response => {
        if(response) {
            res.status(200).json({
                "data": response.rows,
                "error": []
            });
        } else {
            res.status(200).json({
                "data": [],
                "error": "could not find category"
            });
        }
    })
    .catch(err => {
        console.log(err);
    })
}

export const getByName:RequestHandler = (req, res, next) => {
    const wordName = req.body.name.trim();
    const validator = new Validator();

    validator.minLengthValidator(wordName, 2, 'name');
    const errors = validator.validateInputs();

    if(errors.length > 0) {
        res.status(400).json({
            "data": [],
            "error": errors
        });
        res.end();
    }

    const wordService = new WordService();
    wordService.getByName(wordName)
    .then(response => {
        res.status(200).json({
            "data": response.rows,
            "error": []
        });
    })
    .catch(err => {
        res.status(400).json({
            "data": [],
            "error": err
        });
        res.end();
    })
}