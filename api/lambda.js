/**
 * serverless-express configuration for 
 * deploy this api in aws lambda
 */

const serverlessExpress = require('@vendia/serverless-express');
const app = require('./index');

exports.handler = serverlessExpress({app});