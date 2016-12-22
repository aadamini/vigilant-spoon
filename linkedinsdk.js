
app.provider('LinkedIn', [function () {

    // The LinkedIn SDK
    var _in = {};

    // Additional provided onLoad handlers
    var _onload = [];


    /**
     * When the LinkedIn SDK is loaded
     *
     * Unfortunately we are restricted to providing a function name
     * to the SDK onLoad option, so this function has to be on the
     * window scope.
     *
     * The SDK internally uses the global IN variable so we cannot
     * delete it entirely, but we will at least take a copy so that
     * we can pass it to our angular code as a service
     */

    window.onLinkedInSDKLoad = function (response) {

      // Make a copy of the LinkedIn SDK
      angular.extend(_in, IN);

      // Call onLoad handlers
      angular.forEach(_onload, function (handler) {

        handler(_in);
      });
    };


    /**
     * Configure the service
     */

    this.init = function (config) {
        
      // Create the script element
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//platform.linkedin.com/in.js';

      // Set configuration options on the sdk
      var attributes = [];

      if (config.apiKey) {

        attributes.push('api_key: ' + config.apiKey);
      }

      if (config.authorize) {

        attributes.push('authorize: ' + config.authorize);
      }

      if (config.lang) {

        attributes.push('lang: ' + config.lang);
      }

      if (config.onLoad) {

        if (angular.isFunction(config.onLoad)) {

          config.onLoad = [getProfileData];
        }

        if (!angular.isArray(config.onLoad)) {

          throw 'LinkedIn service expects function or array of functions for onLoad config option, ' + (typeof config.onLoad) + ' given.';
        }

        _onload = config.onLoad;
      }

      attributes.push('onLoad: onLinkedInSDKLoad');

      script.textContent = attributes.join("\n");

      // Add the script element to the document
      document.getElementsByTagName('head')[0].appendChild(script);
    };


    /**
     * Return the service
     */

    this.$get = function () {

      return _in;
    };
}]);

app.config(['LinkedInProvider', function(LinkedInProvider) {

  var onload = function (sdk) {
    var dump = function(resp){
          console.log(resp);
    };
    var profile = function(){
        IN.API.Raw("/people/~").result(dump).error(dump);};
        IN.Event.on(IN, "auth", profile);
  };
  LinkedInProvider.init({
    apiKey: '770a63q8fdjtwq',
    onLoad: onload,
    authorize: true,
    lang: 'en_US'
  });
}]);



    var getProfileData = function() { // Use the API call wrapper to request the member's basic profile data
        IN.API.Profile("me").fields("id,first-name,last-name,picture-urls::(original),public-profile-url,location:(name),email-address,headline,industry,\n\
positions:(id,title,summary,start-date,end-date,is-current,\n\
company:(id,name,type,size,industry,ticker)),\n\
educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes)").result(function (me) {
            //("id,firstName,lastName,picture-urls::(original),public-profile-url,location:(name),email-address"
            var profile = me.values[0];
            var id = profile.id;
            var firstName = profile.firstName;
            var lastName = profile.lastName;
            var emailAddress = profile.emailAddress;
            var profileUrl = profile.publicProfileUrl;
            var country = profile.location.name;
            console.log(profile);
        });
    };