// Require https module
const https = require("https");

// Print Error Messages
function printError(error) {
  console.error(error.message);
}

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} totalbadges and ${points} points in JavaScript`;
  console.log(message);
}

function get(username) {
  try {
    const request = https.get(
      `https://teamtreehouse.com/${username}.json`,
      (response) => {
        if (response.statusCode === 200) {
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
        } else {
          const message = `There was an error getting the profile for ${username} (${response.statusCode})`;
          printError(statusCodeError); 
        }
      }
    );

    // Works if no error throw right away but is emitted
    request.on("error", printError);
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get; 