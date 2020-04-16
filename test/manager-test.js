import Manager from '../src/Manager';
const spies = require('chai-spies');
chai.use(spies)
import chai from 'chai';
const expect = chai.expect;



describe('Manager', function() {
    it('should return true', function() {
      expect(true).to.equal(true);
    });
  });