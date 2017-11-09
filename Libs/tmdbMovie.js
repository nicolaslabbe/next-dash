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
    var results = {
      items: []
    };
    results.items = result.map(item => {
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
            value: item.vote_average
          },
          {
            name: "popularity",
            icon: "favorite_border",
            value: Math.round(item.popularity * 100) / 100
          },
          {
            name: "date",
            icon: "access_time",
            value: item.release_date
          }
        ]
      };
      return newItem;
    });
    return results;
  }catch(e) {
    return Utils.error.catch(e)
  }
};

const format = item => {
  try {
    var newItem = {
      detail: {
        id: item.id,
        date: item.release_date,
        title: item.title,
        tagline: item.tagline,
        description: item.overview,
        link: item.homepage,
        image: getPoster(item).sm,
        images: getPoster(item)
      },
      items: [{
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
            name: "Details",
            value: [
              {
                name: "date",
                value: moment(item.release_date).format("DD MMMM YYYY")
              },
              {
                name: "status",
                value: item.status
              },
              {
                name: "runtime",
                value: `${moment
                  .duration(item.runtime, "minutes")
                  .hours()}:${moment.duration(item.runtime, "minutes").minutes()}`
              },
              {
                name: "budget",
                value: Utils.devise.toDollars(`${item.budget}`)
              },
              {
                name: "revenue",
                value: Utils.devise.toDollars(`${item.revenue}`)
              },
              {
                name: "original language",
                value: item.original_language
              },
              {
                name: "original title",
                value: item.original_title
              },
              {
                name: "adult",
                value: item.adult
              }
            ]
          },
          {
            name: "companies",
            value: item.production_companies.map((v, i) => {
              return v.name;
            })
          },
          {
            name: "country",
            value: item.production_countries.map((v, i) => {
              return v.name;
            })
          },
          {
            name: "genres",
            value: item.genres.map((v, i) => {
              return v.name;
            })
          },
          {
            name: "popularity",
            value: [
              {
                name: "popularity",
                value: item.popularity
              },
              {
                name: "vote_average",
                value: item.vote_average
              },
              {
                name: "vote_count",
                value: item.vote_count
              }
            ]
          }
        ]
      }]
    };
    return newItem;
  }catch(e) {
    return Utils.error.catch(e)
  }
};

const popular = (apiKey, page) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}movie/popular?api_key=${apiKey}&${page}`)
      .then(response => response.json())
      .then(responseJson => {
        resolve(formats(responseJson.results));
      })
      .catch(error => {
        reject(error);
      });
  });
};

const findById = (apiKey, id) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}movie/${id}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        var result = format(responseJson);
        if (result.error) {
          return reject(result)
        }

        fetch(`${baseUrl}movie/${id}/videos?api_key=${apiKey}`)
          .then(response => response.json())
          .then(responseJson => {
            result.items[0].videos = responseJson.results;

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

const search = (apiKey, query, page) => {
  return new Promise((resolve, reject) => {
    fetch(
      `${baseUrl}search/movie?api_key=${apiKey}&query=${query}&${page}&include_adult=true`
    )
      .then(response => response.json())
      .then(responseJson => {
        var result = formats(responseJson.results)
        if (result.error) {
          return reject(result)
        }
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  popular,
  findById,
  search
};
