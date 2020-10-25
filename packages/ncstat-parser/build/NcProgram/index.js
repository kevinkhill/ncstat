"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
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

var _NcRegion = require("./NcRegion");

Object.keys(_NcRegion).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _NcRegion[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _NcRegion[key];
    }
  });
});

var _Toolpath = require("./Toolpath");

Object.keys(_Toolpath).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Toolpath[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _Toolpath[key];
    }
  });
});
