"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tokens = require("./tokens");

Object.keys(_tokens).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _tokens[key];
    }
  });
});
