interface IResult {
  dir: string;
  file: string;
}

function walk(
  fileName: string, startDir: string,
  onEnd: (result: IResult | null) => void,
  onError: (e: Error) => void
) {
  // TODO
}

export default walk;
