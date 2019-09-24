export default function format(...args: any[]): string {
  const template = args[0];
  if (typeof template === 'string') {
    return template.replace(/{(\d+)}/g, (match, i: number) => {
      return args[++i] === void 0 ? '' : args[i];
    });
  }
  throw new Error('First argument should be a string.');
}
