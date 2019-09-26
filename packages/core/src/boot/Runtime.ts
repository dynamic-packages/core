import { Base, getRuntimeEnv, logger, trace } from '@dynamics/core-common';
import { nodeLogPrinter } from '@dynamics/core-node';
import { IRuntimeProjectConfig, LoggerLevel, RuntimeEnv } from '@dynamics/core-types';
import { webLogPrinter } from '@dynamics/core-web';

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
    const { _env } = this;
    const { log } = runtimeConfig;
    logger.level = log && log.level ? log.level : LoggerLevel.info;
    if (_env === RuntimeEnv.NODE) {
      logger.printer = nodeLogPrinter;
    } else if (_env === RuntimeEnv.WEB) {
      logger.printer = webLogPrinter;
    }
  }
}

export default Runtime;
