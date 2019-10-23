import { IDependencyMap, IPackageJson } from 'package-json-type';
import { IPackageNode } from 'walk-package-graph';
import { IBase, IFlag, IKeyString } from '../common';

export type IPackageResolveHandler = (pkg: IDynamicPackage) => void;

export interface IDynamicMeta {
  activator?: string;
  implements: any;
  interface: any;
  state: any;
  targets: any;
}

export interface IDynamicPackage extends IFlag {
  dependencies: IDynamicPackage[];
  manifest: IPackageJson;
}

export interface IDynamicPackageJson extends IPackageJson {
  dependencies: IKeyString;
  dynamic: IDynamicMeta;
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
