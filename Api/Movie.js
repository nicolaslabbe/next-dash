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
  return newResult;
};

const formatResultDetails = item => {
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
  };
  return newItem;
};

// router.get('/', function(req, res) {
// 	Libs.status.success(res, 'ok')
// });

router.get("/:page?", function(req, res) {
  fetch(
    `${baseUrl}movie/popular?api_key=${process.env.IMDB_API_KEY}&${getPage(
      req
    )}`
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
  fetch(`${baseUrl}movie/${req.params.id}?api_key=${process.env.IMDB_API_KEY}`)
    .then(response => response.json())
    .then(responseJson => {
      var result = formatResultDetails(responseJson);

      fetch(
        `${baseUrl}movie/${req.params.id}/videos?api_key=${process.env
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
    `${baseUrl}search/movie?api_key=${process.env.IMDB_API_KEY}&query=${req
      .params.query}&${getPage(req)}&include_adult=true`
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
