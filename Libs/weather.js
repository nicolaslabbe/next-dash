const moment = require("moment");
const Utils = require("../Utils");

const baseUrl = `http://api.openweathermap.org/data/2.5/`;

const getIcon = code => {
  switch (code) {
    case "01d":
      return "A";
      break;
    case "02d":
      return "C";
      break;
    case "03d":
      return "C";
      break;
    case "04d":
      return "C";
      break;
    case "09d":
      return "X";
      break;
    case "10d":
      return "F";
      break;
    case "11d":
      return "T";
      break;
    case "13d":
      return "W";
      break;
    case "50d":
      return "C";
      break;
    case "01n":
      return "I";
      break;
    case "02n":
      return "D";
      break;
    case "03n":
      return "C";
      break;
    case "04n":
      return "C";
      break;
    case "09n":
      return "W";
      break;
    case "10n":
      return "W";
      break;
    case "11n":
      return "T";
      break;
    case "13n":
      return "W";
      break;
    case "50n":
      return "D";
      break;
    default:
      return null;
  }
};

const find = (cityId, apiKey) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}forecast/${cityId}?units=metric&APPID=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        try {
          var first = responseJson.list[0];
          responseJson.list.shift();

          var result = [
            {
              ...Utils.list.make(
                `${responseJson.city.name} (${responseJson.city &&
                  responseJson.city.country})`,
                null,
                null,
                getIcon(first.weather[0].icon)
              )
            },
            {
              ...Utils.list.make("degree", null, `${first.main.temp}°C`, null)
            },
            {
              ...Utils.list.make(
                "humidity",
                null,
                `${first.main.humidity}%`,
                null
              )
            },
            { ...Utils.list.make("label", null, first.weather[0].main, null) },
            {
              ...Utils.list.make(
                "description",
                null,
                first.weather[0].description,
                null
              )
            },
            { ...Utils.list.make("wind", null, `${first.wind.speed}km`, null) }
          ];
          Array.prototype.forEach.call(responseJson.list, value => {
            result.push({
              ...Utils.list.make(
                Utils.date.HHmm(value.dt_txt),
                null,
                `${value.main.temp}°C`,
                getIcon(first.weather[0].icon)
              )
            });
          });

          resolve(result);
        } catch (e) {
          reject(Utils.error.catch(e));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const detail = (cityId, apiKey) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}forecast/${cityId}?units=metric&APPID=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        try {
          var result = Utils.list.make(
            `${responseJson.city.name} (${responseJson.city.country})`,
            null,
            null,
            null,
            responseJson.city.id,
            {
              country: responseJson.city.country,
              name: responseJson.city.name,
              coord: responseJson.city.coord
            }
          );
          resolve(result);
        } catch (e) {
          reject(Utils.error.catch(e));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const search = (query, apiKey, page) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}find?APPID=${apiKey}&q=${query}`)
      .then(response => response.json())
      .then(responseJson => {
        try {
          var results = [];
          Array.prototype.forEach.call(responseJson.list, item => {
            results.push(
              Utils.list.make(
                `${item.name} (${item && item.sys && item.sys.country})`,
                null,
                null,
                getIcon(item.weather[0].icon),
                item.id
              )
            );
          });

          resolve(results);
        } catch (e) {
          return reject(Utils.error.catch(e));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  search,
  detail,
  find
};
