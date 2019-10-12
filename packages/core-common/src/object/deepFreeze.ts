/**
 * Original source code :
 * https://github.com/substack/deep-freeze
 */

function deepFreeze(obj: any) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (obj.hasOwnProperty(prop)) {
      const value = obj[prop];
      const type = typeof value;
      if (
        value !== null
        && (type === 'object' || type === 'function')
        && !Object.isFrozen(value)
      ) {
        deepFreeze(value);
      }
    }
  });
  return obj;
}

export default deepFreeze;
