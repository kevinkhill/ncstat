import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/cli/index.ts",
  output: {
    file: "./dist/ncstat.cli.js",
    format: "esm"
  },
  external: ["NcParser"],
  plugins: [
    typescript(),
    commonjs(),
    resolve({
      preferBuiltins: true
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".ts"]
    })
  ]
};
