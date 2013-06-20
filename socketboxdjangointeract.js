exports.get_appsecret = function(apikey,callback) {
	console.log("inside get_appsecret apikey ="+apikey);
	var request = require("request");
	request({
	  uri: "http://socketbox.pesseacm.org/socketbox/app/secret/",
	  method: "POST",
	  form: {
	    apikey: apikey,
	  }
	}, function(error, response, body) {
	  console.log("body="+body);
	  console.log("response="+response)
	  callback(body)
	});


}
