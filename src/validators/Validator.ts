import validator from 'validator';

export default class Validators
{
    private errorMessage!: string;
    private errors: object[] = [];

    validateInputs() {
        return this.errors;
    }

    emailValidator(email: string) {
        if(!email || (!validator.isEmail(email))) {
           this.errorMessage = 'invalid email address';
           this.errors.push({"email" : this.errorMessage});
        }
        return this.errorMessage;
    }

    minLengthValidator(name: string, minLength: number, field: string) {
        const inputValue = this.inputEscape(name);
        
        if(inputValue.length < minLength) {
            this.errorMessage = `this field must have at least ${minLength} characters`;
            this.errors.push({ [field]: this.errorMessage });
        }
        return this.errorMessage;
    }

    inputEscape(data: string) {
        return escape(data);
    }

    isInArray(data: string, baseArray: string[], field: string)
    {
        if(!validator.isIn(data, baseArray)) {
            this.errorMessage = 'invalid input';
            this.errors.push({[field]: this.errorMessage});
        }
        return this.errorMessage;
    }

    isInteger(data: number, field: string)
    {
        if(!Number.isInteger(data)) {
            this.errorMessage = 'invalid input';
            this.errors.push({ [field]: this.errorMessage });
        }
        return this.errorMessage;
    }
}