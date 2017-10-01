// Description:
// <description of this script's functionality>
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
//  hubot <trigger> - <what the respond trigger does>
//  <trigger> - <what the hear trigger does>
//
// Notes:
//
//
// Author: gnurt79
// <github username of the original script author>
//

// module.exports = function(robot) {
//
// }

/************************************

EXAMPLES OF THE KEY HUBOT FUNCTIONS

************************************/


/* IMPORTANT!
You can have only one instance of module.exports in each JavaScript file.
If you want to supplement your existing code above with any the code below,
you need to move the contents of module.exports below into the module.exports code above.
*/

// var currentTime = new Date();
// var hoursToTeaTime;
var minutesToTeaTime;
const TEA_TIME_HOURS = 15;
const TEA_TIME_MINUTES = 0;
// const HUBOT_GIPHY_API_KEY = "dc6zaTOxFJmzC";

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

const giphy = {
  api_key: process.env.HUBOT_GIPHY_API_KEY,
  base_url: 'http://api.giphy.com/v1'
};


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
          return msg.send(image.images.original.url);
        }

      } catch (e) {
        response = undefined;
        // return cb('Error');
        return msg.send(`No results found for ${query}`);
      }

      if (response === undefined) { return; }
  });
};

module.exports = function(teabot) {
  // Basic example of respond / send. If the user enters hi or hello the bot responds "Howdy!"
  teabot.respond(/When is tea time?/i, function(msg) {
    var currentTime = new Date();

    hoursToTeaTime = currentTime.getHours() - TEA_TIME_HOURS;
    minutesToTeaTime = currentTime.getMinutes() - TEA_TIME_MINUTES;

    if (hoursToTeaTime < 0 && minutesToTeaTime < 0) {
      return msg.send("1: The next tea time is in " + Math.abs(hoursToTeaTime) + " hours and " +  Math.abs(minutesToTeaTime) + " minutes.");
    }
    else if (hoursToTeaTime >= 0 && minutesToTeaTime < 0) {
      return msg.send("2: The next tea time is in " + (24 - hoursToTeaTime) + " hours and " +  Math.abs(minutesToTeaTime) + " minutes.");
    }
    else if (hoursToTeaTime < 0 && minutesToTeaTime >= 0) {
      return msg.send("3: The next tea time is in " + Math.abs(hoursToTeaTime) + " hours and " +  (60 - minutesToTeaTime) + " minutes.");
    }
    else {
      return msg.send("4: The next tea time is in " + (24 - hoursToTeaTime) + " hours and " +  (60 - minutesToTeaTime) + " minutes.");
    }

  });

  teabot.hear(/fail/, function(res) {
   return res.send("I'm a little Teabot!");
  });

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
  teabot.hear(/bot|robot/i, function(msg) {
    search(msg, "robot");
  });
  //
  // bot.respond(/Hi Yellobot! My name is (.*)/i, function(msg) {
  // var name;
  // name = msg.match[1];
  // if (name == "Yellowbot"){
  //   return msg.send("You're not Yellowbot--I'm Yellowbot!");
  // } else {
  //   return msg.reply("Nice to meet you, " + name + "!");
  // }
};
