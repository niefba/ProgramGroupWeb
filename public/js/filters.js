'use strict';

/* Filters */

angular.module('app.filters', []).

	filter('translate', function() {

	    var messages = {
	   		"Home" : "Accueil",
	    }

	    return function(input, lang) {
	    	if (typeof(input) == 'object') {
	    		return input[lang];
	    	}
	      else if(messages[input]) return messages[input];
	      else return input;
	    }
  });

