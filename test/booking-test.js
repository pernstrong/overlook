import Booking from '../src/Booking';
// const spies = require('chai-spies');
// chai.use(spies)
import chai from 'chai';
const expect = chai.expect;



describe('Booking', function() {
  
  let booking1;

  this.beforeEach(function () {
   
    booking1 = new Booking({id: "abc123", userID: 1, date: "2020/4/15", roomNumber: 2, roomServiceCharges: []})
  })
  
  it('should have be a function', function() {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of Booking', function() {  
    expect(booking1).to.be.an.instanceof(Booking);
  });

  it('should have an id', function() { 
    expect(booking1.id).to.equal("abc123");
  });
 
  it('should have a user id', function() {
        
    expect(booking1.userID).to.equal(1);
  });

  it('should have a date', function() {
        
    expect(booking1.date).to.equal("2020/4/15");
  });

  it('should have an room number', function() {
        
    expect(booking1.roomNumber).to.equal(2);
  });

  it('should have not have a room service charge by default', function() {
        
    expect(booking1.roomServiceCharges).to.deep.equal([]);
  });

})