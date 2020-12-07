const { NcLexer } = require("@ncstat/parser");

const fp = require("fastify-plugin");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
  fastify.decorate("lexer", function () {
    return new NcLexer({
      ...{
        tokens: {
          EOF: false
        }
      },
      ...opts
    });
  });
});
