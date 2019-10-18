import { IDependencyMap, IPackageJson } from 'package-json-type';
import { IPackageNode } from 'walk-package-graph';
import { IBase, IFlag } from '../common';

export type IPackageResolveHandler = (pkg: IDynamicPackage) => void;

export interface IDynamicPackage extends IFlag {
  // TODO
}

export {
  IDependencyMap,
  IPackageNode,
  IPackageJson
};

export interface IPackageManager extends IBase {
  discover(): void;
  install(pkg: IDynamicPackage): void;
  list(): IDynamicPackage[];
  uninstall(pkg: IDynamicPackage): void;
  update(pkg: IDynamicPackage): void;
}

export interface IPackageResolver {
  onResolve(handler: IPackageResolveHandler): void;
  resolve(): Promise<IPackageNode>;
}
