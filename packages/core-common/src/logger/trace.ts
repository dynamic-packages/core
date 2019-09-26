import { spreadArray } from '../array';
import { logger } from './singleton';

export default function trace(T: any, method: string, desc: PropertyDescriptor) {
  return {
    value(...params: any[]) {
      logger.debug(
        '{0} {1}({2}) called',
        this.toString(), method, spreadArray(params),
        '%format'
      );
      const result = desc.value.apply(this, params);
      logger.debug(
        '{0} {1}({2}) => {3}',
        this.toString(), method, spreadArray(params),
        result === undefined ? 'void' : result,
        '%format'
      );
      return result;
    }
  };
}
