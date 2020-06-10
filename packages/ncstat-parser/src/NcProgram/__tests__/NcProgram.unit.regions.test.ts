import { parseSource } from "@/lib/test-helpers";

const program = parseSource(`%
:1234 (TEST)
(DATE - JUN. 09 2020)
(TIME - 7:45 AM)
(MATERIAL - AL 1" X 2" X 3")

(Region #2)
(Region #2)

(Region #3)
(Region #3)
(Region #3)

(Region #4)
(Region #4)
(Region #4)
(Region #4)

M107
N115 ( 2.5" FACE MILL ALUMINUM )
T115 M106
M01 ( 2.5" FACE MILL ALUMINUM )
G0 G90 G54
%`);

const BLANK_LINES = [5, 8, 12, 17];
const REGION_SPANS = [
  { from: 2, to: 4 },
  { from: 6, to: 7 },
  { from: 9, to: 11 },
  { from: 13, to: 16 },
  { from: 18, to: 22 }
];

describe(`program.regions`, () => {
  it(`has the right number of values`, () => {
    expect(program.blankLines).toHaveLength(4);
  });

  it(`has the right values`, () => {
    expect(program.blankLines).toEqual(BLANK_LINES);
  });

  it(`has the right number of regions`, () => {
    expect(program.regions).toHaveLength(5);
  });

  it(`has the regions defined`, () => {
    expect(program.regions).toEqual(REGION_SPANS);
  });
});
