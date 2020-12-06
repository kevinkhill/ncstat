const { test } = require("tap");
const Fastify = require("fastify");
const { NcLexer } = require("@ncstat/parser");

const Support = require("../../plugins/support");

test("support provides the lexer", async (t) => {
  const fastify = Fastify();
  fastify.register(Support);

  await fastify.ready();
  t.true(fastify.lexer() instanceof NcLexer);
});

// You can also use plugin with opts in fastify v2
//
// test('support works standalone', (t) => {
//   t.plan(2)
//   const fastify = Fastify()
//   fastify.register(Support)
//
//   fastify.ready((err) => {
//     t.error(err)
//     t.equal(fastify.someSupport(), 'hugs')
//   })
// })
