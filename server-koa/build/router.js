"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _router = _interopRequireDefault(require("@koa/router"));

var _parser = require("@ncstat/parser");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// eslint-disable-next-line import/no-namespace
const router = new _router.default();
exports.router = router;
const config = {
  debug: true,
  lexerConfig: {
    tokens: {
      EOF: false
    }
  }
};
const parser = new _parser.NcParser(config);
router.post("/tokenize", async (ctx) => {
  const body = ctx.request.body;
  if (!body.input) ctx.throw(400, ".input required");
  const lexer = parser.getLexer();
  const tokens = lexer.tokenArray(body.input);
  ctx.body = {
    input: body.input,
    tokens
  };
});
router.get("/*", async (ctx) => {
  ctx.body = "UP";
});
