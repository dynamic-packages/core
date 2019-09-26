import { ILogPrinter, LoggerLevel } from '@dynamics/core-types';

const printer: ILogPrinter = {
  print(date: Date, level: LoggerLevel, args?: any[]) {
    console.info(args);
  }
};

export default printer;
