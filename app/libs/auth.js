"use strict";

var goodPassword = "password";
var goodUsernames = ["user", "manager", "admin", "developer", "tester"];

function login (username, password) {
	if (password !== goodPassword) return false;
	if (goodUsernames.indexOf(username.toLowerCase()) > -1) return true;

	return false;
}

function logout (userId) {
	return false;
}

module.exports = {
	login: login,
	logout: logout
};