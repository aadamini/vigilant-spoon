var app = angular.module('app', ['googleplus']);


app.controller('MyLinkedinController', ['LinkedIn', function (LinkedIn) {
        
        
        this.linkedin ={};
            this.linkedin.id = "";
            this.linkedin.firstName = "";
            this.linkedin.lastName = "";
            this.linkedin.emailAddress = "";
            this.linkedin.profileUrl = "";
            
        if(window.localStorage.lprofile===undefined){
        console.log(this.linkedin);
        this.linkedin.info = "Aggiorna per visualizzare le informazioni dopo il login con linkedin";
        }else {
        this.linkedin = JSON.parse(window.localStorage.lprofile);
       console.log(this.linkedin);
        }    
       
                     
    this.login = function(){
        LinkedIn.User.authorize().params({"scope":["r_basicprofile", "r_emailaddress"]});
    };
    
     
}]);


app.controller('GooCtrl', ['$scope','GooglePlus', function ($scope, GooglePlus) {


       this.google ={};
            this.google.id = "";
            this.google.firstName = "";
            this.google.lastName = "";
            this.google.emailAddress = "";
            this.google.profileUrl = "";
       
//this.google = JSON.parse(window.localStorage.gprofile);
//       console.log(this.google);
     
        if(window.localStorage.gprofile===undefined){
        console.log(this.google);   
        this.google.info = "Aggiorna per visualizzare le informazioni dopo il login con google";
        }else{
        this.google = JSON.parse(window.localStorage.gprofile);
       console.log(this.google);
        }
        
        
        
        
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