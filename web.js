var express = require('express'),
		app = express(),
		routes = require('./routes'),
		http = require('http'),
		server = http.createServer(app),
		io = require('socket.io').listen(server),
		path = require('path');

// Configuration

app.configure(function() {
	app.set('port', 8000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Heroku won't actually allow us to use WebSockets
// so we have to setup polling instead.
// https://devcenter.heroku.com/articles/using-socket-io-with-node-js-on-heroku
// io.configure(function () {
//   io.set("transports", ["xhr-polling"]);
//   io.set("polling duration", 10);
// });

// Routes
server.listen(app.get('port'), function(){
	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});

//app.get('/', routes.index);
app.get('/',function(request,response){
response.end("SOCKEBOX SERVER");
});


app.post('/post/', function(request, response){
		//var db_helper = require("./dbstuff.js");
		var socketdjango=require("./socketboxdjangointeract.js");
		var data = request.body.data;
		var channel = request.body.channel;
		var event = request.body.event;
		var apikey=request.body.apikey;
		var secret=request.body.secret;
		socketdjango.get_appsecret(apikey,function(results) {
    			console.log("result length="+results.length);
			//check if apikey exists and secret is valid for that apikey..only then emit
  			if(results.length > 0) {
				channel=apikey+"-"+channel;
				//console.log("CHANNEL="+channel);
				//console.log("APIKEY="+apikey);
				//console.log("SECRET="+secret);
				console.log(results.secret)
				if(results.secret == secret )
				{
					io.sockets.emit(channel, { 
						channel: channel,
						event: event,
						data: data
					});

					response.end("DONE");
				}
				else
					response.end("VALID APIKEY BUT INCORRECT SECRET");
			}
			else
				response.end("INVALID APIKEY");
		});
});

var status = "All is well.";

io.sockets.on('connection', function (socket) {

	socket.emit('ack', { status: 'Connection Successfull'});
	console.log('user connected');
	
});
