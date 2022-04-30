import { RequestHandler } from 'express';
import ParentService from '../services/ParentService';
import Validators from '../validators/Validator';
import AgeRange from '../entities/AgeRange';
import Gender from '../entities/Gender';


// temporarily until we get it directly from DB
const ageRanges = AgeRange.values();
const genderItems = Gender.values();


export const createParentAccount: RequestHandler = (req, res, next) => {
    const email = req.body.email;
    const first_name = req.body.first_name.trim();
    const last_name = req.body.last_name.trim();
    const password = req.body.password;

    const name = req.body.name.trim();
    const age = req.body.age;
    const gender = req.body.gender ? req.body.gender : undefined;

    const validator = new Validators();

    validator.emailValidator(email);
    validator.minLengthValidator(first_name, 3, 'first_name');
    validator.minLengthValidator(last_name, 3, 'last_name');
    validator.minLengthValidator(password, 6, 'password');

    validator.minLengthValidator(name, 3, 'name');

   // if(gender) validator.isInArray(gender, genderItems, 'gender');
   // validator.isInArray(age, ageRanges, 'age');


    const errors = validator.validateInputs();
    
    if(errors.length > 0) {
        res.status(400).json({
            "data": [],
            "error": errors
        })
    }
    const parentService = new ParentService();
    parentService.createParent(first_name, last_name, email, password, name, age, gender)
    .then(response => {
        res.status(201).json({
            "data": response?.rows,
            "error": []
        })
    })
    .catch(err => {
        // todo: create a class for error handling
        res.status(400).json({
            "data": [],
            "error": err
        })
    })
}

export const updateParentAccount:RequestHandler = (req, res, next) => {
    
    const parentId = req.body.id.trim();
    const firstName = req.body.first_name ? req.body.first_name.trim() : undefined;
    const lastName = req.body.last_name ? req.body.last_name.trim() : undefined;

    const validator = new Validators();

    validator.minLengthValidator(parentId, 36, 'id');
    validator.minLengthValidator(firstName, 2, 'first_name');
    validator.minLengthValidator(lastName, 2, 'last_name');

    const errors = validator.validateInputs();
    if (errors.length > 0) {
        res.status(400).json({
            "data": [],
            "errors": errors
        });
    } else {
        const parentService = new ParentService();
        const data = {first_name: firstName, last_name: lastName};
        parentService.updateParent(parentId, data)
        .then(response => {
            if(response) {
                res.status(200).json({
                    "data": response.rows[0],
                    "errors": []
                });
            } else {
                res.status(400).json({
                    "data": [],
                    "errors": "no users found"
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                "data": [],
                "errors": errors
            });
        })
    }
   
}

export const getParents: RequestHandler = (req, res, next) => {
    const parentService = new ParentService();
    parentService.getParents()
    .then(response => {
        res.json({
            "data" : response.rows,
            "error": []
        });
    })
    .catch(err => {
        res.json({
            "data": [],
            "error": err
        });
    });
}

export const updateStatus:RequestHandler = (req, res, next) => {
    // todo: the method will check the parent status and will block/unblock 
    // accordingly (it will work while we just have the block/unblock possibility).
}

export const getParentById:RequestHandler = (req, res, next) => {
    const parentId = req.body.id.trim();
    if(parentId) {
        const parentService = new ParentService();
        parentService.getParentById(parentId)
        .then(response => {
            res.json({
                "data" : response.rows,
                "error": []
            });
        })
        .catch(err => {
            res.json({
                "data": [],
                "error": err
            });
        })
    } else {
        res.json({
            "data": [],
            "error": "field must not be empty"
        });
    }
}