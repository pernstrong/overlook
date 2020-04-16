import $ from 'jQuery';
import './css/base.scss';
import domUpdates from './domUpdates';
import Hotel from './Hotel';
import Booking from './Booking';
import User from './User';
import Room from './Room';
let allRooms = []
let allUsers = []
let allBookings = []
let user;
let hotel;

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json())
]).then(data => createDataSets(data[0].users, data[1].rooms, data[2].bookings))

function createDataSets(users, rooms, bookings) {
  createRooms(rooms)
  createBookings(bookings)
  createUsers(users)
  createHotel()
}

function createUsers(users) {
  users.forEach(user => {
    const newUser = new User(user)
    allUsers.push(newUser)
  })
  findBookingsForUsers()
  //   below are for testing...delete when done with user dash
  user = allUsers[12]
  domUpdates.showWelcomeUserScreen(user, allRooms)

}

function createRooms(rooms) {
  rooms.forEach(room => {
    const newRoom = new Room(room)
    allRooms.push(newRoom)
  })
  // console.log(allRooms)
}

function createBookings(bookings) {
  bookings.forEach(booking => {
    const newBooking = new Booking(booking) 
    allBookings.push(newBooking)
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
    domUpdates.showWelcomeManagerScreen()
  } else if ($('.username-login').val().includes('customer') && $('.password-login').val() === 'overlook2019'){
    assignCurrentUser()
  } else {
    $('.incorrect-login').text('try again')
  }
}

// function assignCurrentUser(userNum) {
//   user = allUsers.find(user => { 
//     return user.id === Number($('.username-login').val().split('').slice(8).join(''))
//   })
//   domUpdates.showWelcomeUserScreen(user)
// }

$('.manager-select-date').on('click', function() {
  domUpdates.showManagerDashInfo(hotel)
})

$('.user-book-button').on('click', function() {
  let date = $('.user-book-input').val()
  domUpdates.showAvailableRooms(hotel, date)
})

$('.user-book-section').on('click', function(event) {
  if (event.target.classList.contains('filter-by-room-type')) {
    let date = $('.user-book-input').val()
    let type = $('#filter-rooms').val()
    console.log(type)
    domUpdates.displayRoomsAvailByType(date, type, hotel)
  }
})

$('.user-book-section').on('click', function(event) {
  let roomNumber;
  let date = $('.user-book-input').val()
  if (event.target.classList.contains('book-room')) {
    let room = $('input[type="checkbox"]:checked');
    if (room.length > 1) {
      console.log('error')
    } else {
      roomNumber = room.val()
      console.log(roomNumber)
      hotel.addBooking(user, roomNumber, date)
      postNewBooking(user, roomNumber, date)
    //   update rooms, users????
    }
  }
})


function postNewBooking(user, roomNumber, date) {
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
}

function formatDate(date) {
  return date.split('-').join('/')
}