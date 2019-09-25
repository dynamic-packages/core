import { stringify } from '../object';

export default function argsToStr(
  arg: any, quote: boolean = true, flat: boolean = false
): string {
  const type = typeof arg;
  if (type === 'object') {
    return stringify(arg, flat);
  } else if (type === 'function') {
    return `<Function>(${arg.name || 'anonymous'})`;
  } else if (type === 'string') {
    return quote ? `'${arg}'` : arg;
  }
  return arg;
}
