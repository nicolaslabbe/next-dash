const moment = require("moment");
const Utils = require("../Utils");

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

const format = responseJson => {
  var first = responseJson.list[0];
  responseJson.list.shift();

  var result = [
    {
      title: "current",
      items: [
        {
          left: "degree",
          right: `${first.main.temp}°C`
        },
        {
          left: "humidity",
          right: `${first.main.humidity}%`
        },
        {
          left: "label",
          right: first.weather[0].main
        },
        {
          left: "description",
          right: first.weather[0].description
        },
        {
          left: "time",
          right: Utils.date.HHmm(first.dt_txt)
        },
        {
          left: "icon",
          rightIcon: getIcon(first.weather[0].icon)
        },
        {
          left: "wind",
          right: `${first.wind.speed}km`
        }
      ]
    },
    {
      title: "futur",
      items: []
    }
  ];

  Array.prototype.forEach.call(responseJson.list, value => {
    result[1].items.push({
      left: Utils.date.HHmm(value.dt_txt),
      right: `${value.main.temp}°C`,
      rightIcon: getIcon(first.weather[0].icon)
    });
  });

  return [result];
};

const find = (cityId, apiKey) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast/${cityId}?units=metric&id=${cityId}&APPID=${apiKey}`
    )
      .then(response => response.json())
      .then(responseJson => {
        resolve(format(responseJson));
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  format,
  find
};