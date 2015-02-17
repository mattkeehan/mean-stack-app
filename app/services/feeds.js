"use strict";

var mongoConnection = require("../util/connectMongo");

function _cleanData(items) {
    items.forEach (function (currentVal) {
        delete currentVal._id;
    });
}

function _sendAdminFeeds (res) {
    var db = mongoConnection.getDb();

    db.collection("authAttempts").find().toArray(function(err, items) {
        if (err) return res.json(err);

        _cleanData(items);

        res.json({
            "feed": "authorization attempts",
            "data": items
        });
    });
}

function getFeeds (req, res) {
    if (! req.session.username)
        return res.status(401).json ({"error":"not authenticated"});

    if (req.session.username === "admin")
        _sendAdminFeeds(res);
}

module.exports = {
  getFeeds: getFeeds};