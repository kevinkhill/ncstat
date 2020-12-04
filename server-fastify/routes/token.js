const { NcLexer, define } = require("../../parser/build");

module.exports = async function (fastify, _opts) {
  const lexer = new NcLexer({
    tokens: {
      EOF: false
    }
  });

  fastify.post("/define", async (req) => {
    if (req.body) {
      // const tokens = lexer.tokens(req.body);
      // if (tokens.length > 0) {
      return define(req.body);
      // }
    }

    return "";
  });
};
