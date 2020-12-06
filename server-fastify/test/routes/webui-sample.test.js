const { test } = require("tap");

const { build, getSampleNcCode } = require("../helper");

test("tokenizing sample nc code used in webui", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/tokenize",
    method: "POST",
    payload: getSampleNcCode(),
    headers: {
      "Content-Type": "text/plain"
    }
  });

  const tokens = JSON.parse(res.body);

  t.equal(tokens.length, 42);
});
