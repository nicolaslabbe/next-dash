const express = require("express");
const compression = require("compression");
const next = require("next");
const api = require("./Api");
const crontasks = require("./crontasks");
const bodyParser = require("body-parser");
// const Raven = require("raven");

// Raven.config(
//   `https://${process.env.SENTRY_KEY}:${process.env
//     .SENTRY_SECRET}@sentry.io/${process.env.SENTRY_PROJECT_ID}`
// ).install();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

Object.keys(crontasks).map((cron, i) => {
  crontasks[cron].schedule();
});

app.prepare().then(() => {
  const server = express();

  // if (process.env.NODE_ENV === "production") {
  //   // server.use(Raven.requestHandler());

  //   // server.get("/error", function mainHandler(req, res) {
  //   //   throw new Error("Broke!");
  //   // });

  //   server.use(Raven.errorHandler());

  //   server.use(function onError(err, req, res, next) {
  //     res.statusCode = 500;
  //     res.end(res.sentry + "\n");
  //   });
  // }

  server.use(compression());
  server.use(express.static("./node_modules/material-design-icons/iconfont/"));
  server.use(express.static("./static/fonts/"));
  server.use(express.static("./static/scripts/"));
  server.use(express.static("./static/app/"));
  server.use(bodyParser.json());
  server.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  server.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    next();
  });

  server.use("/api", api);

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT_SERVER, err => {
    if (err) throw err;
    console.log(
      `> Ready on ${process.env.PROTOCOL}://${process.env.DOMAIN}:${process.env
        .PORT_SERVER}`
    );
  });
});
