const fetch = require("fetch-everywhere");
const Libs = require("../Libs");
const Utils = require("../Utils");

var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  Libs.status.success(res, "ok");
});

router.get("/:name?/:key?/:value?", function(req, res) {
  if (Libs.req.param(req, res, "name")) {
    if (req.params.key && req.params.value) {
      Libs.db
        .find(req.params.name, req.params.key, req.params.value)
        .then(
          data => Libs.status.success(res, data),
          error => Libs.status.success(res, [])
        )
        .catch(error => Libs.status.success(res, []));
    } else {
      Libs.db
        .all(req.params.name)
        .then(
          data => Libs.status.success(res, data),
          error => Libs.status.success(res, [])
        )
        .catch(error => Libs.status.success(res, []));
    }
  }
});

router.post("/:name?", function(req, res) {
  if (Libs.req.param(req, res, "name")) {
    if (
      req.body.duplicate &&
      req.body.duplicate.key &&
      req.body.duplicate.value
    ) {
      Libs.db
        .find(req.params.name, req.body.duplicate.key, req.body.duplicate.value)
        .then(
          data => {
            if (data.length > 0) {
              Libs.status.error(res, {error: "entry already exist"});
            } else {
              Libs.db
                .add(req.params.name, req.body.item)
                .then(
                  data => Libs.status.success(res, data),
                  error => Libs.status.error(res, error)
                )
                .catch(error => Libs.status.error(res, error));
            }
          },
          error =>
            Libs.db
              .add(req.params.name, req.body.item)
              .then(
                data => Libs.status.success(res, data),
                error => Libs.status.error(res, error)
              )
              .catch(error => Libs.status.error(res, error))
        );
    } else {
      Libs.db
        .add(req.params.name, req.body.item)
        .then(
          data => Libs.status.success(res, data),
          error => Libs.status.error(res, error)
        )
        .catch(error => Libs.status.error(res, error));
    }
  }
});

router.delete("/:name?/:key?/:value?", function(req, res) {
  if (Libs.req.param(req, res, "name")) {
    if (req.params.key && req.params.value) {
      Libs.db
        .remove(req.params.name, req.params.key, req.params.value)
        .then(
          data => Libs.status.success(res, data),
          error => Libs.status.error(res, error)
        )
        .catch(error => Libs.status.error(res, error));
    } else {
      Libs.db
        .removeAll(req.params.name)
        .then(
          data => Libs.status.success(res, data),
          error => Libs.status.error(res, error)
        )
        .catch(error => Libs.status.error(res, error));
    }
  }
});

module.exports = router;
