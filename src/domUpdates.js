import $ from 'jQuery'

const domUpdates = {

  showWelcomeUserScreen(user, allRooms) {
    $('.user-welcome-message').text(`Welcome ${user.giveFirstName()}`)
    this.displayUserBookings(user)
    this.displayUserTotalSpent(user, allRooms)
  },

  displayUserBookings(user) {
    const bookings = user.bookings.forEach(booking =>  $('.user-bookings-display').append(`${booking.date} `))
    // $('.user-bookings-display').(bookings)
  },

  displayUserTotalSpent(user, rooms) {
    $('.user-total-spent-display').text(`$${user.findTotalSpent(rooms)}`)
  },

  showWelcomeManagerScreen() {
    console.log('welcome manager')
    // change to manager screen
  },

  showManagerDashInfo(hotel) {
    let date = $('.manager-date-input').val();
    date = this.formatDate(date)
    this.updateDateDisplay(date);
    this.displayRoomsAvail(hotel, date);
    this.displayRevenue(hotel, date);
    this.displayOccupancy(hotel, date)
  },

  updateDateDisplay(date) {
    $('.rooms-avail-header').text(`Total Rooms Available on ${date}`)
    $('.revenue-header').text(`Revenue for ${date}`)
    $('.occupancy-header').text(`Occupancy for ${date}`)
  },

  displayRoomsAvail(hotel, date) {
    $('.avail-rooms-display').text(hotel.findAvailableRooms(date).length)
  },

  displayRevenue(hotel, date) {
    $('.revenue-display').text(`$${hotel.findRevenue(date)}`)
  },

  displayOccupancy(hotel, date) {
    $('.occupancy-display').text(`${(hotel.findOccupancy(date) * 100)}%`)
  },

  formatDate(date) {
    return date.split('-').join('/')
  },

  showAvailableRooms(hotel, date) {
    this.clearAvailRoomsDisplay()
    date = this.formatDate(date)
    hotel.findAvailableRooms(date).forEach(room => {
      $('.user-avail-rooms-display').append(`<input type="checkbox" value="${room.number}"><li>${room.number} -${room.roomType}</li>`)
    })
    this.addAvailRoomFilter()
  },

  clearAvailRoomsDisplay() {
    $('.user-avail-rooms-display').text('')
  },

  addAvailRoomFilter() {
    $('.user-avail-rooms-display').prepend('<button class="book-room">Book Room</button>')
    $('.user-avail-rooms-display').append(`
    <label for="filter-rooms">Filter by Room Type</label>
    <select id="filter-rooms">
      <option value="">Please Choose a Room Type</option>
      <option value="single room">Single Room</option>
      <option value="junior suite">Junior Suite</option>
      <option value="suite">Suite</option>
      <option value="residential suite">Residential Suite</option>
      </select>
      <button class="filter-by-room-type">Filter</button>
    `)
  },

  displayRoomsAvailByType(date, type, hotel) {
    this.clearAvailRoomsDisplay()
    date = this.formatDate(date)
    console.log(type)
    console.log(hotel.filterAvailRoomsByType(date, type))
    hotel.filterAvailRoomsByType(date, type).forEach(room => {
      $('.user-avail-rooms-display').append(`
      <input type="checkbox" value="${room.number}"><li>${room.number} -${room.roomType}</li>`)
    })
  }

  // <input type="radio" value="${room.number}">
  


}





















export default domUpdates;