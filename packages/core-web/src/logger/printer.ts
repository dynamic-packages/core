import { strFormat, toString } from '@dynamics/core-common';
import { ILogPrinter, LoggerLevel } from '@dynamics/core-types';

interface IConsole extends Console {
  [key: string]: any;
}

const isChrome = (typeof window === 'object') && (
  (window.navigator.userAgent.indexOf('Chrome') > -1)
  || window.navigator.userAgent.indexOf('Firefox') > -1
);

const COLOR = {
  [LoggerLevel.debug]: 'gray',
  [LoggerLevel.error]: 'red',
  [LoggerLevel.info]: 'green',
  [LoggerLevel.silly]: 'gray',
  [LoggerLevel.verbose]: 'gray',
  [LoggerLevel.warn]: 'orange'
};

const methodMap = {
  [LoggerLevel.error]: 'error',
  [LoggerLevel.warn]: 'warn',
  [LoggerLevel.info]: 'info',
  [LoggerLevel.verbose]: 'log',
  [LoggerLevel.debug]: 'log',
  [LoggerLevel.silly]: 'log',
};

const prompt = 'dynamic';
const datePrefix = '[';
const dateSuffix = ']';

function formatDate(date: Date) {
  const time = date.getHours().toString().padStart(2, '0') + ':'
    + date.getMinutes().toString().padStart(2, '0') + ':'
    + date.getSeconds().toString().padStart(2, '0') + ' '
    + date.getMilliseconds().toString().padStart(3, '0');
  return datePrefix + time + dateSuffix;
}

function formatArgs(level: LoggerLevel, args: any[]): string {
  const _args = [];
  const len = args.length;
  for (let i = 0; i < len; i++) {
    _args[i] = toString(args[i], false);
  }
  return strFormat(..._args);
}

function spreadArgs(level: LoggerLevel, args: any[]) {
  const _args = [];
  const len = args.length;
  for (let i = 0; i < len; i++) {
    _args[i] = toString(args[i], true, true);
  }
  return _args.join(', ');
}

function writeLog(output: string, level: LoggerLevel) {
  const write = (console as IConsole)[methodMap[level]];
  if (isChrome) {
    write('%c ' + output, 'color:' + COLOR[level]);
  } else {
    write(output);
  }
}

const printer: ILogPrinter = {
  print(date: Date, level: LoggerLevel, args?: any[]) {
    if (!args || args.length === 0) {
      return;
    }
    const len = args.length;
    const tail = args[len - 1];
    let output = prompt + ' ' + formatDate(date);
    if (tail && tail[0] === '%') {
      if (len === 1 && tail === '%nl') {
        writeLog('\n', level);
        return;
      }
      args.pop();
      const tails: string[] = tail.substring(1).split(',');
      if (tails.includes('format')) {
        output += ' ' + formatArgs(level, args);
      } else {
        output += ' ' + spreadArgs(level, args);
      }
      const outputArgs = [output];
      if (isChrome) {
        outputArgs.push('color:' + COLOR[level]);
      }
      if (tails.includes('spin_start')) {
        writeLog(output, level);
      } else if (tails.includes('spin_stop')) {
        if (args.length) writeLog(output, level);
      } else if (tails.includes('update')) {
        writeLog(output, level);
      } else {
        writeLog(output, level);
      }
    } else {
      output += ' ' + spreadArgs(level, args);
      writeLog(output, level);
    }
  }
};

export default printer;
