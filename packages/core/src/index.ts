import { IRuntimeProjectConfig } from '@dynamics/core-types';
import Runtime from './boot/Runtime';

/**
 * Starts dynamic.js runtime with the given config
 */
function dynamic(runtimeConfig: IRuntimeProjectConfig) {
  (new Runtime(runtimeConfig)).start();
}

export default dynamic;
