
const getAmazonCookie = require('./amazoncookie');

const username = '6382514856';
const password = 'Sharmi123***@';


getAmazonCookie(username, password)
  .then(() => console.log(' saved '))
  .catch(error =>
     console.error('Error:', error)
     );
