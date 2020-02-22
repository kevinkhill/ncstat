// eslint-disable-next-line import/no-namespace
import * as Router from "@koa/router";
import { NcParser } from "@ncstat/parser";

export const router = new Router();
const parser = new NcParser();

router.post("/tokenize", async ctx => {
  const body = ctx.request.body;

  if (!body.input) ctx.throw(400, ".input required");

  const lexer = parser.getLexer();
  const tokens = lexer.tokenArray(body.input);

  // Chuck the EOF token
  tokens.pop();

  ctx.body = {
    input: body.input,
    tokens
  };
});

router.get("/*", async ctx => {
  ctx.body = "UP";
});
