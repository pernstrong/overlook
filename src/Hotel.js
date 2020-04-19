class Hotel {
  constructor(allRooms, allGuests, allBookings) {
    this.allRooms = allRooms;
    this.allGuests = allGuests;
    this.allBookings = allBookings;
  }

  findOccupancy(date) {
    const bookingsOnDate = this.allBookings.filter(booking => booking.date === date)
    return (bookingsOnDate.length / this.allRooms.length).toFixed(2)
  }

  findAvailableRooms(date) {
    const bookedRooms = this.allBookings.reduce((unavailRooms, booking) => {
      this.allRooms.forEach(room => {
        if (booking.date === date && room.number === booking.roomNumber) {
          unavailRooms.push(room)
        }
      })
      return unavailRooms
    }, []) 
    return this.allRooms.reduce((availRooms, room) => {
      if (!bookedRooms.includes(room)) {
        availRooms.push(room)
      }
      return availRooms
    }, [])
  }

  findRevenue(date) {
    const total = this.allBookings.reduce((revenue, booking) => {
      this.allRooms.forEach(room => {
        if (room.number === booking.roomNumber && booking.date === date) {
          revenue += room.costPerNight;
        }
      })
      return revenue
    }, 0)
    return total.toFixed(2)
  }

  filterAvailRoomsByType(date, type) {
    const availRooms = this.findAvailableRooms(date);
    return availRooms.filter(room => room.roomType === type)
  }

  addBooking(user, roomNumber, date) {
    // let room = this.allRooms.find(room => roomNumber === room.number)
    const booking = {
      id: Date.now().toString(),
      userID: user.id,
      date: date,
      roomNumber: roomNumber,
      roomServiceCharges: []
    }
    this.allBookings.push(booking)
  }
}


export default Hotel;