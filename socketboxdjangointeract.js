exports.get_appsecret = function(apikey,callback) {
	console.log("inside get_appsecret apikey ="+apikey);
	var request = require("request");
	request({
	  uri: "http://socketbox.in/app/secret/",
	  method: "POST",
	  form: {
	    apikey: apikey,
	  }
	}, function(error, response, body) {
	  console.log("body = "+body);
	  console.log("response = "+response)
	  callback(body)
	});
}

exports.app_stats = function(apikey,secret,callback) {
	console.log("inside app_stats apikey ="+apikey);
	console.log("inside app_stats secret ="+secret);
	var request = require("request");
	request({
	  uri: "http://socketbox.in/app/stats/",
	  method: "POST",
	  form: {
	    apikey: apikey,
	    secret : secret,
	  }
	}, function(error, response, body) {
	  console.log("body = "+body);
	  console.log("response = "+response)
	  callback(body)
	});
}
