import { Base, getRuntimeEnv, logger, trace } from '@dynamics/core-common';
import { IRuntimeProjectConfig, LoggerLevel, RuntimeEnv } from '@dynamics/core-types';

class Runtime extends Base {

  private readonly _env: RuntimeEnv;
  private readonly _runtimeConfig: IRuntimeProjectConfig;

  constructor(runtimeConfig: IRuntimeProjectConfig = {}) {
    super();
    this._env = getRuntimeEnv();
    this._runtimeConfig = runtimeConfig;
    this._configLog(runtimeConfig);
  }

  @trace
  start() {
    // TODO cache graph
  }

  private _configLog(runtimeConfig: IRuntimeProjectConfig) {
    const { log } = runtimeConfig;
    logger.level = log && log.level ? log.level : LoggerLevel.info;
  }
}

export default Runtime;
