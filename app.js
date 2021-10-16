// Require https module
const https = require("https");

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} totalbadges and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  const request = https.get(
    `https://teamtreehouse.com/${username}.json`,
    (response) => {

      let body = "";

      // Beginning event (Data Event)
      response.on("data", (data) => {
        body += data.toString(); // Convert buffer to string
      });

      // Ending Event (Data Event)
      response.on("end", () => {
        const profile = JSON.parse(body); // Convert string to object 
        printMessage(
          username,
          profile.badges.length,
          profile.points.JavaScript
        );
      });
    }
  );
}

const users = ["chalkers", "alenaholligan", "davemcfarland"]; 

users.forEach(getProfile); 

/* Equivalent 
users.forEach(username => {
    getProfile(username); 
})
*/ 