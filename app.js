const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const http = require('http');
const https = require('https');

const indexRouter = require('./backend/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'backend/public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker ${worker.process.pid} died`);
	});
} else {
	// Workers can share any TCP connection
	// In this case it is an HTTP server
	if (app.get('env').toString().trim() === 'production') {
		app.set('port', process.env.PORT || 443);

		var options = {
			pfx: fs.readFileSync('./backend/star.nexon.com.pfx'),
			passphrase: 'Nexon!2019'
		};

		https.createServer(options, app).listen(app.get('port'), function() {
			console.log('Https server listening on port ' + app.get('port'));
		});
	} else {
		app.set('port', process.env.PORT || 80);

		http.createServer(app).listen(app.get('port'), function() {
			console.log('Https server listening on port ' + app.get('port'));
		});
	}

	console.log(`Worker ${process.pid} started`);
}

module.exports = app;
