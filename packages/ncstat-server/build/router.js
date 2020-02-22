"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var Router = _interopRequireWildcard(require("@koa/router"));

var _parser = require("@ncstat/parser");

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

// eslint-disable-next-line import/no-namespace
const router = new Router();
exports.router = router;
const parser = new _parser.NcParser();
router.post("/tokenize", async ctx => {
  const body = ctx.request.body;
  if (!body.input) ctx.throw(400, ".input required");
  ctx.body = {
    input: body.input,
    output: parser.parse(body.input)
  };
}); // router.post("/uppercase", async ctx => {
//   const body = ctx.request.body;
//   if (!body.name) ctx.throw(400, ".name required");
//   ctx.body = { name: body.name.toUpperCase() };
// });
// router.get("/_status", async ctx => {
//   ctx.body = {
//     memoryUsage: process.memoryUsage()
//   };
// });

router.get("/*", async ctx => {
  ctx.body = "UP";
});
