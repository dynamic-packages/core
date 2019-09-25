import { argsToStr } from '../array';
import { logger } from './singleton';

export default function trace(T: any, method: string, desc: PropertyDescriptor) {
  return {
    value(...params: any[]) {
      let param = argsToStr(params, false);
      param = param.slice(1, -1);
      logger.debug(
        '{0} {1}({2}) called',
        this.toString(), method, param,
        '%format'
      );
      const result = desc.value.apply(this, params);
      logger.debug(
        '{0} {1}({2}) => {3}',
        this.toString(), method, param,
        result === undefined ? 'void' : result,
        '%format'
      );
      return result;
    }
  };
}
