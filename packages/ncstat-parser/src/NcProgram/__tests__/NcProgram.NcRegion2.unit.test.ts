import {
  getDemoFileContents,
} from "../../../testing/test-helpers";
import { NcParser } from "../../NcParser";

const source = `%
O1234 (example)
(header)

G10 L2 P1 X1.23 Y4.56 Z7.89 B0.

( DRILL FOR M5 X 0.8 ROLL TAP )
N43 ( #14 [.182"] DRILL, CARB, TSC )
M107
T43 M6
M01 ( #14 [.182"] DRILL, CARB, TSC )
G0 G90 G55
M22
B90.
M21
X1.75 Y.19 S10495 M3
M50 (TSC COOLANT ON)
G4 X2.
G43 H#518 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
X.75
Y1.81
X1.75
G80
M107
/3 G103 M1. ( TOOL BREAK CHECK )
M9
M5
M52 ( THRU TOOL AIR ON )
G4 X6.
M53 ( THRU TOOL AIR OFF )


( M5 X 0.8 ROLL TAP )
N44 ( M5 X 0.8 ROLL TAP, PULLEY )
M107
T44 M6
M01 ( M5 X 0.8 ROLL TAP, PULLEY )
G0 G90 G55
M22
B90.
M21
X1.75 Y.19 S762 M3
G43 H#518 Z1. T3
M8
G94
M80 S762
G98 G84 Z-.5 R.1 F24.
X.75
Y1.81
X1.75
G80
G94
M107
/3 G103 M1. ( TOOL BREAK CHECK )
M30
%`;

describe(`program.getRegions() of "./demo/TRM.NC"`, () => {
  const program = NcParser.parse(source);
  const regions = program.getRegions();

  it("should have 5 regions", () => {
    expect(regions).toHaveLength(5);
  });

  describe("the first region", () => {
    it("should start on line 2", () => {
      expect(regions[0].start).toBe(2);
    });

    it.skip("should end on line 5", () => {
      expect(regions[0].end).toBe(5);
    });
  });

  it("should have the last region ending on line 56", () => {
    expect(regions[regions.length - 1].end).toBe(56);
  });
});
