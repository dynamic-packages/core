import { RuntimeEnv } from '@dynamics/core-types';
import { expect } from 'chai';
import { getRuntimeEnv } from '../../src';

describe('getRuntimeEnv()', function () {
  it('returns the running environment of the current process', function () {
    const env = getRuntimeEnv();
    if (typeof process === 'object') {
      expect(env).to.equal(RuntimeEnv.NODE);
    } else if (window) {
      expect(env).to.equal(RuntimeEnv.WEB);
    } else {
      expect(env).to.equal(RuntimeEnv.UNKNOWN);
    }
  });
});
