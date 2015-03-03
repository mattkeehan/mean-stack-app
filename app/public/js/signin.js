"use strict";



angular.module("SignInApp", [])
    .controller("SignInController", function($scope, $http) {

        $scope.title = "Sign in";
        $scope.loggedIn = false;

        $scope.updateTableData = function (logins) {
            var users = {};
            var usersLabelled = [];
            var userData = [];
            var userLabels = [];

            logins.forEach(function (logIn) {
                if (users[logIn.Username])
                    users[logIn.Username]++;
                else
                    users[logIn.Username] = 1;
            });

            //console.log(logins);

            Object.keys(users).forEach(function (key, value) {
                userData.push(users[key]);
                userLabels.push(key);
                usersLabelled.push({
                    label: key,
                    value: users[key]
                });
            });

            console.log(userData);
            console.log(userLabels);

            var x = d3.scale.linear()
                .domain([0, d3.max(userData)])
                .range([0, 420]);

            d3.select(".chart")
                .selectAll("div")
                .data(userData)
                .enter().append("div")
                .style("width", function(d) { return x(d) + "px"; })
                .text(function(d) { return d; });

        }
        //expects an array
        $scope.getFeeds = function () {
            $http({
                method: "GET",
                url: "http://localhost:3000/getFeeds"
            }).success(function(data) {
                $scope.updateTableData(data.data);
                $scope.feed = data;
            });
        };

        $scope.logOutSuccess = function () {
            $scope.loggedIn = false;
            $scope.authError="";
            $scope.title = "Sign in";
            delete $scope.feed;
        };

        $scope.logInSuccess = function (user) {
            if (user) $scope.username = user;

            $scope.loggedIn = true;
            $scope.authError="";
            $scope.title = "Logged in";
            $scope.getFeeds();
        };

        $scope.logInFailure = function () {
            $scope.authError = "Failed to log in as " + $scope.username;
        };

        $scope.logOut = function () {
            $http({
                method: "POST",
                url: "http://localhost:3000/logout"
            }).success(function() {
                $scope.logOutSuccess();
            });
        };

        $scope.logIn = function () {
            $http({
                method: "POST",
                url: "http://localhost:3000/login",
                data: {
                    "username":$scope.username,
                    "password":$scope.password
                }
            }).success(function() {
                $scope.logInSuccess();
            }).error(function() {
                $scope.logInFailure();
            });
        };

        $scope.init = function () {
            $http({
                method: "GET",
                url: "http://localhost:3000/isAuthenticated"
            }).success(function(data) {
                if (data.user !== null)
                    $scope.logInSuccess(data.user);
            });
        };
    });