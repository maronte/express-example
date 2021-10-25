/**
 *  Helpers for common responses from a controller
 */


/**
 * Make a ok response if it has a entity, else return null
 * @param {import("express").Response} res 
 * @param {number} code 
 * @returns {Function}
 */
function respondWithResult(res, code) {
    const statusCode = code || 200;
    return (entity) => {
        if (entity) {
            res.status(statusCode).json(entity);
        }
    };
}

/**
 * Make a 404 response if model not exists
 * @param { import("express").Response } res 
 * @returns { import("mongoose").Model }
 */
function handleEntityNotFound(res) {
    return (entity) => {
        if (!entity) {
            res.status(404).end();
            return null;
        } 
        return entity;
    };
}

function handleError(res, code) {
    const statusCode = code || 500;
    return (err) => {
        res.status(statusCode).send(err);
    };
}

function validationError(res, statusCode) {  
    const statusCodeLocal = statusCode || 422;  
    return err => res.status(statusCodeLocal).json(err);
}

module.exports = {
    respondWithResult,
    handleEntityNotFound,
    handleError,
    validationError
};