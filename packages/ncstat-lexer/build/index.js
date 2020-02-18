"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  rejectNewline: true,
  getValue: true,
  NcLexer: true
};
exports.getValue = getValue;
Object.defineProperty(exports, "NcLexer", {
  enumerable: true,
  get: function() {
    return _NcLexer.NcLexer;
  }
});
exports.rejectNewline = void 0;

var _fp = require("lodash/fp");

var _NcLexer = require("./NcLexer");

var _types = require("./types");

Object.keys(_types).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _types[key];
    }
  });
});

var _tokenMaps = require("./tokenMaps");

Object.keys(_tokenMaps).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _tokenMaps[key];
    }
  });
});

var _filterByPrefix = require("./filterByPrefix");

Object.keys(_filterByPrefix).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _filterByPrefix[key];
    }
  });
});
const rejectNewline = (0, _fp.reject)(["type", "NEWLINE"]);
exports.rejectNewline = rejectNewline;

function getValue(token) {
  return {
    value: token.value.value,
    prefix: token.value.prefix
  };
}
