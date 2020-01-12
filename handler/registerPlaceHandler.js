var mongoose = require('mongoose');
var registerPlaceSchema = require('../schema/registerPlaceSchema.js');
var output;


exports.addPlace = function addPlace(myObj, callback) {
    var _registerPlaceSchema = new registerPlaceSchema(myObj);
    _registerPlaceSchema.save(function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
        }
        else {
            output = { message: "Record Added", response_code: 200, error: false, placeid: result.id };
        }
        return callback(null, output);
    });
}

exports.updatePlace = function updatePlace(myObj, callback) {
    registerPlaceSchema.findOneAndUpdate({ _id: myObj.id }, myObj, { upsert: true }, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
        }
        else {
            output = { message: "Record Updated", response_code: 200, error: false };
        }
        return callback(null, output);
    });
}

exports.deletePlace = function deletePlace(myObj, callback) {
    registerPlaceSchema.findByIdAndRemove({ _id: myObj.id }, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
        }
        else {
            output = { message: "Record Deleted", response_code: 200, error: false };
        }
        return callback(null, output);
    });
}

exports.PlaceInfo = function PlaceInfo(myObj, callback) {
    registerPlaceSchema.aggregate([
        { "$match": { _id: mongoose.Types.ObjectId(myObj.placeid) } },
        {
            "$lookup": {
                "from": "placeRating",
                "localField": "_id",
                "foreignField": "placeid",
                "as": "place"
            },

        },
        {
            $unwind:
            {
                path: "$place",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            "$lookup": {
                "from": "images",
                "localField": "_id",
                "foreignField": "placeid",
                "as": "images"
            }
        },
        {
            $unwind:
            {
                path: "$images",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "name": 1,
                "loc": 1,
                "timings": 1,
                "phoneNumber": 1,
                "userId": 1,
                "address": 1,
                "category": 1,
                "services": 1,
                "place.ratings": { $ifNull: ["$place.ratings", null] },
                "images": { $ifNull: ["$images", null] },
            }
        }
    ], function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
        }
        else {
            output = { message: "Record found", response_code: 200, error: false, result: result };
        }
        return callback(null, output);
    });
}


exports.PlaceList = function PlaceList(myObj, callback) {
    registerPlaceSchema.find({}, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
        }
        else {
            output = { response_code: 200, error: false, result: result };
        }
        return callback(null, output);
    });

}

exports.nearByPlace = function nearByPlace(myObj, callback) {
    registerPlaceSchema.find(
        {
            loc:
            {
                "$geoWithin":
                {
                    "$center":
                        [[myObj.lat, myObj.long], 1]
                }
            },
            "$or": [
                { "services": { "$regex": myObj.name, "$options": "i" } },
                { "name": { "$regex": myObj.name, "$options": "i" } }
            ]
        }, function (err, result) {
            if (err) {
                output = { response_code: err.code, error: true, message: err.message };
            }
            else {
                output = { response_code: 200, error: false, result: result };
            }
            return callback(null, output);
        });
}