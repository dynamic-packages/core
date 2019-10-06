import { LoggerLevel } from '../logger';

interface ILogConfig {
  level: LoggerLevel;
}

interface IPackageConfig {
  ignored: string[];
  startup: string[];
  stopped: string[];
}

export interface IProject {
  getConfig: () => IProjectConfig;
}

export interface IProjectConfig {
  log: ILogConfig;
  package: IPackageConfig;
  path: IProjectPathConfig;
}

export interface IProjectPathConfig {
  root: string;
}

export interface IRuntimeProjectConfig {
  log?: ILogConfig;
  package?: IPackageConfig;
  path?: IRuntimeProjectPathConfig;
}

export interface IRuntimeProjectPathConfig {
  root?: string;
}
