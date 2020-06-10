import { parseSource } from "@/lib/test-helpers";

const simpleProgram = `%
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
%`;

const program = parseSource(simpleProgram);

describe(`program.getRegion()`, () => {
  const seps = program.regionSeparations;

  it(`has the right number of values`, () => {
    expect(seps).toHaveLength(2);
  });

  it(`has the right values`, () => {
    expect(seps).toEqual([1, 2]);
  });
});
