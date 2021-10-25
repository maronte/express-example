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
function getAll(req, res) {
    return Product.find().exec()
            .then(respondWithResult(res))
            .catch(handleError(res));
}

/**
 * create a product 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
function create(req, res) {
    return Product.create(req.body)
            .then(respondWithResult(res))
            .catch(handleError(res));
}

/**
 * get product by id 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
function getById(req, res) {
    return Product.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))    
        .then(respondWithResult(res))    
        .catch(handleError(res));
}

/**
 * update a product by id
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
function updateById(req, res) {
    return Product.findByIdAndUpdate(req.params.id, req.body).exec()
            .then(handleEntityNotFound(res))    
            .then(respondWithResult(res))    
            .catch(handleError(res));
}

/**
 * delete a product by id
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
function deleteById(req, res) {
    return Product.findByIdAndDelete(req.params.id, req.body).exec()
            .then(handleEntityNotFound(res))    
            .then(respondWithResult(res))    
            .catch(handleError(res));
}

module.exports = {
    getAll,
    create,
    getById,
    updateById,
    deleteById
}