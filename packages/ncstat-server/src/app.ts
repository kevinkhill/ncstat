/* eslint-disable import/no-namespace */
import * as Koa from "koa";
import * as koaBody from "koa-body";

import { router } from "./router";

export const app = new Koa();

app.use(koaBody());

/**
 * Route Error Handler
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.type = "json";
    ctx.body = { err };
    ctx.app.emit("error", err, ctx);
  }
});

app.use(router.routes());

app.on("error", err => {
  if (process.env.NODE_ENV !== "test") {
    console.log("sent error %s to the cloud", err.message);
    console.log(err);
  }
});
