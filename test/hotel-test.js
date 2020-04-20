import Hotel from '../src/Hotel';
const chai = require('chai')
const spies = require('chai-spies');
chai.use(spies)
// import chai from 'chai';
const expect = chai.expect;

describe('Hotel', function() {
  
  let hotel1;
  let rooms;
  let guests;
  let bookings;

  this.beforeEach(function () {

    rooms = [{number: 12, roomType: 'suite', bidet: false, bedSize: 'queen', numBeds: 1, costPerNight: 500}, {number: 22, roomType: 'penthouse', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 5000}]

    guests = [{id: 1, name: 'Billy Beans'}, {id: 2, name: 'Kentucky Robertson'}, {id: 3, name: 'Clete'}]

    bookings = [{id: "abc123", userID: 1, date: "2020/04/15", roomNumber: 12, roomServiceCharges: []}, {id: "abc1234", userID: 1, date: "2020/07/15", roomNumber: 2, roomServiceCharges: []}]
  
    hotel1 = new Hotel(rooms, guests, bookings)
  });

  it('should be a function', function() {

    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Room', function() {
      
    expect(hotel1).to.be.an.instanceof(Hotel);
  });

  it('should have a rooms', function() {
      
    expect(hotel1.allRooms.length).to.equal(2);
    expect(hotel1.allRooms[1].costPerNight).to.equal(5000);
  });

  it('should know all of its guests', function() {
      
    expect(hotel1.allGuests.length).to.equal(3);
    expect(hotel1.allGuests[1].name).to.equal('Kentucky Robertson');
  });

  it('should know all of its bookings', function() {
      
    expect(hotel1.allBookings.length).to.equal(2);
    expect(hotel1.allBookings[1].id).to.equal("abc1234");
  });

  it('should be able to find its occupancy for a given date', function() {
  
    expect(hotel1.findOccupancy('2020/04/15')).to.equal("0.50");
  });

  it('should be able to find available rooms for a given date', function() {
  
    expect(hotel1.findAvailableRooms('2020/04/15').length).to.equal(1);
    expect(hotel1.findAvailableRooms('2020/04/15')).to.deep.equal([{number: 22, roomType: 'penthouse', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 5000}]);
  });

  it('should be able to find its total reven for a given date', function() {
    rooms = [{number: 12, roomType: 'suite', bidet: false, bedSize: 'queen', numBeds: 1, costPerNight: 500}, {number: 22, roomType: 'penthouse', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 100}, {number: 10, roomType: 'penthouse', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 300}, {number: 42, roomType: 'penthouse', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 500}]

    guests = [{id: 1, name: 'Billy Beans'}, {id: 2, name: 'Kentucky Robertson'}, {id: 3, name: 'Clete'}]

    bookings = [{id: "abc123", userID: 1, date: "2020/04/15", roomNumber: 12, roomServiceCharges: []}, {id: "abc1234", userID: 1, date: "2020/07/15", roomNumber: 42, roomServiceCharges: []}, {id: "abc12345", userID: 3, date: "2020/07/15", roomNumber: 10, roomServiceCharges: []}, {id: "abc123456", userID: 4, date: "2020/07/15", roomNumber: 22, roomServiceCharges: []}]
  
    const hotel2 = new Hotel(rooms, guests, bookings)


    expect(hotel2.findRevenue('2020/07/15')).to.equal("900.00");
  });

  it('should be able to filter its avail rooms by room type', function() {
 
 
    expect(hotel1.filterAvailRoomsByType('2020/06/15', 'suite')).to.deep.equal([{number: 12, roomType: 'suite', bidet: false, bedSize: 'queen', numBeds: 1, costPerNight: 500}]);
    expect(hotel1.filterAvailRoomsByType('2020/06/15', 'penthouse')).to.deep.equal([{number: 22, roomType: 'penthouse', bidet: true, bedSize: 'king', numBeds: 2, costPerNight: 5000}]);
  })

  it('should be able to add a booking', function() {
    expect(hotel1.allBookings.length).to.equal(2)

    hotel1.addBooking({id: 1, name: 'Billy Beans'}, 12, "2020/06/07")
  
    expect(hotel1.allBookings.length).to.equal(3)
    expect(hotel1.allBookings[2].date).to.equal("2020/06/07")
    expect(hotel1.allBookings[2].userID).to.equal(1)
  })

  it('should call findAvailableRooms method when filterAvailRoomsByType is called', function() {

    chai.spy.on(hotel1, 'findAvailableRooms', () => [])
    hotel1.filterAvailRoomsByType('2020/06/15', 'penthouse')
    expect(hotel1.findAvailableRooms).to.have.been.called(1)

  })


});