const { NcLexer } = require("@ncstat/parser");

module.exports = async function (fastify, _opts) {
  const lexer = new NcLexer({
    tokens: {
      EOF: false
    }
  });

  fastify.post("/tokenize", async (req) => {
    if (req.body) {
      return lexer.tokens(req.body);
    }

    return [];
  });
};
