export enum RuntimeEnv {
  NODE = 'node',
  UNKNOWN = 'unknown',
  WEB = 'web',
}

export interface IEsModule {
  __esModule: boolean;
  default?: any;
}
