import { EventEmitter } from 'events';

export interface IBase extends EventEmitter {
  toString(): string;
}

export interface IKeyString {
  [key: string]: string;
  [key: number]: string;
}

export interface IKeyValue {
  [key: string]: any;
  [key: number]: any;
}

export interface IFlag extends IBase {
  getBitMask(): number;
  getFlag(flag: number): boolean;
  resetFlags(): void;
  setFlag(flag: number, value: boolean): void;
}
