const { test } = require("tap");

const { build, getSampleNcCode } = require("../helper");

test("tokenizing with no input", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/tokenize",
    method: "POST",
    payload: "",
    headers: {
      "Content-Type": "text/plain"
    }
  });

  const tokens = JSON.parse(res.body);

  t.equal(tokens.length, 0);
});

test("tokenizing input", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/tokenize",
    method: "POST",
    payload: "T13 M6",
    headers: {
      "Content-Type": "text/plain"
    }
  });

  const tokens = JSON.parse(res.body);

  t.equals(tokens.length, 2);
  t.equals(tokens[0].type, "ADDRESS");
  t.equals(tokens[1].type, "M_CODE");
});

test("tokenizing input", async (t) => {
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
