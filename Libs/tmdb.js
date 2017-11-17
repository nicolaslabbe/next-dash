const moment = require("moment");
const Utils = require("../Utils");

const baseUrl = `https://api.themoviedb.org/3/`;

const find = (type, apiKey, id) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${type}/${id}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        try {
          var result = Utils.card.make(responseJson, true);
          Utils.video
            .get(baseUrl, type, apiKey, id)
            .then(videos => {
              result.videos = videos;

              resolve(result);
            })
            .catch(error => {
              reject(error);
            });
        } catch (e) {
          return Utils.error.catch(e);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const detail = (type, apiKey, id) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}${type}/${id}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        try {
          resolve(Utils.card.make(responseJson));
        } catch (e) {
          return reject(Utils.error.catch(e));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

const search = (type, apiKey, query, page) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${baseUrl}search/${type}?api_key=${apiKey}&query=${query}&${page}&include_adult=true`
    )
      .then(response => response.json())
      .then(responseJson => {
        try {
          var results = [];
          results = responseJson.results.map(item => {
            return Utils.card.make(item);
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
  find,
  detail,
  search
};
