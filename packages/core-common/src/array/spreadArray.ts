import toString from './toString';

export default function spreadArray(arr: any[]) {
  const strings = arr.map((item) => {
    return toString(item);
  });
  return strings.join(', ');
}
