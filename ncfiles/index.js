const path = require("path");

const ncFileBuffer = file => {
  const abspath = path.resolve(
    __dirname,
    `${file}.NC`
  );

  return Buffer.from(abspath);
};

module.exports = { ncFileBuffer };
