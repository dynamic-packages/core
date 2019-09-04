import { ILogger, ILogPrinter, LoggerLevel } from '@dynamics/core-types';

interface ILogFrame {
  args?: any[];
  date: Date;
  level: LoggerLevel;
}

export default class Logger implements ILogger {

  private _buffer: ILogFrame[] = [];
  private _level: LoggerLevel | null = null;
  private _printer: ILogPrinter | null = null;
  private _released: boolean = false;

  constructor(level?: LoggerLevel, printer?: ILogPrinter) {
    if (level) {
      this.level = level;
      if (printer) {
        this.printer = printer;
      }
    }
  }

  get level(): LoggerLevel | null {
    return this._level;
  }

  set level(level: LoggerLevel | null) {
    this._level = level;
    if (this._printer) {
      this._flush();
    }
  }

  get printer(): ILogPrinter | null {
    return this._printer;
  }

  set printer(printer: ILogPrinter | null) {
    this._printer = printer;
    if (this._level) {
      this._flush();
    }
  }

  debug(...args: any[]) {
    this._print(LoggerLevel.debug, args);
  }

  error(...args: any[]) {
    this._print(LoggerLevel.error, args);
  }

  info(...args: any[]) {
    this._print(LoggerLevel.info, args);
  }

  silly(...args: any[]) {
    this._print(LoggerLevel.silly, args);
  }

  verbose(...args: any[]) {
    this._print(LoggerLevel.verbose, args);
  }

  warn(...args: any[]) {
    this._print(LoggerLevel.warn, args);
  }

  private _flush() {
    const { _buffer, _released, level, printer } = this;
    if (!_released && level && printer) {
      while (_buffer.length) {
        const frame = _buffer.shift();
        if (frame && (frame.level <= level)) {
          printer.print(frame.date, frame.level, frame.args);
        }
      }
      this._released = true;
    }
  }

  private _print($level: LoggerLevel, args?: any[]) {
    const { _buffer, _released, level, printer } = this;
    if (_released && level && printer) {
      if ($level <= level) {
        printer.print(new Date(), $level, args);
      }
    } else {
      _buffer.push({
        args,
        date: new Date(),
        level: $level
      });
    }
  }
}
