import { RequestHandler } from 'express';
import ChildService from '../services/ChildService';
import Validators from '../validators/Validator';
import AgeRange from '../entities/AgeRange';
import Gender from '../entities/Gender';

const ageRanges = AgeRange.values();
const genderItems = Gender.values();

export const createChildAccount: RequestHandler = (req, res, next) => {
    const name = req.body.name.trim();
    const age = req.body.age;
    const gender = req.body.gender;

    const validator = new Validators();
    validator.minLengthValidator(name, 3, 'name');
    // validator.isInArray(age, ageRanges, 'age');
    // if(gender) validator.isInArray(gender, genderItems, 'gender');

    const errors = validator.validateInputs();
    
    if(errors.length > 0) {
        res.status(400).json({
            "data": [],
            "error": errors
        })
    }

    const childService = new ChildService;
    childService.createChild(name, age, gender)
    .then(response => {
        console.log(response);
        res.status(201).json({
            "data": response?.rows,
            "error": []
        })
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            "data": [],
            "error": err
        })
    })
}