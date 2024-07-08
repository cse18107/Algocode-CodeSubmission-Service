const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
/**
 *
 * @param {Fastify object} fastify
 * @param {*} options
 */
async function app(fastify, options) {
    fastify.register(require('@fastify/cors'));

    // register test routes
    fastify.register(require('./routes/testRoutes'), {prefix: '/test'});

    fastify.register(servicePlugin)
}

module.exports = fastifyPlugin(app);