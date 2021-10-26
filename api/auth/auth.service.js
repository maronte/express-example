/** 
 *  Auth helpers
 */

const jwt = require('jsonwebtoken');
const config = require('../config/env');
const secret = config.secrets.session;

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

module.exports = {  
    generateJWT
};