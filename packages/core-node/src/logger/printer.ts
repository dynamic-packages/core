import { strFormat, toString } from '@dynamics/core-common';
import { ILogPrinter, LoggerLevel } from '@dynamics/core-types';
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';
import readline from 'readline';

const COLOR = {
  [LoggerLevel.debug]: chalk.gray,
  [LoggerLevel.error]: chalk.redBright,
  [LoggerLevel.info]: chalk.whiteBright,
  [LoggerLevel.silly]: chalk.gray,
  [LoggerLevel.verbose]: chalk.gray,
  [LoggerLevel.warn]: chalk.yellowBright
};

let spinner: Spinner | null = null;
const prompt = chalk.cyan('dynamic');
const datePrefix = chalk.white('[');
const dateSuffix = chalk.white(']');

function formatDate(date: Date) {
  const time = date.getHours().toString().padStart(2, '0') + ':'
    + date.getMinutes().toString().padStart(2, '0') + ':'
    + date.getSeconds().toString().padStart(2, '0') + ' '
    + date.getMilliseconds().toString().padStart(3, '0');
  return datePrefix + chalk.gray(time) + dateSuffix;
}

function formatArgs(level: LoggerLevel, args: any[]): string {
  const _args = [];
  const len = args.length;
  for (let i = 0; i < len; i++) {
    _args[i] = toString(args[i], false);
  }
  return COLOR[level](strFormat(..._args));
}

function spreadArgs(level: LoggerLevel, args: any[]) {
  const _args = [];
  const len = args.length;
  for (let i = 0; i < len; i++) {
    _args[i] = toString(args[i], true, true);
  }
  return COLOR[level](_args.join(', '));
}

const printer: ILogPrinter = {
  print(date: Date, level: LoggerLevel, args?: any[]) {
    if (!args || args.length === 0) {
      return;
    }
    const { stdout } = process;
    const len = args.length;
    const tail = args[len - 1];
    let output = prompt + ' ' + formatDate(date);
    if (tail && tail[0] === '%') {
      if (len === 1 && tail === '%nl') {
        stdout.write('\n');
        return;
      }
      args.pop();
      const tails: string[] = tail.substring(1).split(',');
      if (tails.includes('format')) {
        output += ' ' + formatArgs(level, args);
      } else {
        output += ' ' + spreadArgs(level, args);
      }
      if (tails.includes('spin_start')) {
        spinner = new Spinner(output + '%s');
        spinner.start();
      } else if (tails.includes('spin_stop')) {
        if (spinner) spinner.stop(true);
        if (args.length) stdout.write(output);
      } else if (tails.includes('update')) {
        readline.clearLine(stdout, 1);
        readline.cursorTo(stdout, 0);
        stdout.write(output);
      } else {
        stdout.write(output + '\n');
      }
    } else {
      output += ' ' + spreadArgs(level, args);
      stdout.write(output + '\n');
    }
  }
};

export default printer;
