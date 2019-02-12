import { EventEmitter } from 'events';

export interface IBase extends EventEmitter {
  toString(): string;
}

export interface IFlag extends IBase {
  getBitMask(): number;
  getFlag(flag: number): boolean;
  resetFlags(): void;
  setFlag(flag: number, value: boolean): void;
}
