$(function(){
	var socket = io.connect(window.location.hostname);
	console.log(window.location.hostname);
	socket.on('status', function (data) {
	    $('#status').html(data.status);
	});

	data = {
		lat: '13',
		lon: '77',
		time: '7 March 2013',
		speed: '45',
		bus_id: '1',
	};

	$('#broadcast').click(function() {

		var busid = $("#bus_id").val();
		data.bus_id = busid;

		console.log("In Broadcast function");
		socket.emit('track-channel', data);
	})

	$('#reset').click(function() {
		console.log("in reset");
	    socket.emit('my other event', { number: i++ });
	});
	var i=0;

	socket.on('data-obtained', function (data) {

		var busid = $("#bus_id").val();
		data.bus_id = busid;

	    console.log(data);

	    if(data.bus_id == busid)
	    	$('#data').html(data.lat+ " "+data.lon);
	    else
	    	$('#data').html("doesnt match");
	});

	socket.on('news', function (data) {
	    console.log(data);
	    $('#status').html(data.hello);
	});
	socket.on('shove', function (data) {
	    console.log(data);
	    $('#shove').html(data.value);
	});
	socket.on('track-channel', function (data) {
	    console.log(data);
	    $('#my-channel').html(JSON.stringify(data,undefined,2));
	});

	$('#simulate').click(function() {
		var data = {
			name : "ali",
			email: "aliroks@gmail.com"
		}
		var pusher_data = {
			data: data,
			channel: "my-channel",
			event: "my-event"
		}
		console.log("in simulate");
		$.ajax({
			url: "/post/",
			method: "post",
			data: pusher_data,
			success: function(data) {
				console.log("AJAX Success "+data);
				$("#api").html(JSON.stringify(data,undefined,2));
			}
		});

	});
});
