/* eslint-disable @typescript-eslint/no-var-requires */
const bent = require("bent");

const { ncFileBuffer } = require("../../../ncfiles");

const postNcFile = bent(
  "http://localhost:3000/api/upload",
  "POST",
  200
);

const file = ncFileBuffer("A");

(async () => {
  try {
    console.log(file);
    const res = await postNcFile(file);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
})();
