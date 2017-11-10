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
        title: item.name,
        tagline: item.overview,
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

const format = item => {
  try {
    var newItem = {
      detail: {
        id: item.id,
        date: item.release_date,
        title: item.name,
        tagline: item.overview,
        description: item.overview,
        link: item.homepage,
        image: getPoster(item).sm,
        images: getPoster(item),
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
      },
      items: [
        {
          id: item.id,
          date: item.release_date,
          title: item.name,
          tagline: item.overview,
          description: item.overview,
          link: item.homepage,
          image: getPoster(item).sm,
          images: getPoster(item),
          details: [
            {
              left: "Author",
              right:
                item.created_by &&
                item.created_by.map((v, i) => {
                  return v.name;
                })
            },
            {
              left: "Details",
              right: [
                {
                  left: "date",
                  right: moment(item.first_air_date).format("DD MMMM YYYY")
                },
                {
                  left: "status",
                  right: item.status
                },
                {
                  left: "type",
                  right: item.type
                },
                {
                  left: "runtime",
                  right: `${moment
                    .duration(item.episode_run_time, "minutes")
                    .hours()}:${moment
                    .duration(item.episode_run_time, "minutes")
                    .minutes()}`
                },
                {
                  left: "number_of_seasons",
                  right: item.number_of_seasons
                },
                {
                  left: "number_of_episodes",
                  right: item.number_of_episodes
                },
                {
                  left: "original language",
                  right: item.original_language
                },
                {
                  left: "original title",
                  right: item.original_name
                }
              ]
            },
            {
              left: "networks",
              right:
                item.networks &&
                item.networks.map((v, i) => {
                  return v.name;
                })
            },
            {
              left: "production_companies",
              right:
                item.production_companies &&
                item.production_companies.map((v, i) => {
                  return v.name;
                })
            },
            {
              left: "country",
              right:
                item.production_countries &&
                item.production_countries.map((v, i) => {
                  return v.name;
                })
            },
            {
              left: "genres",
              right:
                item.genres &&
                item.genres.map((v, i) => {
                  return v.name;
                })
            },
            {
              left: "seasons",
              right:
                item.seasons &&
                item.seasons.map((v, i) => {
                  return {
                    left: `season ${v.season_number} (${v.air_date})`,
                    right: `episodes ${v.episode_count}`
                  };
                })
            },
            {
              left: "popularity",
              right: [
                {
                  left: "popularity",
                  right: item.popularity
                },
                {
                  left: "vote_average",
                  right: item.vote_average
                },
                {
                  left: "vote_count",
                  right: item.vote_count
                }
              ]
            }
          ]
        }
      ]
    };
    return newItem;
  } catch (e) {
    return Utils.error.catch(e);
  }
};

const popular = (apiKey, page) => {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}tv/popular?api_key=${apiKey}&${page}`)
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
    fetch(`${baseUrl}tv/${id}?api_key=${apiKey}`)
      .then(response => response.json())
      .then(responseJson => {
        var result = format(responseJson);

        fetch(`${baseUrl}tv/${id}/videos?api_key=${apiKey}`)
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
      `${baseUrl}search/tv?api_key=${apiKey}&query=${query}&${page}&include_adult=true`
    )
      .then(response => response.json())
      .then(responseJson => {
        resolve(formats(responseJson.results));
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
