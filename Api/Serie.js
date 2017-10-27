const moment = require("moment");
const imdb = require("imdb-api");
const Libs = require("../Libs");
const Utils = require("../Utils");

var express = require("express");
var router = express.Router();

const baseUrl = `https://api.themoviedb.org/3/`;
const getPage = req => {
  return req.params.page ? `page=${req.params.page}` : "";
};

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

// getAverage(item.vote_average)
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

const formatResult = result => {
  var newResult = result.map(item => {
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
  return newResult;
};

const formatResultDetails = item => {
  var newItem = {
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
        name: "Author",
        value:
          item.created_by &&
          item.created_by.map((v, i) => {
            return v.name;
          })
      },
      {
        name: "Details",
        value: [
          {
            name: "date",
            value: moment(item.first_air_date).format("DD MMMM YYYY")
          },
          {
            name: "status",
            value: item.status
          },
          {
            name: "type",
            value: item.type
          },
          {
            name: "runtime",
            value: `${moment
              .duration(item.episode_run_time, "minutes")
              .hours()}:${moment
              .duration(item.episode_run_time, "minutes")
              .minutes()}`
          },
          {
            name: "number_of_seasons",
            value: item.number_of_seasons
          },
          {
            name: "number_of_episodes",
            value: item.number_of_episodes
          },
          {
            name: "original language",
            value: item.original_language
          },
          {
            name: "original title",
            value: item.original_name
          }
        ]
      },
      {
        name: "networks",
        value:
          item.networks &&
          item.networks.map((v, i) => {
            return v.name;
          })
      },
      {
        name: "production_companies",
        value:
          item.production_companies &&
          item.production_companies.map((v, i) => {
            return v.name;
          })
      },
      {
        name: "country",
        value:
          item.production_countries &&
          item.production_countries.map((v, i) => {
            return v.name;
          })
      },
      {
        name: "genres",
        value:
          item.genres &&
          item.genres.map((v, i) => {
            return v.name;
          })
      },
      {
        name: "seasons",
        value:
          item.seasons &&
          item.seasons.map((v, i) => {
            return {
              name: `season ${v.season_number} (${v.air_date})`,
              value: `episodes ${v.episode_count}`
            };
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
  };
  return newItem;
};

router.get("/:page?", function(req, res) {
  fetch(
    `${baseUrl}tv/popular?api_key=${process.env.IMDB_API_KEY}&${getPage(req)}`
  )
    .then(response => response.json())
    .then(responseJson => {
      Libs.status.success(res, formatResult(responseJson.results));
    })
    .catch(error => {
      Libs.status.success(res, error);
    });
});

router.get("/find/:id", function(req, res) {
  var futurDate = moment().format("YYYY-MM-DD");
  fetch(`${baseUrl}tv/${req.params.id}?api_key=${process.env.IMDB_API_KEY}`)
    .then(response => response.json())
    .then(responseJson => {
      var result = formatResultDetails(responseJson);

      fetch(
        `${baseUrl}tv/${req.params.id}/videos?api_key=${process.env
          .IMDB_API_KEY}`
      )
        .then(response => response.json())
        .then(responseJson => {
          result.videos = responseJson.results;

          Libs.status.success(res, result);
        })
        .catch(error => {
          Libs.status.success(res, error);
        });
    })
    .catch(error => {
      Libs.status.success(res, error);
    });
});

router.get("/:query?/:page?", function(req, res) {
  fetch(
    `${baseUrl}search/tv?api_key=${process.env.IMDB_API_KEY}&query=${req.params
      .query}&${getPage(req)}&include_adult=true`
  )
    .then(response => response.json())
    .then(responseJson => {
      Libs.status.success(res, formatResult(responseJson.results));
    })
    .catch(error => {
      Libs.status.success(res, error);
    });
});

module.exports = router;
