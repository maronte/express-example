/**
 *  User controller
 */

const jwt = require('jsonwebtoken');
const User = require('./user.model');
const config = require('../../config/env');
const { handleError, validationError } = require('../../util/helpers.controller');

/**
 * Get list of users 
 * Role restriction = admin
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
function getAll(req, res) {
    return User.find({}, '-salt -password').exec()
        .then(users => res.status(200).json(users))
        .catch(handleError(res));
}

/**
 * Create new user
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns { Promise<import("mongoose").Model> }
 */
function create(req, res) {
    const user = new User(req.body);
    user.provider = 'local';
    user.role = 'user';

    return user.save()
        .then((user) => {      
            const token = jwt.sign( { _id: user._id }, config.secrets.session, { expiresIn: 60 * 60 * 5 });      
            res.json({ token });    
        })    
        .catch(validationError(res));
}

module.exports = {
    getAll,
    create
}