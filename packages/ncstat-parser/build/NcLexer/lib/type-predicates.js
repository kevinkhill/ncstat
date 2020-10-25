"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumericToken = isNumericToken;
exports.isStringToken = isStringToken;

// function isNumericValue(val: any): boolean {
//   return !isNaN(parseFloat(val)) && isFinite(val);
// }
function isNumericToken(token) {
  return (
    typeof (token === null || token === void 0
      ? void 0
      : token.value) === "number"
  );
}

function isStringToken(token) {
  return (
    typeof (token === null || token === void 0
      ? void 0
      : token.value) === "string"
  );
}
