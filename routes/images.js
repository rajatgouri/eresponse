var express = require('express');
var router = express.Router();
var imageHandler = require("../handler/imageHandler.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*Get uploadImages */
router.post('/uploadImages', function(req, res, next) {
    imageHandler.uploadImages(req, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

  /*Get deleteImages */
  router.post('/deleteImages', function(req, res, next) {
    imageHandler.deleteImages(req, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

  module.exports = router;