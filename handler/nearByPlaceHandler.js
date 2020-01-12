var mongoose = require('mongoose');
var nearByPlacesSchema = require('../schema/nearByPlacesSchema.js');
var output;

exports.nearByPlace = function nearByPlace(myObj, callback) {
    nearByPlacesSchema.find({

        loc:
        {
            "$geoWithin":
            {
                "$center":
                    [[myObj.lat, myObj.long],1]
            }
        }
    }, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
        }
        else {
            output = { response_code: 200, error: false, message: "within Range", result: result };
        }
        return callback(null, output);
    });
}