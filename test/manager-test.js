import Manager from '../src/Manager';
// const spies = require('chai-spies');
// chai.use(spies)
import chai from 'chai';
const expect = chai.expect;

describe('Manager', function() {
  
  let manager1;
  let guests;

  this.beforeEach(function () {
    guests = [{id: 1, name: 'Billy Beans'}, {id: 2, name: 'Kentucky Robertson'}, {id: 3, name: 'Clete'}]
  
    manager1 = new Manager(guests)
  });

  it('should be a function', function() {

    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Room', function() {
      
    expect(manager1).to.be.an.instanceof(Manager);
  });

  it('should have a guests', function() {
      
    expect(manager1.guests.length).to.equal(3);
    expect(manager1.guests[2].name).to.equal('Clete');
  });

  it('should be able to search its guests by name', function () {

    expect(manager1.searchGuests('Billy')).to.deep.equal([{id: 1, name: 'Billy Beans'}])
    expect(manager1.searchGuests('billy')).to.deep.equal([{id: 1, name: 'Billy Beans'}])
  })
})