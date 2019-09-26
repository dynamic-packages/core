import { objectToString } from '../object';

export default function toString(
  arg: any,
  quoteText: boolean = true,
  flat: boolean = false
): string {
  const type = typeof arg;
  if (type === 'object') {
    return objectToString(arg, flat);
  } else if (type === 'function') {
    return `<Function>${arg.name || 'anonymous'}()`;
  } else if (type === 'string') {
    return quoteText ? `'${arg}'` : arg;
  } else if (type === 'symbol') {
    return arg.toString();
  }
  return arg;
}
