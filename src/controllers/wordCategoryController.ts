import { RequestHandler } from 'express';
import WordCategoryService from '../services/WordCategoryService';
import Validator from '../validators/Validator';



export const create:RequestHandler = (req, res, next) => {
    const name = req.body.name.trim();

    const validator = new Validator();

    validator.minLengthValidator(name, 2, 'name');

    const errors = validator.validateInputs();
    
    if(errors.length > 0) {
        res.status(400).json({
            "data": [],
            "error": errors
        });
    }

    const wordCategoryService = new WordCategoryService();
    wordCategoryService.create(name)
    .then(response => {
        console.log(response)
        if(response) {
            const data = response.rows;
            res.status(201).json({
                "data": data,
                "error": []
            });
        } else {
            res.status(201).json({
                "data": [],
                "error": "category already exists"
            });
        }
    })
    .catch(err => console.log(err));
}

export const update: RequestHandler = (req, res, next) => {
    // won't do for now - first need to set status as env
    // since any change can break the application
}

export const list:RequestHandler = (req, res, next) => {
    const wordCategoryService = new WordCategoryService;
    wordCategoryService.list()
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
    })
}

export const changeStatus:RequestHandler = (req, res, next) => {
    const categoryId = parseInt(req.params.id);
    const wordCategoryService = new WordCategoryService();
    wordCategoryService.changeStatus(categoryId)
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