import { IFlag } from '@dynamics/core-types';
import Base from './Base';

class Flag extends Base implements IFlag {

  private _flags: number = 0;

  constructor() {
    super();
  }

  getBitMask() {
    return this._flags;
  }

  getFlag(toRead: number) {
    return (this._flags & toRead) !== 0;
  }

  resetFlags() {
    this._flags = 0;
  }

  setFlag(flag: number, value: boolean) {
    if (flag === void 0) {
      throw new Error('invalid flag');
    }
    if (value === true) {
      this._flags |= flag;
    } else {
      this._flags &= ~flag;
    }
  }
}

export default Flag;
