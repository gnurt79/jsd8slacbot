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
const TEA_TIME_MINUTES = 50;

module.exports = function(teabot) {
  // Basic example of respond / send. If the user enters hi or hello the bot responds "Howdy!"
  teabot.respond(/time/i, function(msg) {
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
      return msg.send("2: The next tea time is in " + Math.abs(hoursToTeaTime) + " hours and " +  (60 - minutesToTeaTime) + " minutes.");
    }
    else {
      return msg.send("2: The next tea time is in " + (24 - hoursToTeaTime) + " hours and " +  (60 - minutesToTeaTime) + " minutes.");
    }

  });

  // teabot.hear(/bot|robot/, function(res) {
  //  return res.send("I'm a little Teabot!");
  // });
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
