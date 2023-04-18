import Joi from "joi";
import { emailValidator, phoneValidator } from "../helpers/custom.validation";

export const login = {
    body: {
        user_name: Joi.string().trim(true).required(),
        password: Joi.string().trim(true).required(),
    }
};

export const register = {
        body: {
            name: Joi.string().trim(true).required(),
            email:Joi.string().trim(true).required(),
            phone: Joi.string().trim(true).required(),
            password: Joi.string().trim(true).required()            
        }
}