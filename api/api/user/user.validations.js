/**
 * Validations rules and schema for user model
 */

const Joi = require('joi');
const User = require('./user.model');

// Schema validation
const schema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    
    role: Joi.string()
        .pattern(new RegExp('admin|user'))
        .required(),

});

/**
 * Validate unique email for user model
 * @param {Objetc} body
 * @returns {void}
 */
const validateEmailNoRepeat = async (body) => {
    const user = await User.findOne({email: body.email}).exec();
    if (user) {
        if (this.id === user.id) {
            return;
        }
    const error = new Error("Email is registered");
    error.error =  "Email is registered";
    throw error;   
    }
    return;
}


/**
 * Middleweare for validate rules and schema of user data
 * in create or update request 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {Function} next 
 */
const validateUserData = async (req, res, next) => {
        
    const body = req.body;
    try {
        await schema.validateAsync(body);
        await validateEmailNoRepeat(body);
        next();
    }
    catch(error){
        console.log(error);
        return res.status(422).json(error);
    }
    
}

module.exports = {
    validateUserData
}