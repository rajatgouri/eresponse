var express = require('express');
var router = express.Router();
var categoryHandler = require("../handler/categoryHandler.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*Get categoryList */
router.get('/categoryList', function(req, res, next) {
    categoryHandler.categoryList(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

  module.exports = router;