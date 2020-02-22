"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var Koa = _interopRequireWildcard(require("koa"));

var koaBody = _interopRequireWildcard(require("koa-body"));

var _router = require("./router");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (typeof obj !== "object" && typeof obj !== "function")
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

/* eslint-disable import/no-namespace */
const app = new Koa();
exports.app = app;
app.use(koaBody()); // look ma, error propagation!

app.use(async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee
    ctx.status = err.status || 500;
    ctx.type = "html";
    ctx.body =
      "<p>Something <em>exploded</em>, please contact Maru.</p>"; // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.

    ctx.app.emit("error", err, ctx);
  }
});
app.use(_router.router.routes());
app.on("error", function(err) {
  if (process.env.NODE_ENV !== "test") {
    console.log("sent error %s to the cloud", err.message);
    console.log(err);
  }
});
