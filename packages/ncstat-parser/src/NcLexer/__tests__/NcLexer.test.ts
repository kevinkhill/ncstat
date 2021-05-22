import { NcLexer } from "../NcLexer";
import { NcToken } from './../NcToken';

const input = `%
O1234 (TEST PROGRAM)

T5 M6 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G54 X.75 Y.19
S10495 M3
M50 (TSC COOLANT ON)
G43 H5 Z1. T4
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

describe.each`
  index | type            | expected
  ${0}  | ${"PRG_DELIM"}  | ${"%"}
  ${1}  | ${"PRG_NUMBER"} | ${1234}
  ${2}  | ${"COMMENT"}    | ${"TEST PROGRAM"}
  ${3}  | ${"ADDRESS"}    | ${["T", 5]}
  ${4}  | ${"M_CODE"}     | ${6}
  ${5}  | ${"COMMENT"}    | ${`#14 [.182"] DRILL, CARB, TSC`}
  ${6}  | ${"ADDRESS"}    | ${["G", 0]}
  ${7}  | ${"ADDRESS"}    | ${["G", 90]}
  ${8}  | ${"ADDRESS"}    | ${["G", 54]}
  ${9}  | ${"ADDRESS"}    | ${["X", 0.75]}
  ${10} | ${"ADDRESS"}    | ${["Y", 0.19]}
  ${11} | ${"ADDRESS"}    | ${["S", 10495]}
  ${12} | ${"M_CODE"}     | ${3}
  ${13} | ${"M_CODE"}     | ${50}
  ${14} | ${"COMMENT"}    | ${"TSC COOLANT ON"}
  ${15} | ${"ADDRESS"}    | ${["G", 43]}
  ${16} | ${"ADDRESS"}    | ${["H", 5]}
  ${17} | ${"ADDRESS"}    | ${["Z", 1.0]}
  ${18} | ${"ADDRESS"}    | ${["T", 4]}
  ${19} | ${"ADDRESS"}    | ${["G", 98]}
  ${20} | ${"ADDRESS"}    | ${["G", 81]}
  ${21} | ${"ADDRESS"}    | ${["Z", -0.5631]}
  ${22} | ${"ADDRESS"}    | ${["R", 0.1]}
  ${23} | ${"ADDRESS"}    | ${["F", 83.96]}
  ${24} | ${"ADDRESS"}    | ${["X", 5.0]}
  ${25} | ${"ADDRESS"}    | ${["G", 80]}
  ${26} | ${"M_CODE"}     | ${30}
  ${27} | ${"PRG_DELIM"}  | ${"%"}
  ${28} | ${"EOF"}        | ${""}
`("creates tokens", ({ index, type, expected }) => {
  const token = tokens[index];

  describe(`token #${index}, \`${token.text}\``, () => {
    it(`type should be "${type}"`, () => {
      expect(token.type).toBe(type);
    });

    if (token.type === "ADDRESS") {
      const [expectedPrefix, expectedValue] = expected;

      it(`prefix should be "${expectedPrefix}"`, () => {
        expect(token.prefix).toBe(expectedPrefix);
      });

      it(`value should be ${expectedValue}`, () => {
        expect(token.value).toBe(expectedValue);
      });
    } else {
      it(`value should be ${expected}`, () => {
        expect(token.value).toBe(expected);
      });
    }
  });
});
