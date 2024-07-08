const testService = require('./testService');
const fastifyPlugin  = require('fastify-plugin');
async function servicePlugin(fastify, options) {
    fastify.decorate('testService', testService);
}

module.exports = fastifyPlugin(servicePlugin);