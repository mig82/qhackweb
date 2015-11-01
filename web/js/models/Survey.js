"use strict";

angular.module('qhack').factory('Survey', ['Skill', function(Skill){

	function Survey(user, career, level, custMsg){

		this.user = user;
		this.career = career;
		this.level = level;
		this.custMsg = custMsg;
		
		this.status = {}

		this.etc = 0;

		this.skills = [];
		this.guests = [];

		this.guestsSummary = {};
		this.guestsTotals = {};

		this.status = Survey.STATUS_NEW;
	}

	//var STATUS_NEW	= {id: 01, desc: gettext('STATUS_NEW')};
	var STATUS_NEW	= {id: 0, desc: 'STATUS_NEW'};
	var STATUS_SENT	= {id: 1, desc: 'STATUS_SENT'};
	//Use angular.copy to prevent unwanted modifcations of these constants.
	Survey.STATUS_NEW = angular.copy(STATUS_NEW);
	Survey.STATUS_SENT = angular.copy(STATUS_SENT);

	Survey.prototype.calcEtc = function(){
		this.skills.forEach(function(skill){

			if(skill instanceof Skill && skill.etc && !isNaN(skill.etc)){
				this.etc += skill.etc;
			}
			
		});
	};

	Survey.prototype.addSkill = function(skill){
		//console.log("pushing %o into %o", skill, this.skills);
		
		if(skill instanceof Skill){
			//if(!this.skills){this.skills = new Array()}
			this.skills.push(skill);
			this.etc += skill.etc;
		}
		else{
			throw Error("Can't add object %o to Skills structure. It is not of type Skill", skill);
		}
		//console.log(_.pluck(this.skills, 'name'))
	}

	Survey.prototype.removeSkill = function(skill){
		var index = _.findIndex(this.skills, function(s){
			return s.id === skill.id;
		});
		if(index >= 0){
			this.skills.splice(index, 1);
			this.etc -= skill.etc;
		}
		console.log(_.pluck(this.skills, 'name'))
	};

	Survey.prototype.addGuest = function(guest){
		this.guests.push(guest);
		this.recalcGuestsSummary();
	};

	Survey.prototype.removeGuest = function(guest){
		this.guests = _.without(this.guests, guest);
		this.recalcGuestsSummary();
	};

	Survey.prototype.recalcGuestsSummary = function(){
		
		var l = this.guests.length;
		
		this.guestsTotals = {
			answered: 0,
			invited: l
		};

		this.guestsSummary = {}; //Reset it before recalculating.

		for (var i = 0; i < l; i++) {
			var guest = this.guests[i];
			var typeName = guest.type.name;
			
			var typeTotals = this.guestsSummary[typeName]; //{answered: 0, invited:0}
			if(typeTotals){
				typeTotals.invited++;
			}
			else{
				this.guestsSummary[typeName] = {
					answered: 0,
					invited: 1
				};
			}
		};
	};

	Survey.prototype.submit = function(){
		this.status = Survey.STATUS_SENT;
	}

	Survey.prototype.isSent = function(){
		return this.status.id === Survey.STATUS_SENT.id;
	};

	Survey.fromObj = function(obj){
		
		var survey = new Survey();

		for(var prop in obj){
			if(obj.hasOwnProperty(prop)){
				//console.log("%o:%o", prop, obj[prop]);
				survey[prop] = obj[prop];
			}
		}
	
		return survey;
	};

	return Survey;
}]);