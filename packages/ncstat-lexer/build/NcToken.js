"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcToken = void 0;

var _tokenizr = _interopRequireDefault(require("tokenizr"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

class NcToken extends _tokenizr.default.Token {
  constructor(token) {
    super(
      token.type,
      token.value,
      token.text,
      token === null || token === void 0 ? void 0 : token.pos,
      token === null || token === void 0 ? void 0 : token.line,
      token === null || token === void 0 ? void 0 : token.column
    );
  }
}

exports.NcToken = NcToken;
