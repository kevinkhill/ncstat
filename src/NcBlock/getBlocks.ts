import { isEqual, last, reduce } from "lodash";

// import { isEqual } from "lodash/fp";
import { NcToken } from "../NcLexer";
import { NcBlock } from "./NcBlock";

export function getBlocks(tokenGen: Generator<NcToken>): NcBlock[] {
  const tokens = Array.from(tokenGen);
  const delimiter = { type: "NEWLINE" };
  const res = reduce(
    tokens,
    function(result, obj, index) {
      if (isEqual(obj, delimiter)) {
        if (index !== tokens.length - 1) result.push([]);
      } else {
        last(result).push(obj);
      }
      return result;
    },
    [[]]
  );

  console.log(res);
  return res;
}
