import buble from 'rollup-plugin-buble';
import json from 'rollup-plugin-json';
import license from 'rollup-plugin-license';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

export default {
  context: 'window',
  input: 'dist/esm/index.js',
  output: {
    file: 'dist/amd/index.min.js',
    format: 'amd',
    sourcemap: true
  },
  external: [
    '@dynamics/core-node'
  ],
  plugins: [
    json(),
    resolve({
      preferBuiltins: true
    }),
    buble(),
    builtins(),
    uglify(),
    license({
      banner: {
        content: {
          file: 'config/LICENSE'
        }
      }
    })
  ]
};
