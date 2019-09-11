import { LoggerLevel, RuntimeEnv } from '@dynamics/core-types';
import { expect } from 'chai';
import sinon from 'sinon';
import { getRuntimeEnv, Logger, trace } from '../src';
import * as loggerModule from '../src/logger/singleton';

afterEach(() => {
  sinon.restore();
});

describe('@dynamics/core-common', function () {

  describe('platform', function () {

    describe('getRuntimeEnv()', function () {

      it('returns the running environment of the current process', function () {
        const env = getRuntimeEnv();
        if (typeof process === 'object') {
          expect(env).to.equal(RuntimeEnv.NODE);
        } else if (window) {
          expect(env).to.equal(RuntimeEnv.WEB);
        } else {
          expect(env).to.equal(RuntimeEnv.UNKNOWN);
        }
      });

    });

  });

  describe('logger', function () {

    describe('Logger', function () {

      it('prints logs when printer and level ready (v1)', function () {
        const argsRecord: any[] = [];
        const logger = new Logger(LoggerLevel.silly);
        logger.info(1, 2, 3);
        logger.info(4, 5, 6);
        logger.printer = {
          print(date, level, args) {
            if (args) {
              argsRecord.push(...args);
            }
          }
        };
        logger.info(7, 8, 9);
        expect(argsRecord).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });

      it('prints logs when printer and level ready (v2)', function () {
        const argsRecord: any[] = [];
        const logger = new Logger();
        logger.info(1, 2, 3);
        logger.info(4, 5, 6);
        logger.printer = {
          print(date, level, args) {
            if (args) {
              argsRecord.push(...args);
            }
          }
        };
        logger.level = LoggerLevel.silly;
        logger.info(7, 8, 9);
        expect(argsRecord).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });

      it('prints the proper level', function () {
        const argsRecord: any[] = [];
        const logger = new Logger(LoggerLevel.info, {
          print(date, level, args) {
            if (args) {
              argsRecord.push(...args);
            }
          }
        });
        logger.error(1, 2, 3);
        logger.warn(4, 5, 6);
        logger.info(7, 8, 9);
        logger.verbose(10, 11, 12);
        logger.debug(13, 14, 15);
        logger.silly(16, 17, 18);
        expect(argsRecord).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      });

    });

    describe('trace', function () {

      beforeEach(() => {
        // console.info('beforeEach');
      });

      it('traces input and output of a method', function () {
        const argsRecord: any[] = [];
        sinon.stub(loggerModule, 'logger').value((() => {
          const mockLogger = new Logger();
          mockLogger.level = LoggerLevel.silly;
          mockLogger.printer = {
            print(date, level, args) {
              if (level === LoggerLevel.debug && args) {
                argsRecord.push(...args);
              }
            }
          };
          return mockLogger;
        })());

        class Test {
          @trace
          test(a: number, b: number) {
            return a + b;
          }

          toString() {
            return '<Test>';
          }
        }
        const test = new Test();

        test.test(10, 20);
        const correctRecord = [
          '{0} {1}({2}) called', '<Test>', 'test', [10, 20],
          '{0} {1}({2}) => {3}', '<Test>', 'test', [10, 20], 30
        ];
        expect(argsRecord).to.deep.equal(correctRecord);
      });

    });

  });

});
