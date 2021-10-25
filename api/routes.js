/**
 *  Main applications routes
 */

const helloWorld = require('./api/hello-world');
const product = require('./api/product');
const user = require('./api/user');
const auth = require('./auth');

module.exports = (app) => {
    app.use('/api/helloworld', helloWorld);
    app.use('/api/products', product);
    app.use('/api/users', user);
    app.use('/auth', auth);
};