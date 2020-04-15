import Room from '../src/Room';
const chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies)
import chai from 'chai';
const expect = chai.expect;

describe('See if the tests are running', function() {
  
    let room1;

  this.beforeEach(function () {
   
    room1 = new Room(12, 'suite', true, 'king', 1, $500)

  })
  
  
    it.skip('should have be a function', function() {

    expect(Room).to.be.a('function');
  });

  it.skip('should be an instance of Room', function() {
        
    expect(room1).to.be.an.instanceof(Room);
  });

  it.skip('should have an number', function() {
        
    expect(room1.number).to.equal(12);
  });

  it.skip('should have a room type', function() {
        
    expect(room1.roomType).to.equal('suite');
  });

  it.skip('should know if it has a bidet or not', function() {
        
    expect(room1.bidet).to.equal(true);
  });

  it.skip('should know what size bed it has', function() {
        
    expect(room1.bedSize).to.equal('queen');
  });

  it.skip('should how many beds it has', function() {
        
    expect(room1.numBeds).to.equal(1);
  });

  it.skip('should know its cost per night', function() {
        
    expect(room1.costPerNight).to.equal($500);
  });

  it.skip('should know what days its booked', function() {
        
    expect(room1.datesBooked).to.deep.equal([]);
  });

  it.skip('should be able to check if it is booked given a date', function() {
    // let date = 
    expect(room.isBooked(date)).to.equal(true);
  });

  it.skip('should be able to add a booking', function() {
    // let date = 
    expect(room.isBooked(date)).to.equal(false);
    room1.bookRoom(date)
    expect(room.isBooked(date)).to.equal(true);
  });

  it.skip('should be able to remove a booking', function() {
    // let date = 
    expect(room.isBooked(date)).to.equal(true);
    room1.bookRoom(date)
    expect(room.isBooked(date)).to.equal(false);
  });
})