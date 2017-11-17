const moment = require("moment");

const devise = require("./devise");
const image = require("./image");
const list = require("./list");

module.exports.make = (item, detail) => {
  var posters = image.poster(item);

  var result = {
    id: item.id,
    date: item.release_date,
    title: item.title || item.name,
    tagline: item.tagline || item.overview,
    description: item.overview,
    link: item.homepage,
    image: posters.sm,
    images: posters,
    overview: [
      {
        name: "vote",
        icon: image.averageIcon(item.vote_average),
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

  if (detail) {
    const release_date = list.make(
      "date",
      null,
      moment(item.release_date).format("DD MMMM YYYY")
    );
    const status = list.make("status", null, item.status);
    const runtime = list.make(
      "runtime",
      null,
      `${moment.duration(item.runtime, "minutes").hours()}:${moment
        .duration(item.runtime, "minutes")
        .minutes()}`
    );
    const budget = list.make(
      "budget",
      null,
      devise.toDollars(`${item.budget}`)
    );
    const revenue = list.make(
      "revenue",
      null,
      devise.toDollars(`${item.revenue}`)
    );
    const number_of_seasons = list.make(
      "number_of_seasons",
      null,
      item.number_of_seasons
    );
    const number_of_episodes = list.make(
      "number_of_episodes",
      null,
      item.number_of_episodes
    );
    const original_language = list.make(
      "original language",
      null,
      item.original_language
    );
    const original_title = list.make(
      "original title",
      null,
      item.original_title || item.original_name
    );
    const adult = list.make("adult", null, item.adult);
    const companies = list.make(
      "companies",
      null,
      item.production_companies &&
        item.production_companies.map((v, i) => {
          return v.name;
        })
    );
    const countries = list.make(
      "countries",
      null,
      item.production_countries &&
        item.production_countries.map((v, i) => {
          return v.name;
        })
    );
    const genres = list.make(
      "genres",
      null,
      item.genres &&
        item.genres.map((v, i) => {
          return v.name;
        })
    );
    const seasons = list.make(
      "seasons",
      null,
      item.seasons &&
        item.seasons.map((v, i) => {
          return {
            left: `season ${v.season_number} (${v.air_date})`,
            right: `episodes ${v.episode_count}`
          };
        })
    );
    const popularity = list.make("popularity", null, [
      { ...list.make("popularity", null, item.popularity) },
      { ...list.make("vote_average", null, item.vote_average) },
      { ...list.make("vote_count", null, item.vote_count) }
    ]);

    result.details = [
      {
        left: "Details",
        right: [
          release_date,
          status,
          runtime,
          budget,
          revenue,
          number_of_seasons,
          number_of_episodes,
          original_language,
          original_title,
          adult
        ]
      },
      companies,
      countries,
      genres,
      seasons,
      popularity
    ];
  }
  return result;
};
