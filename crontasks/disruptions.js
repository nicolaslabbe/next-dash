const path = require("path");
var cron = require("node-cron");
const Utils = require("../Utils");
const Libs = require("../Libs");

const sendPushString = () => {
  // var promises = [];
  // var results = [];
  // var errors = [];
  // Array.prototype.forEach.call(JSON.parse(process.env.TRAIN_STOPS), function(
  //   item
  // ) {
  //   promises.push(
  //     Libs.sncf.find(item.id, item.direction, process.env.TRAIN_BEARER).then(
  //       function(res) {
  //         results.push(res);
  //       },
  //       function(error) {
  //         errors.push(error);
  //       }
  //     )
  //   );
  // });
  // Promise.all(promises)
  //   .then(function() {
  //     var pushString = "";
  //     Array.prototype.forEach.call(results, function(items) {
  //       Array.prototype.forEach.call(items, function(item) {
  //         if (item && item.status) {
  //           pushString += item.status;
  //         }
  //       });
  //     });
  //     if (pushString !== "") {
  //       Libs.push.send(pushString);
  //     } else {
  //       Libs.push.send("traffic ok");
  //     }
  //     // Libs.status.success(res, results);
  //   })
  //   .catch(function(e) {
  //     console.log("e", e);
  //   });
};

const schedule = () => {
  cron.schedule("0 */1 * * *", function() {
    sendPushString();
  });
};

module.exports = {
  schedule
};
