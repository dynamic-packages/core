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
    this._configLog(runtimeConfig);
  }

  @trace
  start() {
    if (env === RuntimeEnv.NODE) {
      const project = new NodeProject(this._runtimeCfg);
      const { path } = project.getConfig();
      this._loadPlugins(project, new NodePackageManager(path.root));
    } else if (env === RuntimeEnv.WEB) {
      this._loadPlugins(new WebProject(), new WebPackageManager());
    }
  }

  toString() {
    return '<Runtime>';
  }

  private _configLog(runtimeCfg: IRuntimeProjectConfig) {
    const { log } = runtimeCfg;
    logger.level = log && log.level ? log.level : LoggerLevel.info;
    if (env === RuntimeEnv.NODE) {
      logger.printer = nodeLogPrinter;
    } else if (env === RuntimeEnv.WEB) {
      logger.printer = webLogPrinter;
    }
  }

  private _loadPlugins(project: IProject, packageManager: IPackageManager) {
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
