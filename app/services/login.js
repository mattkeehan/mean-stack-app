"use strict";

var auth = require("../libs/auth");
var mongoConnection = require("../util/connectMongo");

function _createSession (session, user) {
    session.username = user;
}

//todo: this might want a unit test
function _getCurrentUnixTimestamp () {
    return Math.floor(Date.now() / 1000);
}

function _logAuthAttempt (clientIp, action, username) {
    var db = mongoConnection.getDb();

    db.collection("authAttempts").save({
        IP: clientIp,
        Datetime: _getCurrentUnixTimestamp(),
        Action: action,
        Username: username
    }, function (err, saved) {
        if( err || !saved ) { console.log("Log in attempt was not saved"); }
        else { console.log("Log in attempt saved"); }
    });
}

function _getIp (req) {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress;
}

function login (req, res) {
    var user = req.body.username;

    if (!auth.login(user, req.body.password)) {
        _logAuthAttempt(_getIp(req), "AUTH_FAILURE", user);
        return res.status(401).json({"login": "failure"});
    }

    _createSession(req.session, user);
    _logAuthAttempt(_getIp(req), "AUTH_SUCCESS", user);
    res.json({"login":"success"});
}

function isLoggedIn(req, res) {
    if (req.session.username)
        return res.json({"user":req.session.username});

    res.json({"user":null});
}

function logout (req, res) {
    req.session.destroy();
    res.json({"logout":"success"});
}

module.exports = {
    login: login,
    isLoggedIn: isLoggedIn,
    logout: logout
}