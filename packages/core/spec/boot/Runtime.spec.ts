import { expect, use } from 'chai';
import Runtime from '../../src/boot/Runtime';

describe('Runtime', function () {

  describe('start()', function () {

    it('Creates a SystemPlugin instance', function () {
      const runtime = new Runtime({ });
      runtime.start();
      expect(runtime).to.equal(runtime);
    });

  });

});
