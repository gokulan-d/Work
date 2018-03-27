var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');


var router = express.Router();
var app = express();

	//ROUTE CONFIGURATIONS
var navigate = require('./routes/users.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/files', express.static(path.join(__dirname, 'assets')));
app.use('/controllers', express.static(path.join(__dirname, 'controllers')));

	// BASE DIRECTORT NAME
global.__basedir = __dirname;

app.use('/', navigate);

app.listen(8080, function(err,res){
	if(err){
		console.log(err);
	}
	console.log('Server Created 8080');
});