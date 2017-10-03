// Description:
// My hubot is supposed to report the amount remaining intil the next JavaScript class.  It functionally works, but the
// math on the time calculation is wrong.  I need to use another math algorithm. You can also ask it who is his most or
// least favorite movie robot.  If it hears "robot" it will respond back to the user with a giphy of a robot.
//
// Dependencies:
//   None
//
// Configuration:
//   HUBOT_GIPHY_API_KEY
//
// Commands:
//  hubot when is tea time? - returns the number of hours and minute until tea time(3:30pm)
//  hubot who is your <query> favorite robot - returns an image of a good or evil robot
//  hears "fail" - returns "I'm a little teabot"
//  hears "bot" or "robot" - returns a random gif of robots
//
// Notes: The math on the function to return the time of the next JSD class is still funky.
// But if you are an early bird type then the math is rock solid.
//
//
// Author: gnurt79
// <github username of the original script author>
//
// module.exports = function(robot) {
//
// }

/************************************

I'M A LITTLE TEABOT

************************************/


/* IMPORTANT!
You can have only one instance of module.exports in each JavaScript file.
If you want to supplement your existing code above with any the code below,
you need to move the contents of module.exports below into the module.exports code above.
*/

// Constants for keeping track of what time the JSD class starts
const TEA_TIME_HOURS = 18;
const TEA_TIME_MINUTES = 30;

// Arrays for holding images of good and bad robots
mostFavRobotImages = [
  "http://loadion.com/ii/4504413206_ddd10b28d9.jpg",
  "https://cdn.pastemagazine.com/www/articles/19-Best-100-Robots-in-Film-Robot-WallE.jpg",
  "https://cdn.pastemagazine.com/www/articles/82-Best-100-Robots-in-Film-Johnny5.jpg",
  "http://images.contentful.com/7h71s48744nc/M41DNW30aGs44cKsq2Mkk/8f5586196d55c260ee2540c15f0fd009/robots.jpg",
];

leastFavRobotImages = [
  "http://img.wennermedia.com/920-width/rs-202131-maxresdefault.jpg",
  "https://i.ytimg.com/vi/GlvopMebo_k/maxresdefault.jpg",
  "http://www.joblo.com/top_ten_gallery_img/b890c1dd-e98f-b742..jpg",
  "http://pop.h-cdn.co/assets/cm/15/05/54caec985a61e_-_evil-robots-00-0612-de.jpg"
];

// Object for the Giphy API
const giphy = {
  api_key: process.env.HUBOT_GIPHY_API_KEY,
  base_url: 'http://api.giphy.com/v1',
};

// Function to retrieve a random gif grom Giphy
var search = function(msg, query, cb) {
  const endpoint = '/gifs/search';
  const url = `${giphy.base_url}${endpoint}`;
  return msg.http(url)
    .query({
      q: query,
      api_key: giphy.api_key}).get()(function(err, res, body) {
      let response = undefined;
      try {
        response = JSON.parse(body);
        const images = response.data;
        if (images.length > 0) {
          const image = msg.random(images);
          // return cb(image.images.original.url);
          return msg.reply(image.images.downsized.url);
        }
      } catch (e) {
        response = undefined;
        // return cb('Error');
        return msg.reply(`No results found for ${query}`);
      }
      if (response === undefined) { return; }
  });
};

module.exports = function(teabot) {

  // Teabot when return the number of days, hours, and minutes before the next JSD class
  teabot.respond(/When is the next jsd class/i, function(msg) {

    // Variables for tracking time
    var currentTime = new Date();
    var daysToTeaTime;
    var hoursToTeaTime = currentTime.getHours() - TEA_TIME_HOURS;
    var minutesToTeaTime = currentTime.getMinutes() - TEA_TIME_MINUTES;

    // Object for storing the month and day of JSD class
    var jsdClasses = {
      october: [2, 4, 9, 11, 16, 18, 23, 25, 30],
      november: [1, 6, 8, 13],
      nextClass: function() {
        if (currentTime.getMonth() === 9) {
          for (var i = 0; i < this.october.length; i++) {
            if (currentTime.getDate() <= this.october[i]) {
              daysToTeaTime = this.october[i] - currentTime.getDate();
              // msg.send("The next class in October is in " + daysToTeaTime + " days.");
              break;
            }
          }
        }
        else if (currentTime.getMonth() === 10) {
          for (var i = 0; i < this.november.length; i++) {
            if (currentTime.getDate() <= this.november[i]) {
              daysToTeaTime = this.november[i] - currentTime.getDate();
              // msg.send("The next class in November is in " + daysToTeaTime + " days.");
              break;
            }
          }
        }
        else {
          msg.send("There's no more class, stupid!");
        }
      }
    };

    // Run function to retrieve the day of the next class
    jsdClasses.nextClass();

    // Conditions to calculate the hours and minutes before the next class
    if (hoursToTeaTime < 0 && minutesToTeaTime < 0) {
      return msg.send("The next JSD class is in " + daysToTeaTime + " day(s), " +  Math.abs(hoursToTeaTime) + " hours, and " +  Math.abs(minutesToTeaTime) + " minutes.");
    }
    else if (hoursToTeaTime >= 0 && minutesToTeaTime < 0) {
      return msg.send("The next JSD class is in " + daysToTeaTime + " day(s), " + (24 - hoursToTeaTime) + " hours, and " +  Math.abs(minutesToTeaTime) + " minutes.");
    }
    else if (hoursToTeaTime < 0 && minutesToTeaTime >= 0) {
      return msg.send("The next JSD class is in " + daysToTeaTime + " day(s), " + Math.abs(hoursToTeaTime) + " hours, and " +  (60 - minutesToTeaTime) + " minutes.");
    }
    else {
      return msg.send("The next JSD class is in " + daysToTeaTime + " day(s), " + (24 - hoursToTeaTime) + " hours, and " +  (60 - minutesToTeaTime) + " minutes.");
    }
  });

  // Teabot will respond to user's question and return an image of most or least favorite robot
  teabot.respond(/who is your (.*) favorite robot/i, function(msg) {
   var fav;
   fav = msg.match[1];
   switch (fav) {
     case "most":
       return msg.send(msg.random(mostFavRobotImages));
       break;
     case "least":
       return msg.send(msg.random(leastFavRobotImages));
       break;
     default:
       return msg.send("ME OF COURSE!!");
   }
  });

  // Teabot will reply to user if "robot" is mention in the channel
  teabot.hear(/bot|robot/i, function(msg) {
    search(msg, "robot");
  });
};
