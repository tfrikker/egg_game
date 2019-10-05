var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//http://stackoverflow.com/questions/11001817/allow-cors-rest-request-to-a-express-node-js-application-on-heroku
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 5000);
