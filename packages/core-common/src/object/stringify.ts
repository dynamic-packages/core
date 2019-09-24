import { IKeyValue } from '@dynamics/core-types';

const regComma = /,/g;
const regQuote = /\"/g;
const regProp = /\"(\w+)\":/g;

function simpleJson(obj: object) {
  return JSON.stringify(obj)
    .replace(regProp, '$1:')
    .replace(regQuote, '\'')
    .replace(regComma, ', ');
}

export default function stringify(arg: IKeyValue): string {
  const type = typeof arg;
  if (!arg || type !== 'object') {
    return arg + '';
  }
  if (type === 'object') {
    try {
      return simpleJson(arg);
    } catch (e) {
      const valueStringFied = Object.keys(arg)
        .reduce((acc: IKeyValue, key) => {
          acc[key] = arg[key] + '';
          return acc;
        }, {});
      return simpleJson(valueStringFied);
    }
  }
  const argStr = arg.toString();
  if (argStr === '[object Object]') {
    return `<${arg.constructor.name}>`;
  }
  return argStr;
}
