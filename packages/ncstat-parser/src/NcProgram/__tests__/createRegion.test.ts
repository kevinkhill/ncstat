import { parseSource } from "./helpers";

const simpleProgram = `%
:1234 (TEST)
(DATE - JUN. 09 2020)
(TIME - 7:45 AM)
( MATERIAL - AL 1" X 2" X 3" )

M107
N115 ( 2.5" FACE MILL ALUMINUM )
T115 M106
M01 ( 2.5" FACE MILL ALUMINUM )
G0 G90 G54
%`;

const program = parseSource(simpleProgram);

describe(`createRegion() API`, () => {
  const region = program.createRegion(2, block => block.isEmpty);

  const regionArray = region.toArray();

  it(`has the right number of lines`, () => {
    expect(regionArray).toHaveLength(3);
  });

  it(`can be accessed via .length have comments extracted from the region`, () => {
    expect(regionArray).toHaveLength(3);
  });

  it(`has correct line[0]`, () => {
    expect(regionArray[0]).toBe("DATE - JUN. 09 2020");
  });

  it(`has correct line[1]`, () => {
    expect(regionArray[1]).toBe("TIME - 7:45 AM");
  });

  it(`has correct line[2]`, () => {
    expect(regionArray[2]).toBe(`MATERIAL - AL 1" X 2" X 3"`);
  });

  it(`has can be output to NC format`, () => {
    const output = `(DATE - JUN. 09 2020)
(TIME - 7:45 AM)
( MATERIAL - AL 1" X 2" X 3" )`;

    expect(region.toString()).toBe(output);
  });
});
