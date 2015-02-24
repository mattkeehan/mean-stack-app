// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
$( document ).ready( function() {

    var appViewModel = new function() {
        var self = this;

        this.loggedIn = ko.observable(false);
        this.title = ko.observable("Not logged in");
        this.username = ko.observable();
        this.password = ko.observable();
        
        this.logIn = function() {
            var data = {
                "username":this.username(),
                "password":this.password()
            };

            $.ajax({
                url: "http://localhost:3000/login",
                type: "post",
                data: ko.toJSON(data),
                contentType: "application/json",
                success: function(data){
                    self.logInSuccess();
                },
                error:function() {
                    self.logInFailure();
                }
            });
        };

        this.logInSuccess = function () {
            console.log("success");
            //console.log(user);
            self.loggedIn(true);
            self.authError="";
            self.title("Logged in");
            //self.username(user);
            //self.getFeeds();
        };

        this.logInFailure = function () {
            console.log("failure");
        };
    }

    ko.applyBindings(appViewModel, document.getElementById("htmlTop"));
});