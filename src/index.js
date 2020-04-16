import $ from 'jquery';
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'


Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()),
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json())
]).then(data => createDataSets(data[0].users, data[1].rooms, data[2].bookings))

function createDataSets(users, rooms, bookings) {
    createUsers(users)
    createRooms(rooms)
    createBookings(bookings)
}

function createUsers(users) {
    // console.log(users)
}

function createRooms(rooms) {
    // console.log(rooms)
}

function createBookings(bookings) {
    // console.log(bookings)
}
