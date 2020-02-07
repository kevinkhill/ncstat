import { getTokens } from "../../src/NcLexer/getTokens";

const input = `%
O1234 (TEST PROGRAM)
(CREATED: 12/20/2019)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

( DRILL FOR M5 X 0.8 ROLL TAP )
N43 ( #14 [.182"] DRILL, CARB, TSC )
T43 M6
G0 G90 G54 X.75 Y.19
S10495 M3
M50 (TSC COOLANT ON)
G43 H#518 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
Y1.5
X5.
G80
M30
%`;

// We don't need to test NEWLINE tokens here
const tokens = getTokens(input).filter(
  token => token.type !== "NEWLINE"
);

describe("token[0]", () => {
  const { type, value } = tokens[0];

  test(`type is "PRG_DELIM"`, () => {
    expect(type).toBe("PRG_DELIM");
  });

  test(`value is "%"`, () => {
    expect(value).toBe("%");
  });
});

describe("token[1]", () => {
  const { type, value } = tokens[1];

  test(`type is "PRG_NUMBER"`, () => {
    expect(type).toBe("PRG_NUMBER");
  });

  test(`value is "1234"`, () => {
    expect(value).toBe(1234);
  });
});

describe("token[2]", () => {
  const { type, value } = tokens[2];

  test(`type is "COMMENT"`, () => {
    expect(type).toBe("COMMENT");
  });

  test(`value is "TEST PROGRAM"`, () => {
    expect(value).toBe("TEST PROGRAM");
  });
});

describe("token[3]", () => {
  const { type, value } = tokens[3];

  test(`type is "COMMENT"`, () => {
    expect(type).toBe("COMMENT");
  });

  test(`value is "CREATED: 12/20/2019"`, () => {
    expect(value).toBe("CREATED: 12/20/2019");
  });
});

describe("token[4]", () => {
  const { type, value } = tokens[4];

  test(`type is "G_CODE"`, () => {
    expect(type).toBe("G_CODE");
  });

  test(`value is "10"`, () => {
    expect(value).toBe(10);
  });
});

describe("token[5]", () => {
  const { type, value, text } = tokens[5];

  test(`text is "L2"`, () => {
    expect(text).toBe("L2");
  });

  test(`type is "ADDRESS"`, () => {
    expect(type).toBe("ADDRESS");
  });

  test(`value is "2"`, () => {
    expect(value).toBe(2);
  });
});
