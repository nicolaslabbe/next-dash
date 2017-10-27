const fetch = require("fetch-everywhere");
const moment = require("moment");
const Libs = require("../Libs");

module.exports.find = (stopId, directions, bearer, l) => {
  var limit = l || 10;
  const date = new Date()
    .toISOString()
    .replace(/-|:/g, "")
    .split(".")[0];
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area:OCE:SA:${stopId}/departures?datetime=${date}&data_freshness=realtime&count=100`,
      {
        method: "GET",
        headers: {
          Authorization: "" + bearer
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        try {
          var formatted = {};
          Array.prototype.forEach.call(responseJson.departures, departure => {
            Array.prototype.forEach.call(directions, direction => {
              const terminus = departure.display_informations.direction.toLowerCase();
              if (terminus.indexOf(direction.toLowerCase()) > -1) {
                if (
                  typeof formatted[terminus] === "undefined" ||
                  formatted[terminus] === null
                ) {
                  formatted[terminus] = {
                    stopId: stopId,
                    terminus: departure.display_informations.direction,
                    station: departure.stop_point.name,
                    code: departure.route.line.code,
                    color: departure.route.line.color,
                    name: departure.route.name,
                    departures: []
                  };
                }
                let formattedDate = moment(
                  departure.stop_date_time.departure_date_time
                );

                if (formatted[terminus].departures.length < limit) {
                  formatted[terminus].departures.push({
                    time: moment(
                      departure.stop_date_time.arrival_date_time
                    ).valueOf(),
                    formatted: formattedDate
                  });
                }
              }
            });
          });

          var stations = [];
          Array.prototype.forEach.call(Object.keys(formatted), name => {
            stations.push(formatted[name]);
          });
          resolve(stations);
        } catch (e) {
          reject(e);
        }
      })
      .catch(error => {
        reject(e);
      });
  });
};
