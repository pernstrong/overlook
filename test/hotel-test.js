import Hotel from '../src/Hotel';
const chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies)
import chai from 'chai';
const expect = chai.expect;



describe('See if the tests are running', function() {
    it('should return true', function() {
      expect(true).to.equal(true);
    });
  });