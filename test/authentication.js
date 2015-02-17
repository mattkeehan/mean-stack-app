"use strict";

var assert = require("assert");
var auth = require("../app/libs/auth");

var goodUsernames = ["user", "manager", "admin", "developer", "tester"];
var goodPassword = "password";
var badUsernames = ["fred", "uuser", "userr"];
var badPassword = "Mumbojumbo";


describe("Logging in", function(){
    describe("Auth module", function(){
        
        it ("should have a login method", function(){
            assert.equal(typeof auth.login, "function");
        });
        
        it ("should have a log out method", function () {
            assert.equal(typeof auth.logout, "function");
        });
        
        it ("should authenticate all good users with  good password", function () {
            goodUsernames.forEach (function (user) {
                console.log("testing '" + user + "' with '" + goodPassword + "'");
                assert.equal(auth.login(user, goodPassword), true);
            });
        });
        
        it ("should accept good users in different case with good password", function () {
            var userUpperCase;
            goodUsernames.forEach (function (user) {
                userUpperCase = user.toUpperCase();
                console.log("testing '" + userUpperCase + "' with '" + goodPassword + "'");
                assert.equal(auth.login(userUpperCase, goodPassword), true);
            });
        });

        it ("should reject good users with good password in different case", function () {
            var goodPasswordUpper = goodPassword.toUpperCase();
            goodUsernames.forEach (function (user) {
                console.log("testing '" + user + "' with '" + goodPasswordUpper + "'");
                assert.notEqual(auth.login(user, goodPasswordUpper), true);
            });
        });

        it ("should reject good users with bad passwords", function () {
            goodUsernames.forEach (function (user) {
                console.log("testing '" + user + "' with '" + badPassword + "'");
                assert.notEqual(auth.login(user, badPassword), true);
            });
        });

        it ("should reject bad users with good password", function () {
            badUsernames.forEach (function (badUsername) {
                console.log("testing '" + badUsername + "' with '" + goodPassword + "'");
                assert.notEqual(auth.login(badUsername, goodPassword), true);
            });
        });

        it ("should reject bad users with bad password", function () {
            badUsernames.forEach (function (badUsername) {
                console.log("testing '" + badUsername + "' with '" + badPassword + "'");
                assert.notEqual(auth.login(badUsername, badPassword), true);
            });
        });
    });
});