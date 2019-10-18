import { IPackageNode, IPackageResolveHandler, IPackageResolver } from '@dynamics/core-types/dist/types';

class WebPackageResolver implements IPackageResolver {

  onResolve(handler: IPackageResolveHandler) {
    //
  }

  resolve(): Promise<IPackageNode> {
    return new Promise((resolve) => {
      // TODO resolve root node
      // resolve({
      //   children: []
      // });
    });
  }
}

export default WebPackageResolver;
