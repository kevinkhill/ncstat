"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tokens = void 0;
let Tokens;
exports.Tokens = Tokens;

(function(Tokens) {
  Tokens["EOF"] = "EOF";
  Tokens["ADDRESS"] = "ADDRESS";
  Tokens["COMMENT"] = "COMMENT";
  Tokens["NEWLINE"] = "NEWLINE";
  Tokens["BLK_SKIP"] = "BLK_SKIP";
  Tokens["PRG_DELIM"] = "PRG_DELIM";
  Tokens["PRG_NUMBER"] = "PRG_NUMBER";
  Tokens["BRACKET_OPEN"] = "BRACKET_OPEN";
  Tokens["BRACKET_CLOSE"] = "BRACKET_CLOSE";
})(Tokens || (exports.Tokens = Tokens = {}));
