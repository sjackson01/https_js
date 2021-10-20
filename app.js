const profile = require('./profile.js'); 

const users = process.argv.slice(2); // Remove first two elements of array

users.forEach(profile.get);

/* Equivalent 
users.forEach(username => {
    getProfile(username); 
})
*/
