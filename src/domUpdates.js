import $ from 'jQuery'
import datepicker from 'js-datepicker'

const domUpdates = {

  // handler function
  displayUserBookingsHandler(user, today) {
    let pastFunction = user.findPastBookings(today)
    let futureFunction = user.findFutureBookings(today)
    let pastDisplay = '.user-past-bookings-display'
    let futureDisplay = '.user-upcoming-bookings-display'
    this.hideNoUpcomingResosMessage(futureFunction)
    this.formatAndDisplayBookings(pastFunction, pastDisplay) 
    this.formatAndDisplayBookings(futureFunction, futureDisplay)
  },

  // display bookings for customers
  formatAndDisplayBookings(pastOrPresentMethod, pastOrPresentDisplay) {
    const formattedBookings = pastOrPresentMethod.reduce((formatteds, booking) => {
      const betterDate = this.formatDateForDisplay(booking.date)
      const roomNum = booking.roomNumber
      const bookingObj = {
        date: betterDate,
        number: roomNum
      }
      formatteds.push(bookingObj)
      return formatteds
    }, [])
    formattedBookings.forEach(booking =>  {
      $(`${pastOrPresentDisplay}`).append(`
    <li class="user-bookings-listings"><p class="list-date">Date of stay: ${booking.date}</p> <p class="list-number"> Room # ${booking.number}</p></li>
    `)
    })
  },

  // removes message if no upcoming resos
  hideNoUpcomingResosMessage(futureFunction) {
    if (futureFunction.length > 0) {
      $('.no-upcoming-message').addClass('hide')
    }
  },

  // show how much a user has spent
  displayUserTotalSpent(user, rooms) {
    $('.user-total-spent-display').text(`$${user.findTotalSpent(rooms)}`)
  },

  // show manager screen on login
  showManagerScreen() {
    this.hideAllSections();
    $('.manager-screen').removeClass('hide')

  },

  // show user screen on login
  showUserScreen(user, allRooms, today) {
    $('.user-dash-nav-section').removeClass('hide')
    $('.user-welcome-message').text(`Welcome ${user.giveFirstName()}`)
    this.hideAllSections();
    $('.user-screen').removeClass('hide')
    $('.user-dash-to-hide').removeClass('hide')
    this.displayUserBookingsHandler(user, today);
    this.displayUserTotalSpent(user, allRooms)
  },

  // user show dash section
  switchToDash() {
    $('.user-dash-to-hide').removeClass('hide')
    $('.user-book-section').addClass('hide')
  },

  // user show book section
  switchToBook() {
    $('.user-dash-to-hide').addClass('hide')
    $('.user-book-section').removeClass('hide')
  },

  // hides all 3 major screens
  hideAllSections() {
    $('.login-section').addClass('hide')
    $('.manager-screen').addClass('hide')
    // $('.user-screen').addClass('hide')
    $('.hotel-image-section').addClass('hide')

  },

  // changes screen to manager dash
  showManagerDashInfo(hotel, date) {
    // let date = $('.manager-date-input').val();
    $('.manager-dash-nav-section').removeClass('hide')
    date = this.formatDate(date)
    this.displayRoomsAvail(hotel, date);
    this.displayRevenue(hotel, date);
    this.displayOccupancy(hotel, date)

  },

  // change header in nav bar
  changeHeader() {
    $('.login-h1').addClass('hide')
    $('.dash-h1').removeClass('hide')
    $('header').css('text-align', 'left')
  },

  // next 4 are for displays on manager dashboard
  updateStatsMessageDate(date) {
    // let date = $('.manager-date-input').val();
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

   // format display date
   formatDateForDisplay(date) {
    date = date.split('/')
    const year = date.shift()
    date.push(year)
    return date.join('-')
  },

  // format date to search
  formatDate(date) {
    return date.split('-').join('/')
  },

  // creates ammenties and picture object for different room types
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

  // show available rooms
  showAvailableRooms(hotel, date, duty, type) {
    let rooms;
    // date = this.formatDate(date)
    if (duty === 'findAll') {
      rooms = hotel.findAvailableRooms(date)
    } else if (duty === 'filter') {
      rooms = hotel.filterAvailRoomsByType(date, type)
    }
    this.clearAvailRoomsDisplay()
    rooms.forEach(room => {
      const roomInfo = this.getGeneralRoomInfoToDisplay(room.roomType)
      $('.user-avail-rooms-display').append(`
      <section class="available-room-listing" data-roomNum=${room.number}
      data-date=${date}>
      <section class="listing-pic"><img src=${roomInfo.image}></section>
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
    <section class="listing-book listing-book${room.number}">
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

  // toggle confirmation and listing screens (cancel button)
  toggleBookAndConfirmation(roomNum) {
    $(`.booking-confirmation${roomNum}`).toggleClass('hide')
    $(`.listing-book${roomNum}`).toggleClass('hide')

  },

  // clear booking data
  clearBookingData() {
    $('.user-book-input').val('')
    $('.user-avail-rooms-display').html(' ')
    // $('.user-book-form').html('')
  },

  // error message if date selected is in the past
  displayPastDateMessage() {
    $('.user-avail-rooms-display').text('Please select a valid date')
    $('.manager-avail-rooms-display').text('Please select a valid date')
  },

  // show available rooms for manager search
  showAvailableRoomsMngr(hotel, date, guest) {
    this.clearAvailRoomsDisplay()
    date = this.formatDate(date)
    hotel.findAvailableRooms(date).forEach(room => {
      $('.manager-avail-rooms-display').append(`
      <section class="manager-avail-room-listing">
      <input type="checkbox" value="${room.number}">
      <li>
      <section class="manager-room-listing">
      <p class="manager-room-listing-num">Room #${room.number}</p>
      <p class="manager-room-listing-type">${room.roomType}</p>
      <p class="manager-room-listing-cost">$${room.costPerNight}</p>
      </section>
      </li>
      </section>
      `)
    })
    $('.manager-avail-rooms-display').prepend(`<button class="book-room-for-guest" value="${guest.id}">Book for Guest</butotn>`)
  },

  // clear manager search screen and input value
  clearManagerSearch() {
    $(".user-search-results").text('Booking Successful')
    $('.user-search').val('')
  },

  // clear user screens
  clearAvailRoomsDisplay() {
    $('.user-avail-rooms-display').text('')
    $('.manager-avail-rooms-display').text('')
    $('.filter-rooms-section').addClass('hide')
  },

  // add filter to guest search for avail rooms 
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

  // display filtered rooms by room type
  displayRoomsAvailByType(date, type, hotel) {
    this.clearAvailRoomsDisplay()
    date = this.formatDate(date)
    const duty = "filter"
    this.showAvailableRooms(hotel, date, duty, type)
  },

  // display thank you to guest after booking reso
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

  // show search results on manager screen for guest search
  displayManagerGuestSearchResults(manager, input, allRooms) {
    this.clearGuestSearchResultsSection()
    const results = manager.searchGuests(input)
    results.forEach(user => {
      $('.user-search-results').append(`
      <section class="user-search-listing">
      <li>
      <p class="user-search-name">${user.name}</p>
      <section class="user-info-section">
      <p class="user-search-id">Guest id: ${user.id}</p>
      <p class="user-search-amount-spent">Amount Spent: $${user.findTotalSpent(allRooms)}</p>
      <button class="show-guest-details" value=${user.id}>Guest Details</button>
      </li>
      </section>
      <section>
      `)
    })
  },

  // clear guest search results on manager screen
  clearGuestSearchResultsSection() {
    $('.user-search-results').text('')
  },

  // show guest info on manager screen
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

// display guests past reservations on manager screen
  displayPastBookings(guest, today) {
    const pastBookings = guest.findPastBookings(today)
    pastBookings.forEach(booking => {
      $('.past-bookings').append(`<li>Date of stay: ${booking.date} -- Room # ${booking.roomNumber}</li>`)
    })
  },

  // display guests upcoming reservationson manager screen
  displayUpcomingBookings(guest, today) {
    const futureBookings = guest.findFutureBookings(today).sort((a, b) => a.date - b.date)
    futureBookings.forEach(booking => {
      $('.upcoming-bookings').append(`
      <li>${booking.date}</li>
      <button class="delete-booking" value="${booking.id}">Delete Booking</button>
      `)
    })
  },
  
  // displays manager book for user screen
  displayBookForGuestScreen(guest) {
    $('.user-search-results').html(`
      <section class="manager-book-form">
      <label>Please Select a Date</label> 
      <input type="text" class="manager-book-input" placeholder="Select a Date">
      <button class="manager-book-button" value="${guest.id}">Available Rooms</button>
      <section class="manager-avail-rooms-display"></<section>
      </section>
      `)
    const picker2 = datepicker('.manager-book-input', {
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = value // => '1/1/2099'
      }
    })
  },

  signOut() {
    location.reload()
  },
  
  // take back to user dash screen
  returnToUserDash(user, allRooms, today) {
    this.showUserScreen(user, allRooms, today)
    // $('.thank-you-section').remove()
    // $('.user-dash-to-hide').removeClass('hide')
    // $('.user-screen').removeClass('hide')
  },

  // take back to book screen
  returnToBook(user, allRooms, today) {
    this.showUserScreen(user, allRooms, today)
    $('.thank-you-section').remove()
    $('.user-book-section').removeClass('hide')
    $('.user-screen').removeClass('hide')
  },

  // message for successfully deleting a booking
  displayDeleteConfirmation(bookingId) {
    $('.user-search-results').text(`Reservation #${bookingId} was successfully deleted.`)
  },

  // message if no rooms available
  displayNoRoomsAvailMessage(bookingId) {
    $('.user-avail-rooms-display').html(`
    <h3>
    Sorry, there are no available rooms for selected date. Please try a different date.
    </h3>
    `)
  },
}


export default domUpdates;