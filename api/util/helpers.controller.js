/**
 *  Helpers for common responses from a controller
 */


/**
 * Make a ok response if it has a entity
 * @param {import("express").Response} res Response 
 * @param {import("mongoose").Model} entity Entity to display
 * @param {number} code Response status code
 * @returns {void}
 */
function respondWithResult(res, entity, code) {
    const statusCode = code || 200;
    if (entity) {
        res.status(statusCode).json(entity);
    }
}

/**
 * Make a 404 response if entity don't exists
 * @param {import("express").Response} res Response 
 * @param {import("mongoose").Model} entity Entity to display
 * @returns {void}
 */
function handleEntityNotFound(res, entity) {
    if (!entity) {
        res.status(404).end();
    } 
}

/**
 * Make a error response with description
 * @param {import("express").Response} res Response 
 * @param {Error} err Entity to display
 * @param {number} code Response status code
 * @returns {void}
 */
function handleError(res, err, code) {
    const statusCode = code || 500;
    res.status(statusCode).send(err);
}

/**
 * Make a validation error response for post/create request
 * @param {import("express").Response} res Response 
 * @param {Error} err Entity to display
 * @param {number} code Response status code
 * @returns {void}
 */
function validationError(res, err, statusCode) {  
    const statusCodeLocal = statusCode || 422;
    res.status(statusCodeLocal).json(err);  
}

module.exports = {
    respondWithResult,
    handleEntityNotFound,
    handleError,
    validationError
};