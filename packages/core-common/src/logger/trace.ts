import { logger } from './singleton';

export default function trace(T: any, method: string, desc: PropertyDescriptor) {
  return {
    value(...params: any[]) {
      logger.debug(
        '{0} {1}({2}) called',
        this.toString(), method, params
      );
      const result = desc.value.apply(this, params);
      logger.debug(
        '{0} {1}({2}) => {3}',
        this.toString(), method, params,
        result === undefined ? 'void' : result
      );
      return result;
    }
  };
}
