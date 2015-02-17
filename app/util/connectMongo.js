"use strict";

var MongoClient = require("mongodb").MongoClient;
var _db;

//require'd modules are cached
function connect (callback) {
    MongoClient.connect(process.env.MONGODB, function (err, db) {
        _db = db;
        callback(err);
    });
}

function getDb() {
    return _db;
}

module.exports = {
    connect: connect,
    getDb: getDb
}