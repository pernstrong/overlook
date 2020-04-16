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
  createUsers(users)
  createRooms(rooms)
  createBookings(bookings)
  createHotel()
}

function createUsers(users) {
  users.forEach(user => {
    const newUser = new User(user)
    allUsers.push(newUser)
  })
  // console.log(allUsers)
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
  // console.log(allBookings)
}

function createHotel() {
  hotel = new Hotel(allRooms, allUsers, allBookings)
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

function assignCurrentUser(userNum) {
  user = allUsers.find(user => { 
    return user.id === Number($('.username-login').val().split('').slice(8).join(''))
  })
  domUpdates.showWelcomeUserScreen()
}

$('.manager-select-date').on('click', function() {
  domUpdates.showManagerDashInfo(hotel)
})


