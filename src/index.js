import $ from 'jQuery';
import './css/base.scss';
import domUpdates from './domUpdates';
import Hotel from './Hotel';
import Booking from './Booking';
import User from './User';
import Room from './Room';
import Manager from './Manager'
import './images/hotel2.jpg'
import './images/ressuite2.png'
import './images/singleroom2.png'
import './images/suite2.png'
import './images/jrsuite2.png'
import './images/house.png'
import './images/menu.png'
import './images/logout.png'
import datepicker from 'js-datepicker'

let allRooms = []
let allUsers = []
let allBookings = []
let user;
let hotel;
let manager;
let today;
let todayDateAndTime

window.addEventListener('load', promiseAll)

// Promise all/fetch function
function promiseAll() {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json())
  ]).then(data => createDataSets(data[0].users, data[1].rooms, data[2].bookings))
}

// helper function to create data sets from APIs above
function createDataSets(users, rooms, bookings) {
  createRooms(rooms)
  createBookings(bookings)
  createUsers(users)
  createHotel()
  createManager()
  findTodaysDate()
  console.log(allBookings.length)
  // user = allUsers[32]
  // domUpdates.changeHeader()
  // domUpdates.showUserScreen(user, allRooms, today)

}

// uses Date() to get todays date then formats
function findTodaysDate() {
  todayDateAndTime = new Date();
  console.log(todayDateAndTime)
  let year = todayDateAndTime.getFullYear()
  let month = (todayDateAndTime.getMonth() + 1)
  let day = todayDateAndTime.getDate();
  if (month.toString().split('').length < 2) {
    month = month.toString()
    month = `0${month}`
  }
  if (day.toString().split('').length < 2) {
    day = day.toString()
    day = `0${month}`
  }
  today = `${year}/${month}/${day}`
} 

// instantiates manager
function createManager() {
  manager = new Manager(allUsers)
}

// instantieates users
function createUsers(users) {
  users.forEach(user => {
    const newUser = new User(user)
    allUsers.push(newUser)
  })
  findBookingsForUsers()
}

// instantiates rooms
function createRooms(rooms) {
  rooms.forEach(room => {
    const newRoom = new Room(room)
    allRooms.push(newRoom)
  })
}

// instantiates bookings
function createBookings(bookings) {
  bookings.forEach(booking => {
    const newBooking = new Booking(booking) 
    allBookings.push(newBooking)
  })
  addBookingsToRooms()
}

// instantiates hotels
function createHotel() {
  hotel = new Hotel(allRooms, allUsers, allBookings)
}

// adds correct bookings to each room
function addBookingsToRooms() {
  allBookings.forEach(booking => {
    allRooms.forEach(room => {
      if (booking.roomNumber === room.number) {
        room.book(booking)
      }
    })
  })
}

// adds correct bookings to the user
function findBookingsForUsers() {
  allUsers.forEach(user => {
    allBookings.forEach(booking => {
      if (booking.userID === user.id) {
        user.bookings.push(booking)
      }
    })
  })
}

$(".login-btn").on('click', loginHandler)
// sources login to manager or user
function loginHandler() {
  if ($('.username-login').val() === 'manager' && $('.password-login').val() === 'overlook2020') {
    domUpdates.showManagerScreen()
    domUpdates.changeHeader()
    domUpdates.showManagerDashInfo(hotel, today)
  } else if ($('.username-login').val().includes('customer') && $('.password-login').val() === 'overlook2020') {
    assignCurrentUser()
    domUpdates.changeHeader()
    domUpdates.showUserScreen(user, allRooms, today)
  } else {
    $('.incorrect-login').text('try again')
  }
}

// finds/assigns correct user from all users
function assignCurrentUser() {
  user = allUsers.find(user => { 
    return user.id === Number($('.username-login').val().split('').slice(8).join(''))
  })
}

// changes dash screen by date
$('.manager-select-date').on('click', function() {
  let date = $('.manager-date-input').val()
  date = formatFromPicker(date)
  domUpdates.showManagerDashInfo(hotel, date)
  domUpdates.updateStatsMessageDate(date)

})

// formats the dates from the date picker API
function formatFromPicker(date) {
  date = date.split('/')
  if (date[0].length < 2) {
    date[0] = `0${date[0]}`
  }
  if (date[1].length < 2) {
    date[1] = `0${date[1]}`
  }
  let year = date.pop()
  date.unshift(year)
  return date.join('/')
}

// date picker API
const picker1 = datepicker('.manager-date-input', {
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value // => '1/1/2099'
  }
})

// date picker API
const picker3 = datepicker('.user-book-input', {
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString()
    input.value = value // => '1/1/2099'
  }
})

// shows available rooms to user
$('.user-book-button').on('click', function() {
  let date = $('.user-book-input').val()
  date = formatFromPicker(date)
  if (isFutureDate(date) === false) {
    domUpdates.displayPastDateMessage()
  } else {
    const duty = "findAll"
    domUpdates.showAvailableRooms(hotel, date, duty)
  }
})

