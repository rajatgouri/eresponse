var express = require('express');
var router = express.Router();
var placeratingHandler = require("../handler/placeratingHandler.js");

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/*post placerating */
router.post('/placerating', function (req, res, next) {
  placeratingHandler.placerating(req.body, (error, obj) => {
    if (error) {
      res.json(error);
    } else {
      res.json(obj);
    }
  });
});

/*post updatePlaceRating */
router.post('/Updateplacerating', function (req, res, next) {
  placeratingHandler.Updateplacerating(req.body, (error, obj) => {
    if (error) {
      res.json(error);
    } else {
      res.json(obj);
    }
  });
});

module.exports = router;