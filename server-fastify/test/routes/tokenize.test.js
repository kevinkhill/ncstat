const { test } = require("tap");

const { build } = require("../helper");

test("tokenizing with no input", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/tokenize",
    method: "POST",
    payload: ""
  });

  const tokens = JSON.parse(res.body);

  t.equal(tokens.length, 0);
});

test("tokenizing input", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/tokenize",
    method: "POST",
    payload: "G10 L2 P1 X12.1441 Y-13.2584 Z-18.5896"
  });

  const tokens = JSON.parse(res.body);

  t.equal(tokens.length, 6);
});
