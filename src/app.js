const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const registerPlugin =  require('./repositories/repositoryPlugin')
/**
 *
 * @param {Fastify object} fastify
 * @param {*} options
 */
async function app(fastify, options) {
    fastify.register(require('@fastify/cors'));
    fastify.register(registerPlugin);
    fastify.register(servicePlugin);

    // register test routes
    fastify.register(require('./routes/testRoutes'), {prefix: '/test'});

    
}

module.exports = fastifyPlugin(app);