export interface IProjectConfig {
  packages: {
    ignored: string[],
    startup: string[],
    stopped: string[]
  };
}

export interface IRuntimeProjectConfig {
  packages?: {
    ignored: string[],
    startup: string[],
    stopped: string[]
  };
}
