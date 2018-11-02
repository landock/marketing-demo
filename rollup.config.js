import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

export default {
  input: "source/javascripts/site.js",
  output: {
    file: "build/javascripts/bundle.js",
    name: "marketingDemo",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    resolve({ jsnext: true }),
    babel({
      exclude: "node_modules/**" // only transpile our source code
    }),
    commonjs({
      include: "node_modules/**",

      namedExports: {
          // Gotcha: You need to
          // explicitly name the exports
          // because commonjs plugin is
          // not smart enough to work
          // with pixi.js Browserify v4 builds
          'pixi.js': [
              'VERSION',
              'Application',
              'Graphics',
              'Sprite',
              'BaseTexture',
              'Texture',
              'Transform'
          ]
      }
    }),
    globals(),
    builtins()
  ]
};
