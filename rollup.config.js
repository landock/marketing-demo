import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

export default {
  input: "source/javascripts/site.js",
  output: {
    file: "build/javascripts/bundle.js",
    name: "wink",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    resolve({ jsnext: true }),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    }),
    commonjs({
      include: "node_modules/**"
    }),
    globals(),
    builtins()
  ]
};
