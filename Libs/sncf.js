const fetch = require("fetch-everywhere");
const moment = require("moment");
const Libs = require("../Libs");
const Utils = require("../Utils");

const baseUrl = `https://api.sncf.com/v1/coverage/sncf`;

const get = url => {
  return new Promise((resolve, reject) => {
    Utils.url
      .get(url, {
        Authorization: "" + process.env.TRAIN_BEARER
      })
      .then(result => resolve(result), error => reject(error));
  });
};

const find = (stopId, bearer) => {
  return new Promise((resolve, reject) => {
    get(`${baseUrl}/stop_areas/${stopId}`).then(
      station => {
        get(
          `${baseUrl}/stop_areas/${stopId}/departures?data_freshness=realtime&count=100`
        ).then(
          result => {
            try {
              var schedules = [];
              Array.prototype.forEach.call(result.departures, departure => {
                schedules.push(
                  Utils.list.make(
                    departure.display_informations.direction,
                    null,
                    Utils.date.HHmm(
                      departure.stop_date_time.departure_date_time
                    ),
                    departure.disruptions && departure.disruptions.length > 0
                      ? "warning"
                      : null
                  )
                );
              });

              resolve(schedules);
            } catch (e) {
              reject(Utils.error.catch(e));
            }
          },
          error => reject(error)
        );
      },
      error => reject(error)
    );
  });
};

const detail = (stopId, bearer) => {
  return new Promise((resolve, reject) => {
    get(`${baseUrl}/stop_areas/${stopId}`).then(
      station => {
        try {
          resolve(
            Utils.list.make(
              station.stop_areas && station.stop_areas[0].label,
              null,
              null,
              null,
              station.stop_areas && station.stop_areas[0].id,
              {
                label: station.stop_areas && station.stop_areas[0].label,
                name: station.stop_areas && station.stop_areas[0].name,
                coord: station.stop_areas && station.stop_areas[0].coord
              }
            )
          );
        } catch (e) {
          reject(Utils.error.catch(e));
        }
      },
      error => reject(error)
    );
  });
};

const search = (query, bearer) => {
  return new Promise((resolve, reject) => {
    get(`${baseUrl}/places?q=${query}`).then(
      result => {
        try {
          var places = result && result.places ? result.places : [];
          var results = [];
          Array.prototype.forEach.call(places, place => {
            results.push(
              Utils.list.make(place.name, null, null, null, place.id)
            );
          });

          resolve(results);
        } catch (e) {
          reject(Utils.error.catch(e));
        }
      },
      error => reject(error)
    );
  });
};

module.exports = {
  search,
  detail,
  find
};
