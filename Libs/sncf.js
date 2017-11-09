const fetch = require("fetch-everywhere");
const moment = require("moment");
const Libs = require("../Libs");
const Utils = require("../Utils");

const getStations = (station, departures) => {
  try {
    var stations = {
      detail: {
        left: station.stop_areas && station.stop_areas[0].label,
        id: station.stop_areas && station.stop_areas[0].id,
        label: station.stop_areas && station.stop_areas[0].label,
        name: station.stop_areas && station.stop_areas[0].name,
        coord: station.stop_areas && station.stop_areas[0].coord
      },
      items:[]
    };
    Array.prototype.forEach.call(departures, departure => {
      stations.items.push({
        left: departure.display_informations.direction,
        right: Utils.date.HHmm(departure.stop_date_time.departure_date_time),
        rightIcon: departure.disruptions && departure.disruptions.length > 0 ? 'warning' : null
      });
    });

    return stations;
  }catch(e) {
    return Utils.error.catch(e)
  }
};

const find = (stopId, bearer) => {
  return new Promise((resolve, reject) => {
    Utils.url
      .get(
        `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stopId}`,
        {
          Authorization: "" + bearer
        }
      )
      .then(
        station =>
          {
            Utils.url
              .get(
                `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stopId}/departures?data_freshness=realtime&count=100`,
                {
                  Authorization: "" + bearer
                })
                .then(
                  result =>
                    {
                      resolve(getStations(station, result.departures))
                    },
                  error => reject(error)
                );
          },
        error => reject(error)
      );
  });
};

const formatSearch = (places) => {
  var results = {
    items: []
  };
  Array.prototype.forEach.call(places, place => {
    results.items.push({
      left: place.name,
      id: place.id
    });
  });

  return results;
};

const search = (query, bearer) => {
  return new Promise((resolve, reject) => {
    Utils.url
      .get(
        `https://api.sncf.com/v1/coverage/sncf/places?q=${query}`,
        {
          Authorization: "" + bearer
        }
      )
      .then(
        result => resolve(result && result.places ? formatSearch(result.places) : []),
        error => reject(error)
      );
  });
};

module.exports = {
  search,
  find
};
