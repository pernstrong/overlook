class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.bookings = []
    this.totalSpent = 0;
    // past/present would be tough b/c need todays date...
    // this.pastBookings = [];
    // this.upcomingBookings = [];
  }

  findTotalSpent(rooms) {
    return this.bookings.reduce((total, booking) => {
      rooms.forEach(room => {
        if (room.number === booking.roomNumber) {
          total += room.costPerNight;
        }
      })
      return total
    }, 0)
  }

  findPastBookings(date) {
    const todayDateArray = date.split('/')
   return this.bookings.filter(booking => {
      const bookingDateArray = booking.date.split('/')
      if (Number(todayDateArray[0]) > Number(bookingDateArray[0])) {
        return booking
      } else if (Number(todayDateArray[0]) === Number(bookingDateArray[0]) && Number(todayDateArray[1]) > Number(bookingDateArray[1])) {
        return booking
      } else if (Number(todayDateArray[0]) === Number(bookingDateArray[0]) && Number(todayDateArray[1]) === Number(bookingDateArray[1]) && Number(todayDateArray[2]) > Number(bookingDateArray[2])) {
        return booking
      }
    })
  }

  findFutureBookings(date) {
    const pastBookings = this.findPastBookings(date)
    return this.bookings.filter(booking => {
      if (!pastBookings.includes(booking)) {
        return booking
      }
    })
  }

  giveFirstName() {
    return this.name.split(' ')[0]
  }
}








export default User;