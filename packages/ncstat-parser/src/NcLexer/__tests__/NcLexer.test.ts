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
  tokens: {
    NEWLINE: false
  }
});

const tokens = lexer.tokens(input);

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
  ${3}  | ${"ADDRESS"}    | ${["T", 43]}
  ${4}  | ${"ADDRESS"}    | ${["M", 6]}
  ${5}  | ${"COMMENT"}    | ${`#14 [.182"] DRILL, CARB, TSC`}
  ${6}  | ${"ADDRESS"}    | ${["G", 0]}
  ${7}  | ${"ADDRESS"}    | ${["G", 90]}
  ${8}  | ${"ADDRESS"}    | ${["G", 54]}
  ${9}  | ${"ADDRESS"}    | ${["X", 0.75]}
  ${10} | ${"ADDRESS"}    | ${["Y", 0.19]}
  ${11} | ${"ADDRESS"}    | ${["S", 10495]}
  ${12} | ${"ADDRESS"}    | ${["M", 3]}
  ${13} | ${"ADDRESS"}    | ${["M", 50]}
  ${14} | ${"COMMENT"}    | ${"TSC COOLANT ON"}
  ${15} | ${"ADDRESS"}    | ${["G", 43]}
  ${16} | ${"ADDRESS"}    | ${["H", NaN]}
  ${17} | ${"ADDRESS"}    | ${["Z", 1.0]}
  ${18} | ${"ADDRESS"}    | ${["T", 44]}
  ${19} | ${"ADDRESS"}    | ${["G", 98]}
  ${20} | ${"ADDRESS"}    | ${["G", 81]}
  ${21} | ${"ADDRESS"}    | ${["Z", -0.5631]}
  ${22} | ${"ADDRESS"}    | ${["R", 0.1]}
  ${23} | ${"ADDRESS"}    | ${["F", 83.96]}
  ${24} | ${"ADDRESS"}    | ${["X", 5.0]}
  ${25} | ${"ADDRESS"}    | ${["G", 80]}
  ${26} | ${"ADDRESS"}    | ${["M", 30]}
  ${27} | ${"PRG_DELIM"}  | ${"%"}
  ${28} | ${"EOF"}        | ${""}
`("created tokens with proper values", ({ index, type, expected }) => {
  const token = tokens[index];

  describe(`token "${token.text}"`, () => {
    it(`type is "${type}"`, () => {
      expect(token.type).toBe(type);
    });

    if (token.type === "ADDRESS") {
      const { prefix, value } = token;
      const [expectedPrefix, expectedValue] = expected;

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
