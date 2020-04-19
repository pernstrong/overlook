class Manager {
  constructor(guests) {
    this.guests = guests;
  }

  searchGuests(input) {
    input = input.toLowerCase()
    return this.guests.filter(guest => {
      if (guest.name.toLowerCase().includes(input)) {
        return guest
      }
    })
  }

}




export default Manager;

