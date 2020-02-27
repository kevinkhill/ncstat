"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isType = void 0;

const isType = type => token => {
  return token.type === type;
};

exports.isType = isType;
