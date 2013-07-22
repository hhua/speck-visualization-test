var authentication = require('./authentication');

function start(req, res){
	console.log("Request handlers '/start' was called. ");

	res.sendfile('./views/index.html');
}

function getBodyTrack(req, response){
	console.log("Request handlers '/getBodyTrack' was called. ");

	response.writeHead(200, {"Content-Type": "application/json"});
	var http = require('http');
	var url = 'http://flxtest.bodytrack.org/api/bodytrack/tiles/50/Speck_IRN_K.particles/8.10438.json';

	var user = {
		f_username : authentication.USERNAME,
		f_password : authentication.PASSWORD,
	}

	var data = require('querystring').stringify(user);

	var options = {
		hostname: 'flxtest.bodytrack.org',
		port: '80',
		path: '/signin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
        	'Content-Length': data.length
		}
	};


	var request = http.request(options, function(res){
		res.setEncoding('utf8');

		console.log(res);
		res.on('data', function(chunk){
			console.log('body: ' + chunk);
		})

		res.on('error', function(err){
			console.log('ERROR: ' + err);
		})

		res.on('end', function(err){
			if(err)
	      		console.log('ERROR: ' + err);
	      	
		})
	});

	http.get(url, function(res){
	    var body = '';
	    res.setEncoding('utf8');

	    res.on('data', function(chunk) {
	      body += chunk;
	    });

	    res.on('end', function(err) {
	      if(err)
	      	console.log('ERROR: ' + err);
	      console.log("Got response: " + body);
	      // var jsonResponse = JSON.parse(body);
	      // console.log("Got response: " + body);
	      // res.write(jsonResponse);
	      // res.end();
	    });
	});
}

exports.start = start;
exports.getBodyTrack = getBodyTrack;