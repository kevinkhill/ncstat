module.exports = async function (fastify, _opts) {
  fastify.get("/", async (_req) => {
    return {
      ncstat: "v0.0.1"
    };
  });
};
