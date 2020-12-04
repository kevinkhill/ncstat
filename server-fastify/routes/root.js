module.exports = async function (fastify, _opts) {
  fastify.get("/", async () => {
    return { ncstat: "v0.0.1" };
  });
};
