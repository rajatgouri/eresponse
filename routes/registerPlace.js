var express = require('express');
var router = express.Router();
var registerPlaceHandler = require("../handler/registerPlaceHandler.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');   
});

/*Post add Place. */
router.post('/addPlace', function(req, res, next) {
    registerPlaceHandler.addPlace(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });


  /*Post Delete Place. */
router.post('/deletePlace', function(req, res, next) {
    registerPlaceHandler.deletePlace(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

  /*Get PlaceList */
router.get('/PlaceList', function(req, res, next) {
    registerPlaceHandler.PlaceList(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

    /*Get PlaceInfo */
router.post('/PlaceInfo', function(req, res, next) {
  registerPlaceHandler.PlaceInfo(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

  /*Post Update Place. */
router.post('/updatePlace', function(req, res, next) {
    registerPlaceHandler.updatePlace(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

  router.post('/nearByPlace', function(req, res, next) {
    registerPlaceHandler.nearByPlace(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });
  
  module.exports = router;