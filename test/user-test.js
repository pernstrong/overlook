import User from '../src/User';
const chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies)

import chai from 'chai';
const expect = chai.expect;

describe('See if the tests are running', function() {
  
    let user1;

  this.beforeEach(function () {
   
    user1 = new User(1, 'Billy Beans')

  })
  
  
    it('should have be a function', function() {

    expect(User).to.be.a('function');
  });

  it.skip('should be an instance of User', function() {
        
    expect(user1).to.be.an.instanceof(User);
  });

  it.skip('should have an id', function() {
        
    expect(user1.id).to.equal(1);
  });

  it.skip('should have a name', function() {
        
    expect(user1.name).to.equal('Billy Beans');
  });

  it.skip('should hold its past room bookings', function() {

    expect(user1.pastBookings).to.deep.equal()
  });
  
  it.skip('should hold its upcoming room bookings', function() {

    expect(user1.upcomingBookings).to.deep.equal()
  });

  it.skip('should calculate how much the user has spent on rooms', function() {

    expect(user1.).to.equal()
  });

  it.skip('should calculate how much the user has spent on rooms', function() {

    expect(user1.pastBookings).to.deep.equal()
  });









});