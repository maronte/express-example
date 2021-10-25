/**
 * Default configuration
 * @property {string} env Application environment
 * @property {number} port Application port
 * @property {string} ip Application IP
 * @property {boolean} seedDB 
 * @property {object} secrets Application secret data
 * @property {string} secrets.session Secret for session encrypt
 * @property {object} mongo Mongo enviroment data
 * @property {string} mongo.uri URL for mongo connection
 */
const all = {
    env: process.env.NODE_ENV,

    port: process.env.PORT || 8080,

    ip: process.env.IP || '127.0.0.1',
  
    secrets: {
        session: 'w0rksh0p-full5tack-j4v45cr1pt'
    },  
      
    mongo: {
        uri: process.env.MONGODB_URI || 'mongodb://test:r7UPMOQwaBsqdWMw@cluster0-shard-00-00.pcfzo.mongodb.net:27017,cluster0-shard-00-01.pcfzo.mongodb.net:27017,cluster0-shard-00-02.pcfzo.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4ngk4j-shard-0&authSource=admin&retryWrites=true&w=majority'
    }
};

module.exports = all;