const fetch = require("fetch-everywhere");
const moment = require("moment");
const Libs = require("../Libs");
const Utils = require("../Utils");

const getStations = (stopId, directions, limit, departures) => {
  var formatted = {};
  Array.prototype.forEach.call(departures, departure => {
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
        let formattedDate = Utils.date.HHmm(
          departure.stop_date_time.departure_date_time
        );

        if (formatted[terminus].departures.length < limit) {
          formatted[terminus].departures.push({
            time: moment(departure.stop_date_time.arrival_date_time).valueOf(),
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

  return stations;
};

const formatStations = (stopId, directions, limit, departures) => {
  var stations = getStations(stopId, directions, limit, departures);

  var newResult = stations.map(item => {
    var newItem = {
      title: `${item.station} / ${Utils.string.trimBracket(item.terminus)}`,
      items:
        item.departures &&
        item.departures.map(departure => {
          return {
            left: Utils.date.HHmm(departure.time),
            right: Utils.date.remaining(departure.time)
          };
        })
    };
    return newItem;
  });
  return newResult;
};

const formatDisruptions = disruptions => {
  return disruptions.map(item => {
    var cause =
      item.impacted_objects &&
      item.impacted_objects[0] &&
      item.impacted_objects[0].impacted_stops &&
      item.impacted_objects[0].impacted_stops[0]
        ? item.impacted_objects[0].impacted_stops[0].cause
        : "unknow";

    return {
      title: cause,
      items: [
        { left: "status", right: item.status },
        { left: "severity", right: item.severity.name },
        { left: "effect", right: item.severity.effect },
        { left: "start", right: item.application_periods[0].begin },
        { left: "end", right: item.application_periods[0].end },
        { left: "updated", right: item.updated_at },
        {
          left: "cause",
          right: item.impacted_objects[0].impacted_stops[0].cause
        }
      ]
    };
  });
};

const find = (stopId, directions, bearer, l) => {
  return new Promise((resolve, reject) => {
    Utils.url
      .get(
        `https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area:OCE:SA:${stopId}/departures?data_freshness=realtime&count=100`,
        {
          method: "GET",
          headers: {
            Authorization: "" + bearer
          }
        }
      )
      .then(
        result =>
          resolve(formatStations(stopId, directions, l, result.departures)),
        error => reject(error)
      );
  });
};

const findAll = (stops, bearer) => {
  var promises = [];
  var results = [];
  var errors = [];

  return new Promise((resolve, reject) => {
    Array.prototype.forEach.call(stops, item => {
      promises.push(
        find(item.id, item.direction, bearer).then(
          result => results.push(result),
          error => errors.push(error)
        )
      );
    });

    Promise.all(promises)
      .then(() => {
        resolve(results);
      })
      .catch(e => {
        reject(errors);
      });
  });
};

const disruptions = (stopId, bearer) => {
  return new Promise((resolve, reject) => {
    Utils.url
      .get(
        `https://api.sncf.com/v1/coverage/sncf/stop_areas/stop_area:OCE:SA:${stopId}/departures?data_freshness=realtime&count=100`,
        {
          method: "GET",
          headers: {
            Authorization: "" + bearer
          }
        }
      )
      .then(
        result => resolve(formatDisruptions(result.departures)),
        error => reject(error)
      );
  });
};

const disruptionsAll = (stops, bearer) => {
  var promises = [];
  var results = [];
  var errors = [];

  return new Promise((resolve, reject) => {
    Array.prototype.forEach.call(stops, item => {
      promises.push(
        disruptions(item.id, bearer).then(
          result => {
            results.push(result);
          },
          error => errors.push(error)
        )
      );
    });

    Promise.all(promises)
      .then(() => {
        resolve(results);
      })
      .catch(e => {
        reject(errors);
      });
  });
};

module.exports = {
  find,
  findAll,
  disruptions,
  disruptionsAll
};
