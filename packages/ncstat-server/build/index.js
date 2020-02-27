"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _app = require("./app");

const port = process.env.PORT || 3000;

const server = _app.app.listen(port);

exports.server = server;
console.info(`Listening to http://localhost:${port} 🚀`);
