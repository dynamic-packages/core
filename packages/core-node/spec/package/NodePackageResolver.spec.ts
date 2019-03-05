import { expect, use } from 'chai';
import { NodePackageResolver } from '../../src';

describe('core-common/NodePackageResolver', function () {

  describe('.onResolve(handler: (pkg: IDynamicPackage) => void)', function () {

    it('executes the handler when this resolver has found a dynamic package');

  });

  describe('.resolve()', function () {

    it('uses dynamic.lock to load packages if it exists and yarn/package-lock remains unchanged');

    it('creates dynamic.lock if it does not exist');

    it('updates dynamic.lock if yarn/package-lock has been changed');

    it("updates dynamic.lock if node_modules's stats.mtime has been changed");

  });

});
