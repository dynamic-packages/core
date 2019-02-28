import { RuntimeEnv } from '@dynamics/core-types';

function getRuntimeEnv(): RuntimeEnv {
  if (typeof process === 'object') {
    return RuntimeEnv.NODE;
  } else if (window) {
    return RuntimeEnv.WEB;
  }
  return RuntimeEnv.UNKNOWN;
}

export default getRuntimeEnv;
