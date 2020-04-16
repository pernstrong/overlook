class Room {
  constructor(roomData) {
    this.number = roomData.number;
    this.roomType = roomData.roomType;
    this.bidet = roomData.bidet;
    this.bedSize = roomData.bedSize;
    this.numBeds = roomData.numBeds;
    this.costPerNight = roomData.costPerNight
    this.bookings = []
  }

  checkIfBooked(date) {
    let isBooked = false;
    this.bookings.forEach(booking => {
      if (booking.date === date) {
        isBooked = true;
      }
    })
    return isBooked;
  }

  book(booking) {
    this.bookings.push(booking)
  }

  unBook(id) {
    let index = this.bookings.findIndex(booking => booking.id === id)
    this.bookings.splice(index, 1)
  }
  
}




export default Room;