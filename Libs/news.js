const moment = require("moment");
const Utils = require("../Utils");

const getPoster = item => {
  return {
    xsr: item.urlToImage,
    xs: item.urlToImage,
    sm: item.urlToImage,
    md: item.urlToImage,
    xl: item.urlToImage,
    xlr: item.urlToImage
  };
};

const format = result => {
  var newResult = result.map(item => {
    var newItem = {
      date: item.publishedAt,
      title: item.title,
      tagline: item.description,
      url: item.url,
      image: getPoster(item).sm,
      overview: [
        {
          name: "author",
          icon: "create",
          value: item.author
        }
      ]
    };
    return newItem;
  });
  return newResult;
};

const find = (source, sort, apiKey, page) => {
  return new Promise((resolve, reject) => {
    Utils.url
      .get(
        `https://newsapi.org/v1/articles?source=${source}&sortBy=${sort}&apiKey=${apiKey}`
      )
      .then(result => resolve(format(result)), error => reject(error));
  });
};

module.exports = {
  find
};
