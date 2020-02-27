"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _koa = _interopRequireDefault(require("koa"));

var _koaBody = _interopRequireDefault(require("koa-body"));

var _router = require("./router");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/* eslint-disable import/no-namespace */
const app = new _koa.default();
exports.app = app;
app.use((0, _koaBody.default)());
/**
 * Route Error Handler
 */

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = "json";
    ctx.body = {
      err
    };
    ctx.app.emit("error", err, ctx);
  }
});
app.use(_router.router.routes());
app.on("error", err => {
  if (process.env.NODE_ENV !== "test") {
    console.log("sent error %s to the cloud", err.message);
    console.log(err);
  }
});
