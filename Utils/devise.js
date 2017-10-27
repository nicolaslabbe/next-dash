const moment = require("moment");

module.exports.toDollars = str =>
  `$${str
    .split("")
    .reverse()
    .join("")
    .match(/.{1,3}/g)
    .join(",")
    .split("")
    .reverse()
    .join("")}`;
