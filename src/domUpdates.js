import $ from 'jQuery'

const domUpdates = {

  displayUserBookingsHandler(user, today) {
    let pastFunction = user.findPastBookings(today)
    let futureFunction = user.findFutureBookings(today)
    let pastDisplay = '.user-past-bookings-display'
    let futureDisplay = '.user-upcoming-bookings-display'
    this.formatAndDisplayBookings(pastFunction, pastDisplay) 
    this.formatAndDisplayBookings(futureFunction, futureDisplay)
  },

  formatAndDisplayBookings(pastOrPresentMethod, pastOrPresentDisplay) {
    const formattedBookings = pastOrPresentMethod.reduce((formatteds, booking) => {
      const betterDate = this.formatDateForDisplay(booking.date)
      formatteds.push(betterDate)
      return formatteds
    }, [])
    formattedBookings.forEach(booking =>  $(`${pastOrPresentDisplay}`).append(`
    <li>
    ${booking} 
    </li>
    `))
  },

  formatDateForDisplay(date) {
    date = date.split('/')
    const year = date.shift()
    date.push(year)
    return date.join('-')
  },

  displayUserTotalSpent(user, rooms) {
    $('.user-total-spent-display').text(`$${user.findTotalSpent(rooms)}`)
  },

  showManagerScreen() {
    ('welcome manager')
    this.hideAllSections();
    $('.manager-screen').removeClass('hide')

  },

  showUserScreen(user, allRooms, today) {
    $('.user-dash-nav-section').removeClass('hide')
    $('.user-welcome-message').text(`Welcome ${user.giveFirstName()}`)
    this.hideAllSections();
    // $('.user-screen').removeClass('hide')
    $('.user-dashboard').removeClass('hide')
    this.displayUserBookingsHandler(user, today);
    this.displayUserTotalSpent(user, allRooms)
  },

  switchToDash() {
    $('.user-dashboard').removeClass('hide')
    $('.user-book-section').addClass('hide')
  },

  switchToBook() {
    $('.user-dashboard').addClass('hide')
    $('.user-book-section').removeClass('hide')
  },

  hideAllSections() {
    $('.login-section').addClass('hide')
    $('.manager-screen').addClass('hide')
    // $('.user-screen').addClass('hide')
    $('.hotel-image-section').addClass('hide')

  },

  showManagerDashInfo(hotel, today) {
    let date = $('.manager-date-input').val();
    $('.manager-dash-nav-section').removeClass('hide')
    date = this.formatDate(date)
    this.displayRoomsAvail(hotel, date);
    this.displayRevenue(hotel, date);
    this.displayOccupancy(hotel, date)

  },

  changeHeader() {
    $('.login-h1').addClass('hide')
    $('.dash-h1').removeClass('hide')
    $('header').css('text-align', 'left')
  },

  updateStatsMessageDate() {
    let date = $('.manager-date-input').val();
    $('.stats-for-day').text(`Stats for ${this.formatDateForDisplay(date)}`)
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

  // showAvailableRooms(hotel, date) {
  //   this.clearAvailRoomsDisplay()
  //   date = this.formatDate(date)
  //   hotel.findAvailableRooms(date).forEach(room => {
  //     $('.user-avail-rooms-display').append(`
  //     <section class="avail-room-listing">
  //     <input type="checkbox" value="${room.number}"><li>Room #${room.number} - ${room.roomType}</li>
  //     </section>
  //     `)
  //   })
  //   this.addAvailRoomFilter()
  // },

getGeneralRoomInfoToDisplay(roomType) {
  let roomObj;
  if (roomType === "residential suite") {
 roomObj = {
      image: "./images/ressuite2.png",
      name: "Residential Suite",
      view: "Mountain",
      hasHotTub: "Yes",
    }
  } else if (roomType === "single room") {
 roomObj = {
      image: "./images/singleroom2.png",
      name: "Single Room",
      view: "Creek",
      hasHotTub: "No",
    }
  } else if (roomType === "suite") {
 roomObj = {
      image: "./images/suite2.png",
      name: "Suite",
      view: "Creek",
      hasHotTub: "Yes",
    }
  } else if (roomType === "junior suite") {
 roomObj = {
      image: "./images/jrsuite2.png",
      name: "Junior Suite",
      view: "Mountain",
      hasHotTub: "Yes",
    }
  }
  return roomObj
},

// returns yes or no instead of t/f for bidet
bidetYes(room) {
  if (room.bidet === true) {
    return "Yes"
  } else {
    return "No"
  }
},

  showAvailableRooms(hotel, date) {
    this.clearAvailRoomsDisplay()
    date = this.formatDate(date)
    console.log(hotel.findAvailableRooms(date))
    hotel.findAvailableRooms(date).forEach(room => {
      const roomInfo = this.getGeneralRoomInfoToDisplay(room.roomType)
      console.log(room.number)
      $('.user-avail-rooms-display').append(`
      <section class="available-room-listing" data-roomNum=${room.number}
      data-date=${date}>
      <section class="listing-pic-residential-suite"><img src=${roomInfo.image}></section>
      <section class="listing-overview">
      <h3>Type: ${roomInfo.name}</h3>
      <h4>Room #${room.number}</h4>
      <h4>$${room.costPerNight}/night</h4>
    </section>
    <section class="listing-amenities">
      <h4>Amenities</h4>
      <ul>
        <li>View: ${roomInfo.view}</li>
        <li>Bidet: ${this.bidetYes(room)}</li>
        <li>Hot Tub: ${roomInfo.hasHotTub}</li>
        <li>Pet Friendly: Yes</li>
      </ul>
    </section>
    <section class="listing-book${room.number}">
      <button class="book-now-button"  value="${room.costPerNight}">Book Now</button>
    </section>
    <section class="booking-confirmation${room.number} hide">
    <h3>Please Confirm Details</h3>
    <h4>Date ${date}</h4>
    <h4>Cost $${room.costPerNight} + tax</h4>
    <button class="confirm-booking-button" value="${room.number}">Confirm Booking</button>
    <button class="cancel-booking-button" value="${room.number}">Cancel</button>
    </section>
  </section>
      `)
    })
    this.addAvailRoomFilter()
  },

    toggleBookAndConfirmation(roomNum) {
      console.log('here')
      $(`.booking-confirmation${roomNum}`).toggleClass('hide')
      $(`.listing-book${roomNum}`).toggleClass('hide')

    },

    clearBookingData() {
      $('.user-book-input').val('')
      $('.user-avail-rooms-display').html(' ')
      // $('.user-book-form').html('')
    },





  displayPastDateMessage() {
    $('.user-avail-rooms-display').text('Please select a valid date')
    $('.manager-avail-rooms-display').text('Please select a valid date')
  },

  showAvailableRoomsMngr(hotel, date) {
    this.clearAvailRoomsDisplay()
    date = this.formatDate(date)
    console.log(date)
    hotel.findAvailableRooms(date).forEach(room => {
      $('.manager-avail-rooms-display').append(`
      <section class="avail-room-listing">
      <input type="checkbox" value="${room.number}"><li>Room #${room.number} - ${room.roomType}</li>
      </section>
      `)
    })
    $('.manager-avail-rooms-display').prepend(`<button class="book-room-for-guest">Book for Guest</butotn>`)
  },


  
  clearAvailRoomsDisplay() {
    $('.user-avail-rooms-display').text('')
    $('.manager-avail-rooms-display').text('')
    $('.filter-rooms-section').addClass('hide')
  },

  addAvailRoomFilter() {
    // $('.user-book-form').prepend('<button class="book-room">Book Room</button>')
    $('.filter-rooms-section').removeClass('hide')

    $('.filter-rooms-section').html(`
    <label for="filter-rooms">Filter by Room Type</label>
    <select id="filter-rooms">
      <option value=""> Choose a Room Type</option>
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
  },

  displayThankYou(date) {
    this.clearBookingData()
    $('.user-book-section').addClass('hide')
    $('.thank-you-display-area').html(`
    <section class="thank-you-section">
    <h2>Thank you for booking your stay with us!</h2>
    <h3>We look forward to your arrival on ${date}.</h3>
  <h3> If you have any questions or if there is anything else we can help with, please give us a call at (555) 555-5555.</h3>
    <button class="return-to-dashboard">Return to Dashboard</button>
    <button class="book-again">Book Another Reservation</button>
    </section>
    `)
  },

  displayManagerGuestSearchResults(manager, input, allRooms) {
    this.clearGuestSearchResultsSection()
    const results = manager.searchGuests(input)
    results.forEach(user => {
      $('.user-search-results').append(`
      <section class="user-search-listing">
      <button class="show-guest-details" value=${user.id}>Guest Details</button>
      <li>${user.name}</li>
      <section>
      `)
    })
    console.log(results)
  },

  clearGuestSearchResultsSection() {
    $('.user-search-results').text('')
  },

  showGuestDetails(guest, allRooms, today) {
    this.clearGuestSearchResultsSection()
    $('.user-search-results').html(`
    <h2>Guest: ${guest.name}</h2>
    <button class="book-for-guest" value=${guest.id}>Book Room</button>
    <h4>Upcoming Bookings:</h4>
    <ul class="upcoming-bookings"></ul>
    <h4>Past Bookings:</h4> 
    <ul class="past-bookings"></ul>
    <h4>Total Spent: $${guest.findTotalSpent(allRooms)}</h4>
    `)
    this.displayUpcomingBookings(guest, today)
    this.displayPastBookings(guest, today)
  },

  displayPastBookings(guest, today) {
    const pastBookings = guest.findPastBookings(today).sort((a, b) => a.date - b.date)
    pastBookings.forEach(booking => {
      $('.past-bookings').append(`<li>${booking.date}</li>`)
    })
  },

  displayUpcomingBookings(guest, today) {
    const futureBookings = guest.findFutureBookings(today).sort((a, b) => a.date - b.date)
    futureBookings.forEach(booking => {
      $('.upcoming-bookings').append(`
      <li>${booking.date}</li>
      <button class="delete-booking" value="${booking.id}">Delete Booking</button>
      `)
    })
  },
  
  displayBookForGuestScreen(guest) {
    $('.user-search-results').html(`
      <section class="manager-book-form">
      <label>Please Select a Date</label> 
      <input type="date" class="manager-book-input">
      <button class="manager-book-button">Available Rooms</button>
      <section class="manager-avail-rooms-display"></<section>
      </section>
      `)
  },

  signOut() {
    location.reload()
  },
  
  returnToUserDash() {
    $('.thank-you-section').remove()
    $('.user-dashboard').removeClass('hide')
    $('.user-screen').removeClass('hide')
  },
  
  returnToBook() {
    $('.thank-you-section').remove()
    $('.user-book-section').removeClass('hide')
    $('.user-screen').removeClass('hide')
  },
  // $('.user-dashboard').removeClass('hide')
  // $('.user-book-section').addClass('hide')
}


export default domUpdates;