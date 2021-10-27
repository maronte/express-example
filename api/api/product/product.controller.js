/**
 *  Product controller
 */

// Imports
const Product = require('./product.model');
const {
    respondWithResult,
    handleEntityNotFound,
    handleError
} = require('./../../util/helpers.controller');

/**
 * Get product list
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
async function getAll(req, res) {
    try {
        const products = await Product.find().exec(); 
        respondWithResult(res, products);  
    } catch (error) {
        handleError(res, error);
    }      
}

/**
 * create a product 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
async function create(req, res) {
    try {
        const product = await Product.create(req.body);
        respondWithResult(res, product);
    } catch (error) {
        handleError(res, error);
    }
}

/**
 * get product by id 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
async function getById(req, res) { 
    try {
        const product = await Product.findById(req.params.id).exec();
        handleEntityNotFound(res, product);
        respondWithResult(res, product);
    } catch (error) {
        handleError(res, error);
    }
}

/**
 * update a product by id
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
async function updateById(req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body).exec();
        handleEntityNotFound(res, product);
        respondWithResult(res, product);
    } catch (error) {
        handleError(res, error);
    }
}

/**
 * delete a product by id
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
async function deleteById(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id, req.body).exec();
        handleEntityNotFound(res, product);
        respondWithResult(res, product);
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
}