export enum LoggerLevel {
  error = 0,
  warn = 1, // default
  info = 2,
  verbose = 3,
  debug = 4,
  silly = 5,
}

type ILogMethod = (...args: any[]) => void;

export interface ILogger {
  debug: ILogMethod;
  error: ILogMethod;
  info: ILogMethod;
  level: number | null;
  silly: ILogMethod;
  verbose: ILogMethod;
  warn: ILogMethod;
}

export interface ILogPrinter {
  print: (date: Date, level: LoggerLevel, args?: any[]) => void;
}
