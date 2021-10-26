/** 
 *  Auth helpers
 */

const jwt = require('jsonwebtoken');
const config = require('../config/env');
const secret = config.secrets.session;
const User = require('../api/user/user.model');

/**
 * Generate a jwt with session as local secret and recives a uid as
 * the string to encrypt
 * @param {string} uid string to encrypt as jwt 
 * @returns {Promise<string>} token
 */

const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        
        const payload = { uid };
        jwt.sign( payload, secret, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}

/**
 * Middleweare for validate jwt and attach user to request
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {Function} next 
 */
async function validateJWT(req, res, next) {
    const token  = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Please authenticate your identity."
        });
    }
    try {
        const { uid } = jwt.verify(token.substring(7, req.headers.authorization.length), secret);
        const user = await User.findById(uid);
        if (!user) {
            return res.status(401).json({
                message: "Invalid user"
            }).end();
        }
        req.user = user;
        next();

    } catch (error) {
        return res.status(500).json({ message: "Invalid user" });    
    }
}

/**
 * Middleweare for validate if user rol is 'admin'
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {Function} next 
 */
 function isAdmin(req, res, next){
    const user = req.user;
    if (!user) {
        return res.status(500).json({ message: "Rol validation requires a user" });
    }
    if (user.role !== 'admin') {
        return res.status(401).json({ message: "You don't have access to this endpoint" });
    }
    next();
}

module.exports = {  
    generateJWT,
    validateJWT,
    isAdmin
};