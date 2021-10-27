/**
 * Validations rules and schema for user model
 */

const Joi = require('joi');

// Schema validation
const schema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(150)
        .required(),

    availableQuantity: Joi.number()
        .min(1)
        .required(),
    
    price: Joi.number()
        .min(1)
        .required(),

    description: Joi.string()
        .min(1)
        .required(),

    image: Joi.string(),

    slug: Joi.string()
});

/**
 * Middleweare for validate rules and schema of prodyct data
 * in create or update request 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {Function} next 
 */
const validateProductData = async (req, res, next) => {
        
    const body = req.body;
    try {
        await schema.validateAsync(body);
        next();
    }
    catch(error){
        console.log(error);
        return res.status(422).json(error);
    }
    
}

module.exports = {
    validateProductData
}