// shows rooms avail by room type
$('.user-book-section').on('click', function(event) {
  if (event.target.classList.contains('filter-by-room-type')) {
    let date = $('.user-book-input').val()
    let type = $('#filter-rooms').val()
    domUpdates.displayRoomsAvailByType(date, type, hotel)
  }
})

// fetch function to POST new booking to API
function postNewBooking(user, roomNumber, date) {
  // console.log(typeof Date.now().toString())
  let objDate = formatDate(date)
  let roomNum = Number(roomNumber)
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: user.id,
      date: objDate,
      roomNumber: roomNum,
    })
  })
    .then(response => response.json())
    .catch(err => console.error(err))
  promiseAll()
}

// formats dates from -'s to /'s
function formatDate(date) {
  return date.split('-').join('/')
}

// clears data
function clearData() {
  allRooms = []
  allUsers = []
  allBookings = []
}

// user search for manager
$('.search-button').on('click', function() {
  let input = $('.user-search').val()
  domUpdates.displayManagerGuestSearchResults(manager, input, allRooms)
})

// event propagation handler for manager search results area
$('.user-search-results').on('click', function(event) {
  let id = event.target.value
  // console.log(id)
  let guest = findGuestById(id)
  let date = $('.manager-book-input').val()
  let bookingId = $('.delete-booking').val()
  let roomNumber = $('input[type="checkbox"]:checked').val();
  if (event.target.classList.contains('show-guest-details')) {
    domUpdates.showGuestDetails(guest, allRooms, today)
  } else if (event.target.classList.contains('manager-book-button')) {
    console.log(date)
    date = formatFromPicker(date) 
    if (isFutureDate(date) === false) {
      domUpdates.displayPastDateMessage()
    } else {
      domUpdates.showAvailableRoomsMngr(hotel, date, guest)
    }
  } else if (event.target.classList.contains('book-for-guest')) {
    domUpdates.displayBookForGuestScreen(guest)
  } else if (event.target.classList.contains('book-room-for-guest'))  {
    date = formatFromPicker(date) 
    postNewBooking(guest, roomNumber, date)
    domUpdates.clearManagerSearch()
  } else if (event.target.classList.contains('delete-booking')) {
    deleteBooking(bookingId)
    domUpdates.displayDeleteConfirmation(bookingId)
  }
})

// returns user/guest object by id
function findGuestById(id) {
  return allUsers.find(user => {
    return user.id === Number(id)
  })
}

// fetch DELETE function to delete a booking
function deleteBooking(bookingId) {
  domUpdates.clearGuestSearchResultsSection()
  // $('.user-search').val('')
  let id = Number(bookingId)
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: 
    JSON.stringify(
      {
        "id": id,
      }
    )
  })
    // .then(response => response.json())
    .then(res => res.text())
    .then(text => console.log(text))
    // .catch(err => console.error(err))
}

// checks if dates has passed or not
function isFutureDate(date) {
  console.log(date)
  const dateArray = date.split('/')
  const todayArray = today.split('/')
  console.log(dateArray)
  console.log(todayArray)
  if (Number(dateArray[0]) < Number(todayArray[0])) {
    return false
  } else if (Number(dateArray[0]) === Number(todayArray[0]) && Number(dateArray[1]) < Number(todayArray[1])) {
    return false
  } else if (Number(dateArray[0]) === Number(todayArray[0]) && Number(dateArray[1]) === Number(todayArray[1]) && Number(dateArray[2]) < Number(todayArray[2])) {
    return false
  } else {
    return true
  }
}

// signs user/manager out
$('.sign-out-button').on('click', function() {
  domUpdates.signOut()
})

// changes back to book room from thank you screen
$('.book-a-room-button').on('click', function() {
  domUpdates.switchToBook()
})

// changes back to dashboard from thank you screen
$('.user-dashboard-button').on('click', function() {
  domUpdates.switchToDash()
}) 

// ever propagation for user room earch
$('.user-avail-rooms-display').on('click', function(event) {
  const roomNum = event.target.closest('.available-room-listing').dataset.roomnum
  const date = event.target.closest('.available-room-listing').dataset.date
  if (event.target.classList.contains('book-now-button')) {
    domUpdates.toggleBookAndConfirmation(roomNum)
  } else if (event.target.classList.contains('cancel-booking-button')) {
    domUpdates.toggleBookAndConfirmation(roomNum)
  } else if (event.target.classList.contains('confirm-booking-button')) {
    hotel.addBooking(user, Number(roomNum), date)
    postNewBooking(user, Number(roomNum), date)
    clearData()
    promiseAll()
    domUpdates.displayThankYou(date)
  }
})

// event propagation for thank you screen
$('.user-screen').on('click', function(event) {
  if (event.target.classList.contains('return-to-dashboard')) {
    domUpdates.returnToUserDash(user, allRooms, today)
  } else if (event.target.classList.contains('book-again')) {
    domUpdates.returnToBook(user, allRooms, today)
  }
})
