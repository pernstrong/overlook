import Booking from '../src/Booking';
const chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies)
import chai from 'chai';
const expect = chai.expect;



describe('See if the tests are running', function() {
  
    let booking1;

  this.beforeEach(function () {
   
    booking1 = new Booking("abc123", 1, "2020/4/15", 2, [])

  })
  
    it.skip('should have be a function', function() {

    expect(booking1).to.be.a('function');
  });

  it.skip('should be an instance of Booking', function() {
        
    expect(booking1).to.be.an.instanceof(Booking);
  });

  it.skip('should have an id', function() {
        
    expect(booking1.id).to.equal("abc123");
  });
 
  it.skip('should have a user id', function() {
        
    expect(booking1.userID).to.equal(1);
  });

  it.skip('should have a date', function() {
        
    expect(booking1.id).to.equal("2020/4/15");
  });

  it.skip('should have an room number', function() {
        
    expect(booking1.roomNumber).to.equal(2);
  });

  it.skip('should have not have a room service charge by default', function() {
        
    expect(booking1.id).to.deep.equal([]);
  });

})