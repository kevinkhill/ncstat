import { tokenize } from "../functions/tokenize";

describe("Creating NcTokens", () => {
  const tokens = tokenize("G0 G90 G54");

  expect(tokens).toHaveLength(4);
});
