import { AbstractPackageManager } from '@dynamics/core-common';
import { IDynamicPackage } from '@dynamics/core-types';

class WebPackageManager extends AbstractPackageManager {

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

export default WebPackageManager;
