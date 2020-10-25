"use strict";

var _src = require("../../ncstat-parser/src");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(async args => {
  const parser = new _src.NcParser({
    debug: false
  });
  parser.on("error", console.error.bind(void 0));

  const filepath = _path.default.resolve(args[0]);

  const contents = await _fs.default.promises.readFile(
    filepath,
    "utf8"
  );
  const program = parser.parse(contents); // console.log(program);
  // console.log(parser.getLexer());
})(process.argv.slice(3));
