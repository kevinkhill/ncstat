import { NcLexer } from "../NcLexer";

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

// @TODO: Variables... (token#16)
describe.each`
  index | type            | expected
  ${0}  | ${"PRG_DELIM"}  | ${"%"}
  ${1}  | ${"PRG_NUMBER"} | ${1234}
  ${2}  | ${"COMMENT"}    | ${"TEST PROGRAM"}
  ${3}  | ${"ADDR"}       | ${["T", 43]}
  ${4}  | ${"ADDR"}       | ${["M", 6]}
  ${5}  | ${"COMMENT"}    | ${`#14 [.182"] DRILL, CARB, TSC`}
  ${6}  | ${"ADDR"}       | ${["G", 0]}
  ${7}  | ${"ADDR"}       | ${["G", 90]}
  ${8}  | ${"ADDR"}       | ${["G", 54]}
  ${9}  | ${"ADDR"}       | ${["X", 0.75]}
  ${10} | ${"ADDR"}       | ${["Y", 0.19]}
  ${11} | ${"ADDR"}       | ${["S", 10495]}
  ${12} | ${"ADDR"}       | ${["M", 3]}
  ${13} | ${"ADDR"}       | ${["M", 50]}
  ${14} | ${"COMMENT"}    | ${"TSC COOLANT ON"};
  ${15} | ${"ADDR"}       | ${["G", 43]}
  ${16} | ${"ADDR"}       | ${["H", NaN]}
  ${17} | ${"ADDR"}       | ${["Z", 1.0]}
  ${18} | ${"ADDR"}       | ${["T", 44]}
  ${19} | ${"ADDR"}       | ${["G", 98]}
  ${20} | ${"ADDR"}       | ${["G", 81]}
  ${21} | ${"ADDR"}       | ${["Z", -0.5631]}
  ${22} | ${"ADDR"}       | ${["R", 0.1]}
  ${23} | ${"ADDR"}       | ${["F", 83.96]}
  ${24} | ${"ADDR"}       | ${["X", 5.0]}
  ${25} | ${"ADDR"}       | ${["G", 80]}
  ${26} | ${"ADDR"}       | ${["M", 30]}
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

    if (token.type === "ADDR") {
      const { prefix, value } = token.value;
      const [ expectedPrefix, expectedValue ] = expected;

      it(`prefix is "${prefix}"`, () => {
        expect(prefix).toBe(expectedPrefix);
      });

      it(`value is ${expectedValue}`, () => {
        expect(value).toBe(expectedValue);
      });
    } else {
      it(`value is ${expected}`, () => {
        expect(token.value).toBe(expected);
      });
    }
  });
});


