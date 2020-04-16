import domUpdates from '../src/domUpdates';
const spies = require('chai-spies');
chai.use(spies)
import chai from 'chai';
const expect = chai.expect;



describe('domUpdates', function() {
    it('should return true', function() {
      expect(true).to.equal(true);
    });
  });