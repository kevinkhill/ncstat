"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NcLexer = require("./NcLexer");

Object.keys(_NcLexer).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NcLexer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _NcLexer[key];
    }
  });
});

var _NcParser = require("./NcParser");

Object.keys(_NcParser).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NcParser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _NcParser[key];
    }
  });
});

var _NcProgram = require("./NcProgram");

Object.keys(_NcProgram).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NcProgram[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _NcProgram[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _types[key];
    }
  });
});
