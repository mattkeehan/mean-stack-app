"use strict";

require("dotenv").load();
var express = require("express");
var bodyParser = require("body-parser");
var expressSession = require("express-session");
var cookieParser = require("cookie-parser");
var loginService = require("./app/services/login");
var feedsService = require("./app/services/feeds");
var mongoConnection = require("./app/util/connectMongo");

mongoConnection.connect(function (err) {
    if (err) console.log(err);
});

var app = express();
var router = express.Router();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({secret:"somesecrettokenhere", saveUninitialized: true, resave: true}));

router.route("/login").post(function(req, res) {
    loginService.login(req, res);
});

router.route("/isAuthenticated").get(function(req, res) {
    loginService.isLoggedIn(req, res);
});

router.route("/logout").post(function (req, res) {
   loginService.logout(req, res);
});

router.route("/getFeeds").get(function (req, res) {
   feedsService.getFeeds(req, res);
});

app.use(router);
app.use(express.static(__dirname + "/app/public"));
app.listen(3000);
console.log("node started");