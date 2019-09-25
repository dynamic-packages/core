import { IKeyValue } from '@dynamics/core-types';

const regComma = /,/g;
const regQuote = /\"/g;
const regProp = /\"(\w+)\":/g;

function json(obj: object) {
  return JSON.stringify(obj)
    .replace(regProp, '$1:')
    .replace(regQuote, '\'')
    .replace(regComma, ', ');
}

function flatten(obj: any) {
  const items = Object.keys(obj).map((key) => {
    let value = obj[key];
    const type = typeof value;
    if (type === 'string') {
      value = `'${value}'`;
    } else if (type === 'object') {
      value = value.toString();
      if (value === '[object Object]') {
        value = `<${obj.constructor.name}>`;
      }
    }
    return key + ':' + value;
  });
  return '{' + items.join(', ') + '}';
}

export default function stringify(arg: IKeyValue, flat: boolean = false): string {
  const type = typeof arg;
  if (!arg || type !== 'object') {
    return arg + '';
  }
  if (type === 'object') {
    try {
      return flat ? flatten(arg) : json(arg);
    } catch (e) {
      const valueStringfied = Object.keys(arg)
        .reduce((acc: IKeyValue, key) => {
          acc[key] = arg[key] + '';
          return acc;
        }, {});
      return flat ? flatten(valueStringfied) : json(valueStringfied);
    }
  }
  const argStr = arg.toString();
  if (argStr === '[object Object]') {
    return `<${arg.constructor.name}>`;
  }
  return argStr;
}
