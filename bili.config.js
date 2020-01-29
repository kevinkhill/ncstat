/** @type {import('bili').Config} */
export const config = {
  input: "src/index.ts",
  plugins: {
    typescript2: {
      tsconfigOverride: {
        include: ["src"]
      }
    }
  }
};
