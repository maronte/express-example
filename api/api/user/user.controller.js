/**
 *  User controller
 */

const jwt = require('jsonwebtoken');
const User = require('./user.model');
const config = require('../../config/env');
const { handleError, 
    validationError, 
    respondWithResult 
} = require('../../util/helpers.controller');

/**
 * Get list of users 
 * Role restriction = admin
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
async function getAll(req, res) {
    try {
        const users = await User.find({}, '-salt -password').exec(); 
        respondWithResult(res, users);  
    } catch (error) {
        handleError(res, error);
    }
}

/**
 * Create new user
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
async function create(req, res) {
    const user = new User(req.body);
    user.provider = 'local';
    user.role = 'user';
    try {
        await user.save();
        const token = jwt.sign( { _id: user._id }, config.secrets.session, { expiresIn: 60 * 60 * 5 });      
        res.json({ token });
    } catch (error) {
        validationError(res, error);
    }
}

module.exports = {
    getAll,
    create
}