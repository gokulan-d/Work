var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = (function(){
	_dbObject = {};

	_dbObject.connection = function(req, callBack){
		MongoClient.connect(url,function(err, db){
			if(err){
				console.log('Mongo connection error is :' + err);
			}else{
				var dbo = db.db('testDatabase');
				console.log('Mongo Connected Successfully !!');
				
				dbo.createCollection('contacts_array');

				dbo.collection('contacts_array').insertMany(req, function(erros, result){
					if(!erros){
						console.log('Collection has been created');
						callBack(null, result);
					} else{
						console.log('Insert data to colleections error is :'+ erros);
					}
				})

			}
		})
	};




	_dbObject.getContacts = function(request, resp_back){
		MongoClient.connect(url,function(err, db){
			if(err){
				console.log('Mongo connection error is :' + err);
			}else{
				var dbo = db.db('testDatabase');

				dbo.collection('contacts_array').find({}).toArray(function(err, result){
					if(err){
						console.log('Error in data retrival is :' + err);
					}else{
						return resp_back(null, result);
						console.log(result);	
					}
				})
			}
		})
	}
	return _dbObject;
})()