import { IBase } from '@dynamics/core-types';
import { EventEmitter } from 'events';

class Base extends EventEmitter implements IBase {
  constructor() {
    super();
  }

  toString() {
    let classNm = '';
    if (this.constructor.name) {
      classNm = `<${this.constructor.name}>`;
    }
    return classNm;
  }
}

export default Base;
