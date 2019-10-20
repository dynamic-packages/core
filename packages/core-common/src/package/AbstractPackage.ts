import { IDynamicPackage } from '@dynamics/core-types';
import Flag from '../common/Flag';

abstract class AbstractPackage extends Flag implements IDynamicPackage {

  constructor() {
    super();
  }
}

export default AbstractPackage;
