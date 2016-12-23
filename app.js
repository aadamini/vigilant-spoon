var app = angular.module('app', ['googleplus']);

//app.controller('LinCtrl', ['LinkedIn', function (LinkedIn) {
//        
//   
//    this.socialData = {};
//    var callback = function (data) {
//        this.socialData = data;
//    };
//    this.login = function(){
//        LinkedIn.User.callback = callback;
//        //LinkedIn.User.authorize().params({"scope":["r_basicprofile", "r_emailaddress"]});
//        LinkedIn.User.authorize();
//        //console.log(id);
//    };
//}]);

app.controller('MyLinkedinController', ['LinkedIn', function (LinkedIn) {
        
        
        this.linkedin ={};
            this.linkedin.id = "";
            this.linkedin.firstName = "";
            this.linkedin.lastName = "";
            this.linkedin.emailAddress = "";
            this.linkedin.profileUrl = "";
            
        this.linkedin = JSON.parse(window.localStorage.lprofile);
       console.log(this.linkedin);
            
        
    this.login = function(){
        LinkedIn.User.authorize().params({"scope":["r_basicprofile", "r_emailaddress"]});
    };
    
     
}]);


app.controller('GooCtrl', ['$scope','GooglePlus', function ($scope, GooglePlus) {

this.google = JSON.parse(window.localStorage.gprofile);
       console.log(this.google);
       
    $scope.login = function () {

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
    };
}]);