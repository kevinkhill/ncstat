const { getDefinition } = require("@ncstat/parser");

module.exports = async function (fastify, _opts) {
  const opts = {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            definition: { type: "string" }
          }
        }
      }
    }
  };

  fastify.get("/define", opts, async (req, reply) => {
    let definition = "";

    if (req.params.input) definition = getDefinition(req.params.input);

    return reply
      .header("Content-Type", "application/json")
      .send({ definition });
  });

  fastify.post("/define", opts, async (req, reply) => {
    let definition = "";

    if (req.body) definition = getDefinition(req.body);

    return reply
      .header("Content-Type", "application/json")
      .send({ definition });
  });
};
