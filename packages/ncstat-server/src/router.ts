// eslint-disable-next-line import/no-namespace
import Router from "@koa/router";
import { NcParser, NcParserConfig } from "@ncstat/parser";
import Koa from "koa";

export const router = new Router();

const config: NcParserConfig = {
  debug: true,
  lexerConfig: {
    tokens: {
      EOF: false
    }
  }
};

const parser = new NcParser(config);

router.post("/tokenize", async (ctx: Koa.Context) => {
  const body = ctx.request.body;

  if (!body.input) ctx.throw(400, ".input required");

  const lexer = parser.getLexer();
  const tokens = lexer.tokenArray(body.input);

  ctx.body = {
    input: body.input,
    tokens
  };
});

router.get("/*", async (ctx: Koa.Context) => {
  ctx.body = "UP";
});
