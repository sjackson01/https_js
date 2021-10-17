// Require https module
const https = require("https");

// Print Error Messages
function printError(error){
  console.error(error.message); 
}

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} totalbadges and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
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
          try {
            const profile = JSON.parse(body); // Convert string to object
            printMessage(
              username,
              profile.badges.length,
              profile.points.JavaScript
            );
          } catch (error) {
            printError(error);
          }
        });
      }
    );

    // Works if no error throw right away but is emitted
    request.on("error", printError);
  } catch (error) {
    printError(error);
  }
}

const users = process.argv.slice(2); // Remove first two elements of array

users.forEach(getProfile);

/* Equivalent 
users.forEach(username => {
    getProfile(username); 
})
*/
