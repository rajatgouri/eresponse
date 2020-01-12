var express = require('express');
var router = express.Router();
var userHandler = require("../handler/userHandler.js")

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/*Post add user. */
router.post('/addUser', function(req, res, next) {
  userHandler.addUser(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

/*Post login user. */
router.post('/login', function(req, res, next) {
  userHandler.login(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

/*Post Delete user. */
router.post('/deleteUser', function(req, res, next) {
  userHandler.deleteUser(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

/*Get UserList */
router.get('/userList', function(req, res, next) {
  userHandler.UserList(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

/*Post Update user. */
router.post('/updateUser', function(req, res, next) {
  userHandler.updateUser(req.body, (error, obj) => {
      if (error) {
        res.json(error);
      } else {
        res.json(obj);
      }
    });
});

module.exports = router;