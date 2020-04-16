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

  giveFirstName() {
    return this.name.split(' ')[0]
  }
}








export default User;