import {
  getDemoFileContents,
  parseSource
} from "../../lib/test-helpers";

describe(`program.getRegions() of "./demo/TRM.NC"`, () => {
  const program = parseSource(getDemoFileContents("TRM.NC"));
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
