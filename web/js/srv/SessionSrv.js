"use strict";
//angular.module('qhack').factory('SessionSrv', ['$q', 'RestCliSrv', function($q, RestCliSrv){
angular.module('qhack').factory('SessionSrv', [ '$cookies', 'Survey', function($cookies, Survey){
	
	var _user; //Object
	var _survey = Survey.fromObj($cookies.getObject('survey')); //Survey
	console.log("    Initialized _survey from cookie: %o", _survey);

	return {

		setUser: function(user){
			_user = user;
		},

		getUser: function(){
			return _user;
		},

		setSurvey: function(survey){
			_survey = survey;
			$cookies.putObject('survey', _survey);
		},

		getSurvey: function(){
			console.log("getSurvey: %o", _survey);
			return _survey;
		},

		/*_getUser: function(){

			if(!_user){
				console.log("2) SessionSrv _user is undefined, will GET it from server");
				return RestCliSrv.getUser().then(function(user){
					_user = user;
					console.log("3) Session attached to _user %o", _user);
					return _user;
				});
			}
			else{
				console.log("2) SessionSrv _user is already defined");
				return $q.when(_user);
			}
		},

		getUserByUserPassword: function(userId, password){
			if(!_user){
				//console.log("SessionSrv _user is undefined");
				return RestCliSrv.getUserByUserPassword().then(function(user){
					_user = user;
					return _user;
				});
			}
			else{
				//console.log("SessionSrv _user is already defined");
				return $q.when(_user);
			}
		},*/
		
		
	};
}]);