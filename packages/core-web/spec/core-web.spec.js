define(['dist/amd/index.min'], function (module) {

  afterEach(function () {
    sinon.restore();
  });

  describe('@dynamics/core-web', function () {

    describe('logger', function () {

      describe('printer', function () {

        var webLogPrinter = module.webLogPrinter;
        var date = new Date('1970-01-01T00:00:00');
        var outputRecord = '';

        function Sample() { }
        Sample.prototype.toString = function () {
          return '<Sample>';
        };

        beforeEach(function () {
          sinon.stub(console, 'info').value((function () {
            var mockLog = function (output) {
              outputRecord = output;
            };
            return mockLog;
          })());
        });

        afterEach(function () {
          outputRecord = '';
        });

        it('formats logs with %format argument', function () {
          webLogPrinter.print(
            date, 2,
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
              '%format'
            ]
          );
          var correct = '%c dynamic [00:00:00 000] msg {a:1}'
            + ' abc  true 123 <Sample> null  <Function>x()';
          expect(outputRecord).to.equal(correct);
        });

        it('shows next-line with %nl argument', function () {
          webLogPrinter.print(date, 2, ['%nl']);
          expect(outputRecord).to.equal('%c \n');
        });

        it('updates logs with %update argument', function () {
          var outputRecords = [];
          webLogPrinter.print(date, 2, ['a', '%update']);
          outputRecords.push(outputRecord);
          webLogPrinter.print(date, 2, ['b', '%update']);
          outputRecords.push(outputRecord);
          webLogPrinter.print(date, 2, ['c', '%update']);
          outputRecords.push(outputRecord);
          var correct = [
            "%c dynamic [00:00:00 000] 'a'",
            "%c dynamic [00:00:00 000] 'b'",
            "%c dynamic [00:00:00 000] 'c'"
          ];
          expect(outputRecords).to.deep.equal(correct);
        });

        it('shows spinner with %spin_start and stops with %spin_stop', function () {
          var outputRecords = [];
          var correct = [
            "%c dynamic [00:00:00 000] 'msg'",
            "%c dynamic [00:00:00 000] 'msg'"
          ];
          webLogPrinter.print(date, 2, ['msg', '%spin_start']);
          outputRecords.push(outputRecord);
          webLogPrinter.print(date, 2, ['msg', '%spin_stop']);
          outputRecords.push(outputRecord);
          expect(outputRecords).to.deep.equal(correct);
        });

      });

    });

  });

});
