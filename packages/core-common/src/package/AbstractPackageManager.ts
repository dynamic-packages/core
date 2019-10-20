import { IDynamicPackage, IPackageManager } from '@dynamics/core-types';
import { Base } from '../common';
import PackageRegistry from './PackageRegistry';

abstract class AbstractPackageManager extends Base implements IPackageManager {

  protected packageRegistry_: PackageRegistry;

  constructor() {
    super();
    this.packageRegistry_ = new PackageRegistry();
  }

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
