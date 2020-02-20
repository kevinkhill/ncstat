"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _NcParser = require("./NcParser");

Object.keys(_NcParser).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _NcParser[key];
    }
  });
});
