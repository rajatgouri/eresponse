var express = require('express');
var router = express.Router();
var nearByPlaceHandler = require("../handler/nearByPlaceHandler.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*Get nearByPlace */
router.post('/nearByPlace', function(req, res, next) {
  nearByPlaceHandler.nearByPlace(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

  module.exports = router;