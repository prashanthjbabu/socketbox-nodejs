var mysql = require('mysql');
var MYSQL_USERNAME = 'root';
var MYSQL_PASSWORD = 'root';
 
var client = mysql.createConnection({
  host : 'localhost',
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
});
client.connect();
client.query('use socketbox');

exports.get_appsecret = function(apikey,callback) {
	console.log("inside dbstuff apikey ="+apikey);
  client.query("select secret from apps where apikey =?",[apikey], function(err, results, fields) {
    // callback function returns employees array
    callback(results);
   // console.log(err);
    //console.log(results[0].secret);
    //console.log(fields);
  });
}
