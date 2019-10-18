import { IDynamicPackage, IPackageManager } from '@dynamics/core-types';
import { Base } from '../common';

abstract class AbstractPackageManager extends Base implements IPackageManager {

  abstract discover(): void;

  abstract install(pkg: IDynamicPackage): void;

  list() {
    // TODO implement
    return [];
  }

  abstract uninstall(pkg: IDynamicPackage): void;

  abstract update(pkg: IDynamicPackage): void;
}

export default AbstractPackageManager;
