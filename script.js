'use strict';

const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;
  //! we could do it like this or set default values like above

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);

// createBooking('LH123', 1000);
//this way won't work. instead
createBooking('LH123', undefined, 1000);

const flight = 'LH234';
const tawkir = {
  name: 'Tawkir Talukder',
  passport: 236412546657,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;
  if (passenger.passport === 236412546657) {
    alert('Checked In');
  } else {
    alert('Wrong Passport');
  }
};

// checkIn(flight, tawkir);
// console.log(flight);
// console.log(tawkir);

// Is same as doing

// const flightNum = flight;
// const passenger = tawkir;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000000000);
};
newPassport(tawkir);
checkIn(flight, tawkir);

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher Order function

const transformer = function (str, fn) {
  console.log(`original string: ${str}`);
  console.log(`transformed string ${fn(str)}`);
  console.log(`transformed by: ${fn.name}`);
  //here 'name' is a function property . that is used to demostrate the name of the function
};

transformer('Javascript is the best', upperFirstWord);
transformer('Javascript is the best', oneWord);

const high5 = function () {
  console.log('✋');
};
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('tawkir');
greeterHey('Talukder');

greet('hello')('tawkir');
//we are passing two arguements for 'greeting' and 'name'

const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('hello')('twkir');

const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function(){}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
  },
};

lufthansa.book(239, 'Tawkir Talukder');
lufthansa.book(635, 'Shafi Talukder');
console.log(lufthansa);

//now they have created a new airline

const eurowings = {
  name: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

//now we will book

const book = lufthansa.book;

// Does not work
//book(23,'Sarah williams')

book.call(eurowings, 23, 'sarah williams');
//! call method here took the first arguement 'eurowings' to determine for which flight it was called for
//! then it took the other arguements

book.call(lufthansa, 239, 'Marry Cooper');

const swiss = {
  airline: 'Swiss air lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

//apply method is just like the call method
//just this time it takes list instead of arguements

const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
//but it is not called in the modern javascript
//because we can do this
book.call(swiss, ...flightData);

//bind method is more important
//just like call and apply we are already taking the value

const bookEw = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEw(23, 'Steven Williams');

//just like call we are giving it more arguements . we are stting it for the specific flight
const bookEW23 = book.bind(eurowings, 23);
//here we are passing just one arguement
bookEW23('Tawkir Talukder');
bookEW23('Martha Cooper');

//bind method with Event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
//! In a eventlistener method 'this' keyword always points to the element on which the handler is attatched to
//that's why it returne NaN without the bind method

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
//we have to pass an arguement . thats why we used null, then the rate
//addVAT=value=>value+value*0.23
//in bind method the first keyword should be 'this' . but in this case there is no
//'this keyword' thats why we used null for the first arguement
// then the second value is rate. that's what we declared default

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

(function () {
  console.log('This will never run again');
})();
//this function will nver run again
// wiht () we are calling the function
//* for arrow function
(() => console.log('This will nver run again'))();
//? this is another way of calling but to never run again

//closure

const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();
//this function doesn't need any parameters
booker();
booker();
booker();
console.dir(booker);

//another closure example
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

g();
f();
//! you have to call the main function first then
//! with the sub function
//ohterwise it won't work

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
//i added this for checking .. i didn''t use it for any purpose

g();
f();

// Re-assigning f function

h();
f();

//Example

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);
  //but this section will start after 3 seconds. 1000 is milisecond here
  //!This a system to callback a function
  console.log(`Will start boarding in ${wait} seconds`);
  //this section will start immedietely
};

const perGroup = 1000;
boardPassengers(180, 3);
