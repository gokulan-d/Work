var express = require('express');
var router 	= express.Router();

var mysql = require('mysql');


		var con =	mysql.createConnection({
					  host		: "localhost",
					  user		: "root",
					  password	: "root",
					  database	: "sample"
					});

	

module.exports = (function(){
	var self ={}; 
	self.authentication = function(req,cb){
		var authReport= {};
		
		var row = "SELECT * FROM sample.user_register WHERE name = '"+ req.body.username +"'";
		con.query(row,function(err,result){
			// con.end();
			console.log(result.length);
			if(err) {
				authReport.msg = err;
				return cb(null, authReport);
			}

			if(result.length > 0){
				if(req.body.password == result[0].password){
					authReport.msg = '';
					return cb(null, authReport);
				}else{
					authReport.msg = 'username & password mismatch';
					return cb(null, authReport);
				}
			}else{
				authReport.msg = 'No Data Found !!';
				return cb(null, authReport);
			}			
			
		})						
		
	};


	self.register = function(req,callback){	
	var report = {};	
		var sql = "INSERT INTO sample.user_register (name, phone, password) VALUES ('"+req.body.username+"', '"+req.body.phone+"','"+req.body.password+"')";

		var row = "SELECT * FROM sample.user_register WHERE name = '"+ req.body.username +"'";

		con.query(row, function(err, result){
			if(result.length > 0) {
				report.status = 0;
				report.msg = 'Username already in use !!';
				return callback(null, report);
			}else{
				con.query(sql, function(error, data){
					if(error) {
						console.log(error);
						return callback(error);
					}
					report.status = 1;
					report.msg = 'Registed Successfully';
					return callback(null,report);
				})
			}			
		});	
	}
	return self;
})();