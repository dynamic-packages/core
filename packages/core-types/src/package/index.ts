import { IBase, IFlag } from '../common';

export type IPackageResolveHandler = (pkg: IDynamicPackage) => void;

export interface IDynamicPackage extends IFlag {
  // TODO
}

export interface IPackageNode {
  children: IPackageNode[];
}

export interface IPackageManager extends IBase {
  discover(): void;
  install(pkg: IDynamicPackage): void;
  uninstall(pkg: IDynamicPackage): void;
  update(pkg: IDynamicPackage): void;
}

export interface IPackageResolver {
  onResolve(handler: IPackageResolveHandler): void;
  resolve(): Promise<IPackageNode>;
}
