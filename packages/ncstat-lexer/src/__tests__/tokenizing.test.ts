import { NcLexer } from "../NcLexer";

import { testAddrTokenPrefixAndValue, testToken } from "./utils";

const input = `%
O1234 (TEST PROGRAM)

T43 M6 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G54 X.75 Y.19
S10495 M3
M50 (TSC COOLANT ON)
G43 H#518 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
X5.
G80
M30
%`;

const lexer = new NcLexer({
  newlineTokens: false
});

const tokens = lexer.tokenArray(input);

describe("the lexer", () => {
  it("identified all the tokens", () => {
    // Don't forget about the "EOF" token
    expect(tokens).toHaveLength(29);
  });
});

describe.each`
  index | type            | expected
  ${0}  | ${"PRG_DELIM"}  | ${"%"}
  ${1}  | ${"PRG_NUMBER"} | ${1234}
  ${2}  | ${"COMMENT"}    | ${"TEST PROGRAM"}
  ${3}  | ${"ADDR"}       | ${["T", 43]}
  ${5}  | ${"COMMENT"}    | ${`#14 [.182"] DRILL, CARB, TSC`}
  ${14} | ${"COMMENT"}    | ${"TSC COOLANT ON"};
  ${27} | ${"PRG_DELIM"}  | ${"%"}
  ${28} | ${"EOF"}        | ${""}
`('created tokens with proper values', ({
  index, type, expected
}) => {
  const token = tokens[index];

  describe(`token "${token.text}"`, () => {
    it(`type is "${type}"`, () => {
      expect(token.type).toBe(type);
    });

    const tokenValue = (token.type === "ADDR")
      ? token.value.value
      : token.value;

    const prettyExpected = (typeof tokenValue === "string")
      ? `"${expected}"`
      : expected;

    if (token.type === "ADDR") {
      const { prefix, value } = token.value;
      const [ expectedPrefix, expectedValue ] = expected;

      it(`prefix is "${prefix}"`, () => {
        expect(prefix).toBe(expectedPrefix);
      });

      it(`value is ${prettyExpected}`, () => {
        expect(value).toBe(expectedValue);
      });
    } else {
      it(`value is ${prettyExpected}`, () => {
        expect(tokenValue).toBe(expected);
      });
    }


  });
});

describe(`token "${tokens[4].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[4], "M", 6);
});

describe(`token "${tokens[6].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[6], "G", 0);
});

describe(`token "${tokens[7].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[7], "G", 90);
});

describe(`token "${tokens[8].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[8], "G", 54);
});

describe(`token "${tokens[9].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[9], "X", 0.75);
});

describe(`token "${tokens[10].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[10], "Y", 0.19);
});

describe(`token "${tokens[11].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[11], "S", 10495);
});

describe(`token "${tokens[12].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[12], "M", 3);
});

describe(`token "${tokens[13].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[13], "M", 50);
});

describe(`token "${tokens[15].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[15], "G", 43);
});

describe.skip(`token "${tokens[16].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[16], "H", 0);
});

describe(`token "${tokens[17].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[17], "Z", 1.0);
});

describe(`token "${tokens[18].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[18], "T", 44);
});

describe(`token "${tokens[19].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[19], "G", 98);
});

describe(`token "${tokens[20].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[20], "G", 81);
});

describe(`token "${tokens[21].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[21], "Z", -0.5631);
});

describe(`token "${tokens[22].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[22], "R", 0.1);
});

describe(`token "${tokens[23].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[23], "F", 83.96);
});

describe(`token "${tokens[24].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[24], "X", 5.0);
});

describe(`token "${tokens[25].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[25], "G", 80);
});

describe(`token "${tokens[26].text}"`, () => {
  testAddrTokenPrefixAndValue(tokens[26], "M", 30);
});

