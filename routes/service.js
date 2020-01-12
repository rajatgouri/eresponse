var express = require('express');
var router = express.Router();
var serviceHandler = require("../handler/serviceHandler.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*Get categoryList */
router.get('/serviceInfo', function(req, res, next) {
    serviceHandler.serviceInfo(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

  module.exports = router;