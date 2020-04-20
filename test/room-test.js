import Room from '../src/Room';
// const spies = require('chai-spies');
// chai.use(spies)
import chai from 'chai';
const expect = chai.expect;

describe('Room', function() {
  
  let room1;

  this.beforeEach(function () {
   
    room1 = new Room({number: 12, roomType: 'suite', bidet: true, bedSize: 'king', numBeds: 1, costPerNight: 500})
  });

  it('should be a function', function() {

    expect(Room).to.be.a('function');
  });

  it('should be an instance of Room', function() {
        
    expect(room1).to.be.an.instanceof(Room);
  });

  it('should have an number', function() {
        
    expect(room1.number).to.equal(12);
  });

  it('should have a room type', function() {
        
    expect(room1.roomType).to.equal('suite');
  });

  it('should know if it has a bidet or not', function() {
        
    expect(room1.bidet).to.equal(true);
  });

  it('should know what size bed it has', function() {
        
    expect(room1.bedSize).to.equal('king');
  });

  it('should how many beds it has', function() {
        
    expect(room1.numBeds).to.equal(1);
  });

  it('should know its cost per night', function() {
        
    expect(room1.costPerNight).to.equal(500);
  });

  it('should know what days its booked', function() {
    let booking1 = {id: "abc123", userID: 1, date: "2020/4/15", roomNumber: 2, roomServiceCharges: []}
    let booking2 = {id: "abc1234", userID: 2, date: "2020/4/17", roomNumber: 2, roomServiceCharges: []}

    room1.bookings.push(booking1)
    room1.bookings.push(booking2)

    expect(room1.bookings).to.deep.equal([{id: "abc123", userID: 1, date: "2020/4/15", roomNumber: 2, roomServiceCharges: []}, {id: "abc1234", userID: 2, date: "2020/4/17", roomNumber: 2, roomServiceCharges: []}]);
  });

  it('should be able to check if it is booked given a date and return true if it is booked', function() {
    let booking1 = {id: "abc123", userID: 1, date: "2020/05/05", roomNumber: 2, roomServiceCharges: []}

    room1.bookings.push(booking1)
    
    expect(room1.checkIfBooked('2020/05/05')).to.equal(true);
  });

  it('should be able to check if it is booked given a date and return false if it is not booked', function() {
    let booking1 = {id: "abc123", userID: 1, date: "2020/05/05", roomNumber: 2, roomServiceCharges: []}

    room1.bookings.push(booking1) 

    expect(room1.checkIfBooked('2020/05/06')).to.equal(false);
  });

  it('should be able to add a booking', function() {
    let booking1 = {id: "abc123", userID: 1, date: "2020/05/05", roomNumber: 2, roomServiceCharges: []}

    expect(room1.checkIfBooked('2020/05/05')).to.equal(false);

    room1.book(booking1)

    expect(room1.checkIfBooked('2020/05/05')).to.equal(true);
  });

  it('should be able to remove a booking', function() {
    let booking1 = {id: "abc123", userID: 1, date: "2020/05/05", roomNumber: 2, roomServiceCharges: []}
    room1.book(booking1)
    expect(room1.checkIfBooked('2020/05/05')).to.equal(true);
    room1.unBook("abc123")
    expect(room1.checkIfBooked('2020/05/05')).to.equal(false);
  });
})