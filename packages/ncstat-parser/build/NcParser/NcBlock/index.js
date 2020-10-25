"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NcBlock = require("./NcBlock");

Object.keys(_NcBlock).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NcBlock[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _NcBlock[key];
    }
  });
});

var _blockGenerator = require("./blockGenerator");

Object.keys(_blockGenerator).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _blockGenerator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _blockGenerator[key];
    }
  });
});
