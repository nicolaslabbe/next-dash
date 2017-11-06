const path = require("path");

module.exports.isDev = process.env.NODE_ENV === "development" ? true : false;

module.exports.url = `${process.env.PROTOCOL}://${process.env.DOMAIN}:${process
  .env.PORT_PUBLIC}`;

module.exports.pathData = path.join(process.cwd(), "data");
