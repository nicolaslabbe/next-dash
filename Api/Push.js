const Libs = require("../Libs");

var express = require("express");
var router = express.Router();

router.get("/send", function(req, res) {

  Libs.push.send('bla bla bla')
    .then(function(success) { Libs.status.success(res, success)},
          function(error) { Libs.status.error(res, error)})
    .catch(function(error) { Libs.status.error(res, error)})
});

module.exports = router;
