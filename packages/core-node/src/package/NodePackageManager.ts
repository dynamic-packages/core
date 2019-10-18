import { AbstractPackageManager, logger } from '@dynamics/core-common';
import { IDynamicPackage } from '@dynamics/core-types';
import { walkPackageGraph } from 'walk-package-graph';

class NodePackageManager extends AbstractPackageManager {

  private _projectRoot: string;

  constructor(projectRoot: string) {
    super();
    this._projectRoot = projectRoot;
  }

  discover(): void {
    logger.info('discovering dynamic packages ...', '%format');
    const packman = this;
    walkPackageGraph(this._projectRoot, {
      onEnd() {
        logger.info('end', '%spin_stop');
      },
      onError(err) {
        logger.error(err);
      },
      onResolve(node) {
        logger.info('{0} detected', node.id, '%format');
        packman.emit('discover', node);
      },
      onUnresolve(node, names) {
        logger.warn(
          '{0} has unresolved dependencies ({1})',
          node.id, JSON.stringify(names),
          '%format'
        );
      }
    });
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
