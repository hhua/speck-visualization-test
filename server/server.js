var express = require('express');
var http = require('http');

function start(route, handle){
	var MemStore = express.session.MemoryStore;

	var app = express();
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.cookieParser());  
    app.use(express.session({ secret: 'secret_key', store: MemStore({reapInterval: 60000 * 10})}));
    app.set('view engine', 'ejs');
	
	app.get('/' , function(req, res){
		route(handle, '/', req, res);
	});

	app.get('/getBodyTrack', function(req, res){
		route(handle, '/getBodyTrack', req, res);
	})

	app.use(express.static('./views'));
	app.use(express.static('./assets'));

	var port = process.env.PORT || 3000;
	app.listen(port);


	console.log('Listening on port ' + port);
}

exports.start = start;	


