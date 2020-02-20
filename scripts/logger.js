const chalk = require("chalk");

const logger = {
  $n() {
    process.stdout.write("\n");
  },
  log(msg) {
    console.log(chalk.reset(` ${msg} `));
  },
  heading(msg) {
    console.log(chalk.inverse(` ${msg} `));
  },
  success(msg) {
    console.error(chalk.inverse.green(` ${msg} `));
  },
  error(msg) {
    console.error(chalk.inverse.red(` ${msg} `));
  }
};

module.exports = {
  logger
};
