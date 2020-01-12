var mongoose = require('mongoose');
var PlaceRatingSchema = require('../schema/PlaceRatingSchema.js');
var output;


exports.placerating = function placerating(myObj, callback){
    var _PlaceRatingSchema = new PlaceRatingSchema(myObj);
    _PlaceRatingSchema.save(function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = { message: "Record Added", response_code: 200, error: false};
        }
        return callback(null, output);  
    });
}

exports.Updateplacerating = function Updateplacerating(myObj, callback){
    PlaceRatingSchema.findOneAndUpdate({ placeid: myObj.placeid }, myObj, {upsert:true}, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = { message: "Record Updated", response_code: 200, error: false,result:result };
        }
        return callback(null, output);  
    });
}