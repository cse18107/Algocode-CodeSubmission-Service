const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const registerPlugin =  require('./repositories/repositoryPlugin')
/**
 *
 * @param {Fastify object} fastify
 * @param {*} options
 */
async function app(fastify, options) {
    await fastify.register(require('@fastify/cors'));
    await fastify.register(registerPlugin);
    await fastify.register(servicePlugin);

    // register test routes
    // fastify.register(require('./routes/testRoutes'), {prefix: '/test'});
    await fastify.register(require("./routes/api/apiRoutes"), {
      prefix: "/api",
    });
    
}

module.exports = fastifyPlugin(app);