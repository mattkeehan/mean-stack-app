# mean-stack-app

## Install

``npm install``
Then set up a mongo connection in the .env file.

## Test

``mocha``

## Run
(start mongo daemon in windows:
``path\to\mongo\bin\mongod --dbpath path\to\mongodata``)

then..

``node main``

## Environment

Built using node 0.10.33 on Windows. Nothing like fs used so it should work anywhere.

## Notes

Demo of  MEAN stack. Backend code developed using simple TDD approach with Mocha, see tests directory. 

Business logic kept to backend.

Enables authentication and records attempts, then shows them to logged in  admin users via an Angular based call.

Developed on Windows, no fs etc used so it should work anywhere.


