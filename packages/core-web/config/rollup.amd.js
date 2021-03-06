import buble from 'rollup-plugin-buble';
import json from 'rollup-plugin-json';
import license from 'rollup-plugin-license';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import nodent from 'rollup-plugin-nodent';

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
    nodent({
      promises: true,
      noRuntime: true
    }),
    buble(),
    builtins(),
    license({
      banner: {
        content: {
          file: 'config/LICENSE'
        }
      }
    })
  ]
};
