/**
 * Express configuration
 */

const compression = require('compression');
const methodOverride = require('method-override');
const errorHandler = require('errorhandler');
const express = require('express');
const config = require('./env');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

/**
 * Eneable configurations for the express app
 * @param {Express} app
 * @returns {void} 
 */
module.exports = (app) => {
    const env = app.get('env');

    app.use(compression());
    app.use(express.json());
    app.use(express.json({ limit: '50mb' }));
    app.use(methodOverride());

    // Session configuration
    app.use(passport.initialize());
    app.use(session({
        secret: config.secrets.session,    
        saveUninitialized: true,    
        resave: false,
        store: new MongoStore({ mongoUrl: config.mongo.uri })
    }))


    if (env === 'development' || env === 'test') {
        app.use(errorHandler());
    }

};