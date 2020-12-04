const { test } = require("tap");

const { build } = require("../helper");

test("posting to root route with no input", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/",
    method: "GET"
  });

  t.deepEqual(JSON.parse(res.body), { ncstat: "v0.0.1" });
});
