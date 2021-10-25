/**
 *  Main application file
 */

const express = require('express');
const expressConfig = require('./config/express');
const routeConfig = require('./routes');
const config = require('./config/env');
const mongoose = require('mongoose');

// Setup express

const app = express();
expressConfig(app);
routeConfig(app);

// Connect to MongoDB
mongoose.connect(config.mongo.uri, { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    console.error('Error', 'MongoDB connection error', {
        data: err,
        time: new Date().toISOString()
    });
    process.exit(-1);
});

// Expose app
module.exports = app;