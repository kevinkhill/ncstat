// eslint-disable-next-line import/no-namespace
import Router from "@koa/router";
import { NcParser } from "@ncstat/parser";
import Koa from "koa";

export const router = new Router();

const parser = new NcParser();

router.post("/tokenize", async (ctx: Koa.Context) => {
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

router.get("/*", async (ctx: Koa.Context) => {
  ctx.body = "UP";
});
