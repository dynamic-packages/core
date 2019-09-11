import { LoggerLevel } from '../logger';

interface ILogConfig {
  level: LoggerLevel;
}

interface IPackageConfig {
  ignored: string[];
  startup: string[];
  stopped: string[];
}

export interface IProjectConfig {
  log: ILogConfig;
  packages: IPackageConfig;
}

export interface IRuntimeProjectConfig {
  log?: ILogConfig;
  packages?: IPackageConfig;
}
