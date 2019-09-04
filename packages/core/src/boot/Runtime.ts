import { Base, getRuntimeEnv, trace } from '@dynamics/core-common';
import { IRuntimeProjectConfig, RuntimeEnv } from '@dynamics/core-types';

class Runtime extends Base {

  private readonly _env: RuntimeEnv;
  private readonly _runtimeConfig: IRuntimeProjectConfig;

  constructor(runtimeConfig: IRuntimeProjectConfig = {}) {
    super();
    this._env = getRuntimeEnv();
    this._runtimeConfig = runtimeConfig;
  }

  @trace
  start() {
    // TODO cache graph
  }
}

export default Runtime;
