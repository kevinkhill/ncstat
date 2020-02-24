/* eslint-disable import/no-namespace */
import Koa from "koa";
import koaBody from "koa-body";

import { router } from "./router";

export const app = new Koa();

app.use(koaBody());

/**
 * Route Error Handler
 */
app.use(async (ctx: Koa.Context, next: Function) => {
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

app.on("error", (err: Error) => {
  if (process.env.NODE_ENV !== "test") {
    console.log("sent error %s to the cloud", err.message);
    console.log(err);
  }
});
