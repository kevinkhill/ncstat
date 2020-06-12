import { getDemoFileContents, parseSource } from "@/lib/test-helpers";

describe(`program.getRegions() of "./demo/VF10.NC"`, () => {
  const program = parseSource(getDemoFileContents("VF10.NC"));
  const regions = program.getRegions();

  it("should have 3 lines", () => {
    expect(regions).toHaveLength(35);
  });

  describe("the first region", () => {
    it("should start on line 2", () => {
      expect(regions[0].start).toBe(2);
    });

    it("should end on line 6", () => {
      expect(regions[0].end).toBe(5);
    });
  });

  it("should have the last region ending on line 22239", () => {
    expect(regions[regions.length - 1].end).toBe(22239);
  });
});
