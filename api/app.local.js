/**
 * Setup a server for localdevelopment 
 */

const app = require('./index');
const http = require('http');
const config = require('./config/env');

// Start server
const server = http.createServer(app);
function startServer() {
    app.shoppingCartBK = server.listen(config.port, config.ip, () => {
        console.log(`Express server listening on ${config.port}, in ${app.get('env')} mode`);
    });
}
setImmediate(startServer);