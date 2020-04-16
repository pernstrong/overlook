import $ from 'jQuery'

const domUpdates = {

  showWelcomeUserScreen() {
    // change to user screen, include welcome name
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
  }
}





















export default domUpdates;