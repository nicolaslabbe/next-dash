const express = require("express");
const compression = require("compression");
const next = require("next");
const api = require("./Api");
const crontasks = require("./crontasks");
const bodyParser = require("body-parser");
const https = require("https");
const http = require("http");
const fs = require("fs");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

Object.keys(crontasks).map((cron, i) => {
  crontasks[cron].schedule();
});

app.prepare().then(() => {
  const exp = express();
  exp.use(compression());
  exp.use(express.static("./node_modules/material-design-icons/iconfont/"));
  exp.use(express.static("./static/fonts/"));
  exp.use(express.static("./static/scripts/"));
  exp.use(express.static("./static/app/"));
  exp.use(bodyParser.json());
  exp.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  exp.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    next();
  });

  exp.use("/api", api);

  exp.get("*", (req, res) => {
    return handle(req, res);
  });

  var options;
  try {
    options = {
      key: fs.readFileSync("/etc/letsencrypt/live/example.com/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/example.com/cert.pem"),
      ca: fs.readFileSync("/etc/letsencrypt/live/example.com/chain.pem")
    };
  } catch (e) {
    options = {};
  }

  http.createServer(exp).listen(process.env.PORT, err => {
    if (err) throw err;
    console.log(`> Ready on https://${process.env.DOMAIN}:${process.env.PORT}`);
  });
  https.createServer(options, exp).listen(process.env.PORT_SSL, err => {
    if (err) throw err;
    console.log(
      `> Ready on http://${process.env.DOMAIN}:${process.env.PORT_SSL}`
    );
  });

  // exp.listen(process.env.PORT_SERVER, err => {
  //   if (err) throw err;
  //   console.log(`> Ready on ${process.env.PROTOCOL}://${process.env.DOMAIN_PUBLIC}:${process.env.PORT_SERVER}`);
  // });
});
