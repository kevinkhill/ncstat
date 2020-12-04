/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const fs = require("fs");
const path = require("path");

const { NcParser, define } = require("../parser/build/index.js");

async function readFile(file) {
  const inFile = path.join(__dirname, "sources", file);

  return fs.promises.readFile(inFile, "utf8");
}

async function writeFile(file, data) {
  const outFile = path.join(__dirname, "output", file);

  console.log(`Writing to ${outFile}`);

  return fs.promises.writeFile(outFile, data);
}

async function runDemo(demoSource) {
  const parser = new NcParser({
    debug: true,
    lexerConfig: {
      tokens: {
        EOF: false
      }
    }
  });

  const contents = await readFile(demoSource);
  const program = parser.parse(contents);
  const json = JSON.stringify(program);
  // console.log(json);

  program.tokens.forEach((token) => {
    if (token.prefix === "G") {
      console.log({
        def: defineGCode(token.text),
        token: token.text
      });
    }
  });

  // writeFile("vf10.json", json);
}

module.exports = runDemo;
