/**
 *  Main application file
 */

const express = require('express');
const expressConfiguration = require('./config/express');
const routeConfigutation = require('./routes');
const config = require('./config/env');
const mongoose = require('mongoose');

// Setup express

const app = express();
expressConfiguration(app);
routeConfigutation(app);

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