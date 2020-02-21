const chalk = require("chalk");

module.exports = {
  OK: chalk.reset.inverse.bold.green(" DONE "),
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
