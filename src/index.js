import $ from 'jQuery';
import './css/base.scss';
import domUpdates from './domUpdates';
import Hotel from './Hotel';
import Booking from './Booking';
import User from './User';
import Room from './Room';
import Manager from './Manager'
import './images/hotel2.jpg'
let allRooms = []
let allUsers = []
let allBookings = []
let user;
let hotel;
let manager;
let today;
let todayDateAndTime

window.addEventListener('load', promiseAll)

function promiseAll() {
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json())
  ]).then(data => createDataSets(data[0].users, data[1].rooms, data[2].bookings))
}

function createDataSets(users, rooms, bookings) {
  createRooms(rooms)
  createBookings(bookings)
  createUsers(users)
  createHotel()
  createManager()
  findTodaysDate()
//   console.log('user', user.bookings)
//   console.log('allbooks', allBookings)
//   console.log(allRooms[0].bookings)
}

function findTodaysDate() {
  todayDateAndTime = new Date();
  let year = todayDateAndTime.getFullYear()
  let month = (todayDateAndTime.getMonth()+1)
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

function createManager() {
  manager = new Manager(allUsers)
}
function createUsers(users) {
  users.forEach(user => {
    const newUser = new User(user)
    allUsers.push(newUser)
  })
  findBookingsForUsers()
}

function createRooms(rooms) {
  rooms.forEach(room => {
    const newRoom = new Room(room)
    allRooms.push(newRoom)
  })
}

function createBookings(bookings) {
  bookings.forEach(booking => {
    const newBooking = new Booking(booking) 
    allBookings.push(newBooking)
  })
  addBookingsToRooms()
}

function addBookingsToRooms() {
  allBookings.forEach(booking => {
    allRooms.forEach(room => {
      if (booking.roomNumber === room.number) {
        room.book(booking)
      }
    })
  })
}


function createHotel() {
  hotel = new Hotel(allRooms, allUsers, allBookings)
}

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

function loginHandler() {
  if ($('.username-login').val() === 'manager' && $('.password-login').val() === 'overlook2019') {
    domUpdates.showManagerScreen()
    domUpdates.showManagerDashInfo(hotel, today)
  } else if ($('.username-login').val().includes('customer') && $('.password-login').val() === 'overlook2019') {
    assignCurrentUser()
    domUpdates.showUserScreen(user, allRooms)
  } else {
    $('.incorrect-login').text('try again')
  }
}

function assignCurrentUser(userNum) {
  user = allUsers.find(user => { 
    return user.id === Number($('.username-login').val().split('').slice(8).join(''))
  })
}

$('.manager-select-date').on('click', function() {
  domUpdates.showManagerDashInfo(hotel)
  domUpdates.updateStatsMessageDate()

})

// $('.book-button').on('click', function() {
//   let date = $('.book-input').val()
//   console.log(date)
//   domUpdates.showAvailableRooms(hotel, date)
// })

$('.user-book-section').on('click', function(event) {
  if (event.target.classList.contains('filter-by-room-type')) {
    let date = $('.book-input').val()
    let type = $('#filter-rooms').val()
    console.log(type)
    domUpdates.displayRoomsAvailByType(date, type, hotel)
  }
})

$('.user-book-section').on('click', function(event) {
  let roomNumber;
  let date = $('.book-input').val()
  if (event.target.classList.contains('book-room')) {
    let room = $('input[type="checkbox"]:checked');
    if (room.length > 1) {
      console.log('error')
    } else {
      roomNumber = room.val()
      console.log(roomNumber)
      hotel.addBooking(user, roomNumber, date)
      postNewBooking(user, roomNumber, date)
      clearData()
      promiseAll()
      domUpdates.displayThankYou()
    }
  }
})


function postNewBooking(user, roomNumber, date) {
  // console.log(typeof Date.now().toString())
  let objDate = formatDate(date)
  let roomNum = Number(roomNumber)
  let objID = Date.now().toString()
  console.log(user, roomNum, objDate)
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: objID,
      userID: user.id,
      date: objDate,
      roomNumber: roomNum,
    })
  //   // body: JSON.stringify({
  //   //   userID: user.id,
  //   //   date: objDate,
  //   //   roomNumber: roomNum,
  //   // })
  })
    .then(response => response.json())
    .catch(err => console.error(err))
}

function formatDate(date) {
  return date.split('-').join('/')
}

function clearData() {
  allRooms = []
  allUsers = []
  allBookings = []
}

$('.search-button').on('click', function() {
  let input = $('.user-search').val()
  domUpdates.displayManagerGuestSearchResults(manager, input, allRooms)
})

// refactor!!!!!
$('.user-search-results').on('click', function(event) {
  if (event.target.classList.contains('show-guest-details')) {
    // helper function?
    let id = event.target.value
    let guest = findGuestById(id)
    domUpdates.showGuestDetails(guest, allRooms, today)
  } else if (event.target.classList.contains('manager-book-button')) {
    let date = $('.manager-book-input').val()
    console.log(date)
    domUpdates.showAvailableRoomsMngr(hotel, date)
  } else if (event.target.classList.contains('book-for-guest')) {
    // helper function?
    let id = event.target.value
    let guest = findGuestById(id)
    domUpdates.displayBookForGuestScreen(guest)
  } else if (event.target.classList.contains('book-room-for-guest'))  {
    let roomNumber = $('input[type="checkbox"]:checked').val();
    let date = $('.manager-book-input').val()
    console.log(roomNumber, date)
    postNewBooking(user, roomNumber, date)
  } else if (event.target.classList.contains('delete-booking')) {
    let bookingId = $('.delete-booking').val()
    deleteBooking(bookingId)
  }

})

function findGuestById(id) {
  return allUsers.find(user => {
    return user.id === Number(id)
  })
}

function deleteBooking(bookingId) {
  let id = bookingId
  domUpdates.clearGuestSearchResultsSection()
  $('.user-search').val('')
   fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings' + '/' + id, {
    method: 'DELETE',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // body: JSON.stringify({
    //   id: bookingId,
    // })
  })
    // .then(response => response.json())
    .then(res => res.text())
    .then(text => console.log(text))
    // .catch(err => console.error(err))
}
