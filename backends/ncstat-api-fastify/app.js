require("make-promises-safe");

const path = require("path");
const AutoLoad = require("fastify-autoload");

module.exports = async function (fastify, opts) {
  // fastify.addHook("onRequest", (request, reply, done) => {
  //   if (request.headers["content-type"] === "text/plain") {
  //     Object.assign(request, { isPlain: true });
  //   }

  //   if (request.headers["content-type"] === "application/json") {
  //     Object.assign(request, { isJson: true });
  //   }

  //   done();
  // });

  // fastify.setErrorHandler((error, request, reply) => {
  //   reply.send(error);
  // });

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts)
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts)
  });
};
