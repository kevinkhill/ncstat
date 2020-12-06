const { test } = require("tap");

const { build } = require("../helper");

test("define with no input", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/define",
    method: "POST",
    payload: "",
    headers: {
      "Content-Type": "text/plain"
    }
  });

  const { definition } = JSON.parse(res.body);

  t.equal(definition, "");
});

test("define G54", async (t) => {
  const app = build(t);

  const res = await app.inject({
    url: "/define",
    method: "POST",
    payload: "G54",
    headers: {
      "Content-Type": "text/plain"
    }
  });

  const definition = JSON.parse(res.body);
console.log(definition);
  t.equal(definition.group, "");
  t.equal(definition.desc, "desc");
});
