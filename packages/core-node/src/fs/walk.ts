import fs from 'fs';
import path from 'path';

interface IResult {
  dir: string;
  file: string;
}

const { sep } = path;

function walk(
  fileName: string,
  dir: string,
  onEnd: (result: IResult | null) => void,
  onError: (e: Error) => void
) {
  const file = path.resolve(dir, fileName);
  fs.readFile(file, 'utf8', (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        const tokens = dir.split(sep);
        tokens.pop();
        const newDir = tokens.join(sep);
        if (newDir) {
          walk(fileName, newDir, onEnd, onError);
        } else {
          onEnd(null);
        }
      } else {
        onError(err);
      }
    } else {
      onEnd({ dir, file });
    }
  });
}

export default walk;
