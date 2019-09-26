import { LoggerLevel } from '@dynamics/core-types';
import { expect, use } from 'chai';
import { Spinner } from 'cli-spinner';
import sinon from 'sinon';
import {
  nodeLogPrinter,
  NodePackageResolver,
} from '../src';

afterEach(() => {
  sinon.restore();
});

describe('@dynamics/core-node', function () {

  describe('logger', function () {

    describe('printer', function () {

      const date = new Date('1970-01-01T00:00:00');
      let outputRecord: string = '';

      class Sample {
        toString() {
          return '<Sample>';
        }
      }

      beforeEach(() => {
        sinon.stub(process, 'stdout').value((() => {
          const mockStdout = {
            write(output: string) {
              outputRecord = output;
            }
          };
          return mockStdout;
        })());
      });

      afterEach(() => {
        outputRecord = '';
      });

      it('formats logs with %format argument', function () {
        nodeLogPrinter.print(
          date, LoggerLevel.info,
          [
            'msg {2} {0} {7} {6} {1} {4} {5} {8} {3}',
            'abc',
            123,
            { a: 1 },
            function x() { /**/ },
            new Sample(),
            null,
            true,
            void 0,
            Symbol('sym'),
            '%format'
          ]
        );
        const correct = '\u001b[36mdynamic\u001b[39m \u001b[37m[\u001b[39m'
          + '\u001b[90m00:00:00 000\u001b[39m\u001b[37m]\u001b[39m '
          + '\u001b[97mmsg {a:1} abc  true 123 <Sample> null Symbol(sym) <Function>x()\u001b[39m\n';
        expect(outputRecord).to.equal(correct);
      });

      it('shows next-line with %nl argument', function () {
        nodeLogPrinter.print(date, LoggerLevel.info, ['%nl']);
        expect(outputRecord).to.equal('\n');
      });

      it('updates logs with %update argument', function () {
        const outputRecords = [];
        nodeLogPrinter.print(date, LoggerLevel.info, ['a', '%update']);
        outputRecords.push(outputRecord);
        nodeLogPrinter.print(date, LoggerLevel.info, ['b', '%update']);
        outputRecords.push(outputRecord);
        nodeLogPrinter.print(date, LoggerLevel.info, ['c', '%update']);
        outputRecords.push(outputRecord);
        const partial = '\u001b[36mdynamic\u001b[39m \u001b[37m[\u001b[39m\u001b[90m00:00:00 000';
        const correct = [
          partial + "\u001b[39m\u001b[37m]\u001b[39m \u001b[97m'a'\u001b[39m",
          partial + "\u001b[39m\u001b[37m]\u001b[39m \u001b[97m'b'\u001b[39m",
          partial + "\u001b[39m\u001b[37m]\u001b[39m \u001b[97m'c'\u001b[39m",
        ];
        expect(outputRecords).to.deep.equal(correct);
      });

      it('shows spinner with %spin_start and stops with %spin_stop', function () {
        const outputRecords: string[] = [];
        const correct = '\u001b[36mdynamic\u001b[39m \u001b[37m[\u001b[39m\u001b[90m00:00:00 000'
          + '\u001b[39m\u001b[37m]\u001b[39m \u001b[97m\'msg\'\u001b[39m';
        sinon.stub(Spinner.prototype, 'start').value((() => {
          function mockStart() {
            outputRecords.push('start');
          }
          return mockStart;
        })());
        sinon.stub(Spinner.prototype, 'stop').value((() => {
          function mockStart() {
            outputRecords.push('stop');
          }
          return mockStart;
        })());
        nodeLogPrinter.print(date, LoggerLevel.info, ['msg', '%spin_start']);
        nodeLogPrinter.print(date, LoggerLevel.info, ['msg', '%spin_stop']);
        expect(outputRecords).to.deep.equal(['start', 'stop']);
        expect(outputRecord).to.equal(correct);
      });

    });

  });

  describe('package', function () {

    describe('NodePackageResolver', function () {

      it('executes the handler when this resolver has found a dynamic package');

      it('uses dynamic.lock to load packages if it exists and yarn/package-lock remains unchanged');

      it('creates dynamic.lock if it does not exist');

      it('updates dynamic.lock if yarn/package-lock has been changed');

      it("updates dynamic.lock if node_modules's stats.mtime has been changed");

    });

  });

});
