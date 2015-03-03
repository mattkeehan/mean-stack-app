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

            Object.keys(users).forEach(function (key, value) {
                userData.push(users[key]);
                userLabels.push(key);
                usersLabelled.push({
                    label: key,
                    value: users[key]
                });
            });
            var data = userData;
            var x = d3.scale.linear()
                .domain([0, d3.max(userData)])
                .range([0, 420]);
            var width = 420,
                barHeight = 20;
            var x = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range([0, width]);
            var chart = d3.select(".chart")
                .attr("width", width)
                .attr("height", barHeight * data.length);
            var bar = chart.selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
            bar.append("rect")
                .attr("width", x)
                .attr("height", barHeight - 1);
            bar.append("text")
                .attr("x", function(d) { return x(d) - 3; })
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
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