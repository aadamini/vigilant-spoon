var app = angular.module('app', ['googleplus']);

app.factory('soclog', ['GooglePlus', 'LinkedIn', function(GooglePlus, LinkedIn) {
    var linklog = function() {    
        LinkedIn.User.authorize().params({"scope":["r_basicprofile", "r_emailaddress"]}); 
    };


    var googlog = function() {
        GooglePlus.login().then(function (authResult) {

            GooglePlus.getUser().then(function (user) {

                this.google ={};
                this.google.id = user.id;
                this.google.firstName = user.given_name;
                this.google.lastName = user.family_name;
                this.google.emailAddress = user.email;
                this.google.profileUrl = user.link;


                var guser = {
                id: user.id,
                firstName: user.given_name,
                lastName: user.family_name,
                emailAddress: user.email,
                profileUrl: user.link
            };

           window.localStorage.gprofile = JSON.stringify(guser);

      
            });
        }, function (err) {
            console.log(err);
        });

        return this.google;
    };

    return {
      linklog: linklog,
      googlog: googlog
    };
}]);


app.controller('MainController', ["soclog", function (soclog) {

            this.linkedin ={};
                this.linkedin.id = "Ciao";
                this.linkedin.firstName = "";
                this.linkedin.lastName = "";
                this.linkedin.emailAddress = "";
                this.linkedin.profileUrl = "";

            this.google ={};
                this.google.id = "Ciao";
                this.google.firstName = "";
                this.google.lastName = "";
                this.google.emailAddress = "";
                this.google.profileUrl = "";


    this.loginlinkedin = function(){
        
        if(window.localStorage.lprofile===undefined){
        this.val1 = soclog.linklog();
        this.linkedin = JSON.parse(window.localStorage.lprofile);
        }else {
        this.linkedin = JSON.parse(window.localStorage.lprofile);
        }
        
       
     };


    this.logingoogle = function(){
       this.val2 = soclog.googlog();
            this.google = JSON.parse(window.localStorage.gprofile);
    };
    
    
}]);