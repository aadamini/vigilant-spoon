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
   
    this.login = function(){
        LinkedIn.User.authorize().params({"scope":["r_basicprofile", "r_emailaddress"]});
    };
}]);


app.controller('GooCtrl', ['$scope', 'GooglePlus', function ($scope, GooglePlus) {
    $scope.login = function () {
        GooglePlus.login().then(function (authResult) {

            GooglePlus.getUser().then(function (user) {
                console.log(user);
                return user;
            });
        }, function (err) {
            console.log(err);
        });
    };
}]);