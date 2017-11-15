const moment = require("moment");
const Utils = require("../Utils");

const baseUrl = `https://api.themoviedb.org/3/`;

const getPoster = item => {
  return {
    xsr: `http://image.tmdb.org/t/p/w92${item.poster_path}`,
    xs: `http://image.tmdb.org/t/p/w154${item.poster_path}`,
    sm: `http://image.tmdb.org/t/p/w185${item.poster_path}`,
    md: `http://image.tmdb.org/t/p/w342${item.poster_path}`,
    xl: `http://image.tmdb.org/t/p/w500${item.poster_path}`,
    xlr: `http://image.tmdb.org/t/p/w780${item.poster_path}`
  };
};

const getAverageIcon = count => {
  var res = "";
  if (count < 2) {
    return "sentiment_very_dissatisfied";
  } else if (count <= 4) {
    return "sentiment_dissatisfied";
  } else if (count <= 6) {
    return "sentiment_neutral";
  } else if (count <= 8) {
    return "sentiment_satisfied";
  } else if (count <= 10) {
    return "sentiment_very_satisfied";
  } else {
    return "sentiment_neutral";
  }
};

const formats = result => {
  try {
    var results = [];
    results = result.map(item => {
      var newItem = {
        id: item.id,
        date: item.release_date,
        title: item.title,
        tagline: item.tagline,
        image: getPoster(item).sm,
        overview: [
          {
            name: "vote",
            icon: getAverageIcon(item.vote_average),
            left: item.vote_average
          },
          {
            name: "popularity",
            icon: "favorite_border",
            left: Math.round(item.popularity * 100) / 100
          },
          {
            name: "date",
            icon: "access_time",
            left: moment(item.release_date).format("DD MMMM YYYY")
          }
        ]
      };
      return newItem;
    });
    return results;
  } catch (e) {
    return Utils.error.catch(e);
  }
};

const formatDetail = item => {
  try {
    var newItem = {
      id: item.id,
      date: item.release_date,
      title: item.title,
      tagline: item.tagline,
      description: item.overview,
      link: item.homepage,
      image: getPoster(item).sm,
      images: getPoster(item)
    };
    return newItem;
  } catch (e) {
    return Utils.error.catch(e);
  }
};

const format = item => {
  try {
    var newItem = {
      id: item.id,
      date: item.release_date,
      title: item.title,
      tagline: item.tagline,
      description: item.overview,
      link: item.homepage,
      image: getPoster(item).sm,
      images: getPoster(item),
      details: [
        {
          left: "Details",
          right: [
            {
              ...Utils.list.make(
                "date",
                null,
                moment(item.release_date).format("DD MMMM YYYY")
              )
            },
            { ...Utils.list.make("status", null, item.status) },
            {
              ...Utils.list.make(
                "runtime",
                null,
                `${moment
                  .duration(item.runtime, "minutes")
                  .hours()}:${moment
                  .duration(item.runtime, "minutes")
                  .minutes()}`
              )
            },
            {
              ...Utils.list.make(
                "budget",
                null,
                Utils.devise.toDollars(`${item.budget}`)
              )
            },
            {
              ...Utils.list.make(
                "revenue",
                null,
                Utils.devise.toDollars(`${item.revenue}`)
              )
            },
            {
              ...Utils.list.make(
                "original language",
                null,
                item.original_language
              )
            },
            { ...Utils.list.make("original title", null, item.original_title) },
            { ...Utils.list.make("adult", null, item.adult) }
          ]
        },
        {
          ...Utils.list.make(
            "companies",
            null,
            item.production_companies.map((v, i) => {
              return v.name;
            })
          )
        },
        {
          ...Utils.list.make(
            "country",
            null,
            item.production_countries.map((v, i) => {
              return v.name;
            })
          )
        },
        {
          ...Utils.list.make(
            "genres",
            null,
            item.genres.map((v, i) => {
              return v.name;
            })
          )
        },
        {
          ...Utils.list.make("popularity", null, [
            { ...Utils.list.make("popularity", null, item.popularity) },
            { ...Utils.list.make("vote_average", null, item.vote_average) },
            { ...Utils.list.make("vote_count", null, item.vote_count) }
          ])
        }
      ]
    };
    return newItem;
  } catch (e) {
    return Utils.error.catch(e);
  }
};

const video = (apiKey, id) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}movie/${id}/videos?api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson.results);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const find = (apiKey, id) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}movie/${id}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        var result = format(responseJson);
        if (result.error) {
          return reject(result);
        }

        video(apiKey, id)
          .then(videos => {
            result.videos = videos;

            resolve(result);
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const detail = (apiKey, id) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}movie/${id}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        var result = formatDetail(responseJson);
        if (result.error) {
          return reject(result);
        }
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const search = (apiKey, query, page) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${baseUrl}search/movie?api_key=${apiKey}&query=${query}&${page}&include_adult=true`
    )
      .then(response => response.json())
      .then(responseJson => {
        var result = formats(responseJson.results);
        if (result.error) {
          return reject(result);
        }
        resolve(result);
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
