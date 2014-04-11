/*
 * project: Domain Hunter
 * programmer : Harikrishnan 
 * Date: 6 April 2014
 */

/*
 implements the OES API on a client by doing the following:
 - conforming to the expected syntax / semantics of the API on the OES platform
 - allowing the invocation of an arbitrary method in the API (e.g. getIssues, getActivities,addNote etc.)
 - handling the standard response from the API including network communication availability, low-level success/failure including authentication failures etc.
 - provides simple methods for adding arguments, adding authentication keys for different invocation scenarios


 */

ri.common.api = function(options) {

	var defaults = {
		apipath : ri.globals.apipath,
		sessionKey : ri.globals.sessionKey,
		usejsonp : ri.globals.usejsonp,
		httpmethod : ri.globals.httpmethod
	};
	//map options over defaults	
	var options = jQuery.extend(defaults, options);
	var user = "";
	var setArgs = new Object;
	var sessionKey = '';
	var onSuccess = 'have not built out';
	var onFailure = 'have not built out';
	var returneddatatype = 'json';
	var asynchronous = true;

	if (options.usejsonp) {
		returneddatatype = 'jsonp';
	}

	// things could fail at a few levels - these below handle succesful ajax calls (network), but some states where the server says "no"
	var handleResponse = function(fullresponse, callback) {
		callback(jQuery.parseJSON(fullresponse));
	};

	return {

		doHTTPRequest : function(path, methodArgs, callback) {

			//console.log(methodArgs);

			jQuery.ajax({
				type : options.httpmethod,
				url : path,
				cache : false,
				data : methodArgs,
				async : asynchronous,
				dataType : 'text',
				/*headers : {
					'Accept' : 'application/json',
					'Content-Type' : 'application/json'
				},*/
				success : function(data) {
					handleResponse(data, callback);
				},
				error : function() {
					alert("something went wrong");
				}
			});
		},
		//wraps the actual ajax call into a more convenient interface for API method calling
		runMethod : function(daargs, callback) {
			//console.log(options.apipath);
			var pathToUse = options.apipath + method;
			//if we've run setUser, let it be overridden by an explicit passing of the user arg
			if (user != '') {
				setArgs['user_id'] = user;
			}
			;
			if (options.sessionKey != '') {
				setArgs['sessionkey'] = sessionKey;
			}
			;
			// doHTTPRequest actually makes the call

			this.doHTTPRequest(pathToUse, setArgs, callback);
		},
		setUser : function(user_id) {
			user = user_id;
		},
		setMethod : function(daMethod) {
			method = daMethod;
		},
		addArgument : function(daName, daValue) {
			setArgs[daName] = daValue;
		},
		setSynchronous : function() {
			asynchronous = false;
		},
		setAsynchronous : function() {
			asynchronous = true;
		},
		setSessionKey : function(key) {
			options.sessionKey = key;
		},
		clearArguments : function() {
			setArgs = new Object;
		},
		clearSessionKey : function() {
			options.sessionKey = "";
		},
		setOnFailure : function(obj) {
			onFailure = obj;
		},
		setOnSuccess : function(obj) {
			onSuccess = obj;
		},
		setHTTPMethod : function(httpMethod) {
			options.httpmethod = httpMethod;
		},
		addArgumentCollection : function(daObj) {

			for (daKey in daObj) {
				this.addArgument(i, daObj[i]);
			}
		}
	};
};
