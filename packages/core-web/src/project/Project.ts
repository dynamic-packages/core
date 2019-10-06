import {
  IProject, IProjectConfig
} from '@dynamics/core-types';

class Project implements IProject {

  getConfig(): IProjectConfig {
    return {
      log: {
        level: 0
      },
      package: {
        ignored: [],
        startup: [],
        stopped: [],
      },
      path: {
        root: ''
      }
    };
  }
}

export default Project;
