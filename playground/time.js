const moment = require('moment');

// const date = new Date();
// console.log(date.getMonth());

// const date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do YYYY'));

const someTimestamp = moment().valueOf();
console.log(someTimestamp);

const createAt = 1234;
const date = moment(createAt);
console.log(date.format('h:mm a'))
