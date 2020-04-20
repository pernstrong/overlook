import User from '../src/User';
const chai = require('chai')
const spies = require('chai-spies');
chai.use(spies)

// import chai from 'chai';
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

  it('should be able to give its first name', function() {
        
    expect(user1.giveFirstName()).to.equal('Billy');
  });

  it('should hold its  bookings', function() {
    const booking1 = {id: 'abc123', userID: 9, date: '2020/02/04', roomNumber: 15, roomServiceCharges: []}
    const booking2 = {id: 'five', userID: 2, date: '2020/02/03', roomNumber: 13, roomServiceCharges: []}

    user1.bookings.push(booking1)
    user1.bookings.push(booking2)

    expect(user1.bookings.length).to.equal(2)
    expect(user1.bookings[1].roomNumber).to.equal(13)
  });

  it('should be able to findits past room bookings', function() {
    const booking1 = {id: 'abc123', userID: 9, date: '2020/02/04', roomNumber: 15, roomServiceCharges: []}
    const booking2 = {id: 'five', userID: 2, date: '2020/05/03', roomNumber: 13, roomServiceCharges: []}

    const today = '2020/04/17'

    user1.bookings.push(booking1)
    user1.bookings.push(booking2)

    expect(user1.findPastBookings(today)).to.deep.equal([{id: 'abc123', userID: 9, date: '2020/02/04', roomNumber: 15, roomServiceCharges: []}])
  });
  
  it('should be able to find its upcoming room bookings', function() {

    const booking1 = {id: 'ten', userID: 9, date: '2020/04/04', roomNumber: 12, roomServiceCharges: []}
    const booking2 = {id: 'eleven', userID: 2, date: '2020/06/03', roomNumber: 10, roomServiceCharges: []}

    const today = '2020/04/17'

    user1.bookings.push(booking1)
    user1.bookings.push(booking2)
    
    expect(user1.findFutureBookings(today)).to.deep.equal([{id: 'eleven', userID: 2, date: '2020/06/03', roomNumber: 10, roomServiceCharges: []}])
  });

  it('should calculate how much the user has spent on rooms', function() {
    const booking1 = {id: 'ten', userID: 1, date: '2020/05/04', roomNumber: 12, roomServiceCharges: []}
    const booking2 = {id: 'eleven', userID: 1, date: '2020/06/03', roomNumber: 10, roomServiceCharges: []}

    const room1 = ({number: 12, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 1, costPerNight: 250})
    const room2 = ({number: 10, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 1, costPerNight: 500})
    const room3 = ({number: 13, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 1, costPerNight: 50})
    const rooms = [room1, room2, room3]

    user1.bookings.push(booking1)
    user1.bookings.push(booking2)
    
    
    expect(user1.findTotalSpent(rooms)).to.equal("750.00")
  });

  it('should call findPastBookings method when findFutureBookings method is called', function() {


    chai.spy.on(user1, 'findPastBookings', () => {})
    user1.findFutureBookings("2020/05/05")
    expect(user1.findPastBookings).to.have.been.called(1)
  })

});