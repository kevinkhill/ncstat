const path = require("path");

module.exports = package => {
  const pkg = require(path.resolve(root, "package.json"));

  return pkg.name.split("@ncstat/").pop();
}
