import {EventEmitter} from 'events';

export interface IBase extends EventEmitter {
    toString(): string;
}
