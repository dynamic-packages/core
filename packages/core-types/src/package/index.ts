import { IBase, IFlag } from '../common';

export interface IDynamicPackage extends IFlag {

}

export interface IPackageManager extends IBase {
  init(): void;
  install(pkg: IDynamicPackage): void;
  uninstall(pkg: IDynamicPackage): void;
  update(pkg: IDynamicPackage): void;
}
