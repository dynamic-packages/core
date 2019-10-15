import {
  Base, getRuntimeEnv, logger,
  PluginManager,
  trace
} from '@dynamics/core-common';
import {
  nodeLogPrinter, NodePackageManager, NodeProject
} from '@dynamics/core-node';
import {
  IPackageManager, IProject, IRuntimeProjectConfig,
  LoggerLevel, RuntimeEnv
} from '@dynamics/core-types';
import {
  webLogPrinter, WebPackageManager, WebProject
} from '@dynamics/core-web';

const env = getRuntimeEnv();

class Runtime extends Base {

  private readonly _runtimeCfg: IRuntimeProjectConfig;

  constructor(runtimeConfig: IRuntimeProjectConfig = {}) {
    super();
    this._runtimeCfg = runtimeConfig;
  }

  @trace
  async start() {
    let project;
    let packageManager;
    if (env === RuntimeEnv.NODE) {
      project = new NodeProject(this._runtimeCfg);
      const { log, realPath } = await project.getConfig();
      this._configLog(log.level);
      packageManager = new NodePackageManager(realPath.root);
      this._loadPlugins(project, packageManager);
    } else if (env === RuntimeEnv.WEB) {
      project = new WebProject();
      const { log } = await project.getConfig();
      this._configLog(log.level);
      packageManager = new WebPackageManager();
      this._loadPlugins(project, packageManager);
    }
  }

  toString() {
    return '<Runtime>';
  }

  private _configLog(logLevel: LoggerLevel) {
    logger.level = logLevel;
    if (env === RuntimeEnv.NODE) {
      logger.printer = nodeLogPrinter;
    } else if (env === RuntimeEnv.WEB) {
      logger.printer = webLogPrinter;
    }
  }

  private async _loadPlugins(project: IProject, packageManager: IPackageManager) {
    const pluginManager = new PluginManager();
    pluginManager.on('beforeActive', (plugin) => {
      if (plugin.name === '@dynamics/core') {
        plugin.context.publishService(project);
        plugin.context.publishService(packageManager);
      }
    });
    packageManager.on('discover', (manifest) => {
      pluginManager.createPlugin(manifest);
    });
    packageManager.discover();
  }
}

export default Runtime;
