import { AbstractPackageManager, logger } from '@dynamics/core-common';
import { IDynamicPackage } from '@dynamics/core-types';

class NodePackageManager extends AbstractPackageManager {

  constructor(projectRoot: string) {
    super();
    console.info('projectRoot', projectRoot);
  }

  discover(): void {
    //
  }

  install(pkg: IDynamicPackage) {
    //
  }

  uninstall(pkg: IDynamicPackage): void {
    //
  }

  update(pkg: IDynamicPackage): void {
    //
  }
}

export default NodePackageManager;
