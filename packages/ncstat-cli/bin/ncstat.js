#!/usr/bin/env node
/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const importLocal = require("import-local");

if (!importLocal(__filename)) {
  if (process.env.NODE_ENV === null) {
    process.env.NODE_ENV = "test";
  }

  const cli = require("../build/cli");

  cli.runExit(process.argv.slice(2), {
    stdin: process.stdin,
    stdout: process.stdout,
    stderr: process.stderr
  });
}
