/**
 * Auth controller
 */

const User = require('../api/user/user.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('./auth.service');
const { handleError } = require('../util/helpers.controller');

/**
 * Login user with email and password
 * @param {import('express').Response} res 
 * @param {import('express').Request} req 
 * @returns {import('express').Response} 
 */
async function login(req, res) {
    
    try {
        // Validación de credenciales
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({
                message: "Usuario o contraseña no válidos"
            });
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                message: "Usuario o contrañesa no válidos"
            });
        }

        const token = await generateJWT( user.id );

        res.status(200).json({
            user,
            token
        });   
    } catch (error) {
        handleError(res, error);
    }
}

module.exports = {
    login
};