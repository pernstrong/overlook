import User from '../src/User';
// const chai = require('chai')
const spies = require('chai-spies');
chai.use(spies)

import chai from 'chai';
const expect = chai.expect;

describe('User', function() {
  
  let user1;

  this.beforeEach(function () {
   
    user1 = new User({id: 1, name: 'Billy Beans'})
  })
  
  it('should have be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {  
    expect(user1).to.be.an.instanceof(User);
  });

  it('should have an id', function() { 
    expect(user1.id).to.equal(1);
  });

  it('should have a name', function() {
        
    expect(user1.name).to.equal('Billy Beans');
  });

  it('should hold its past room bookings', function() {
    const booking1 = {id: 'abc123', userID: 9, date: '2020/02/04', roomNumber: 15, roomServiceCharges: []}
    const booking2 = {id: 'five', userID: 2, date: '2020/02/03', roomNumber: 13, roomServiceCharges: []}

    user1.pastBookings.push(booking1)
    user1.pastBookings.push(booking2)

    expect(user1.pastBookings.length).to.equal(2)
    expect(user1.pastBookings[1].roomNumber).to.equal(13)
  });
  
  it('should hold its upcoming room bookings', function() {

    const booking1 = {id: 'ten', userID: 9, date: '2020/05/04', roomNumber: 12, roomServiceCharges: []}
    const booking2 = {id: 'eleven', userID: 2, date: '2020/06/03', roomNumber: 10, roomServiceCharges: []}

    user1.upcomingBookings.push(booking1)
    user1.upcomingBookings.push(booking2)
    
    expect(user1.upcomingBookings.length).to.equal(2)
    expect(user1.upcomingBookings[0].id).to.equal('ten')
  });
  
  it.skip('should be able to book a room', function() {

    expect(user1.).to.equal()
  });

  it.skip('should calculate how much the user has spent on rooms', function() {

    expect(user1.).to.equal()
  });

  it.skip('should calculate how much the user has spent on rooms', function() {

    expect(user1.pastBookings).to.deep.equal()
  });




});