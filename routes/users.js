	var express 	= 	require('express');
	var router 		= 	express.Router();
	var url 		= 	require('url'); 
	var bodyParser 	= 	require('body-parser');
	var multer  	= 	require('multer');
	var fs 			= 	require('fs');
	var request		= 	require('request');





	var user 		= 	require('../lib/users');
	var auth 		= 	require('../lib/validation');
	var streams		= 	require('../lib/streamfile');
	var contacts	= 	require('../lib/recursive_callback');
	var mongo		= 	require('../lib/mongoconnection');


	var app = express();
	var upload = multer({ dest: './uploads/' })

	app.use(bodyParser.urlencoded({extended: true }));
	app.use(bodyParser.json());

		//    TEMPLATE ROUTE

router.get('/', function(req, res){
	res.sendFile(__basedir + '/template/dashboard.html');
});

router.get('/register', function(req, res){
	res.sendFile(__basedir + '/template/register.html');
});

router.get('/dashboard', function(req, res){
	res.sendFile(__basedir + '/template/dashboard.html');
});

router.get('/validatejson', function(req, res){
	res.sendFile(__basedir + '/template/validatejson.html');
});

router.get('/recursive', function(req, res){
	res.sendFile(__basedir + '/template/recursive.html');
});
	
		//    FUNCTION ROUTE
		
router.post('/fileStream', upload.single('file'), function (req, res, next) {
 	streams.fileread(req, function(err, response){
 		res.setHeader('Content-Type', 'application/json');
	  	res.status(200);
	 	res.json({data: response});
 	})
})

router.get('/readJson', function(req, res){		
	streams.jsonread(req, function(err, response){
		auth.objectValid(response, function(error, objecttype){			
			res.setHeader('Content-Type', 'application/json');
			res.status(200);
			if(objecttype){
				res.json({
					'is_valid' 		: 	objecttype,
					'object_file'	: 	response
				});
			}
		})
	})
});

router.post('/verify_me',function(req,resp){
	user.authentication(req, function(err, response){
		resp.setHeader('Content-Type', 'application/json');
		resp.status(200);
		if(err){
			resp.json({msg : null});
		}		
		resp.json({msg : response.msg , redirectTo : '/dashboard'});
	});
});

router.post('/registerForm',function(req,res){
	auth.registerValidation(req, function(err, response){
		if(Object.keys(response).length === 0 && response.constructor === Object){
			user.register(req,function(err,message){
				if(err){
					res.setHeader('Content-Type', 'application/json');
					res.status(200);
					res.json(err);
				}else{
					response = message;
					response.errormsg = '';
					res.setHeader('Content-Type', 'application/json');
					res.json(response);
				}				
			})	
		} else{
			res.setHeader('Content-Type', 'application/json');
			res.status(200).json(response);
		}
	})
});

router.get('/contact-api',function(req,resp){
	contacts.getcontacts( '', function(err, data){
		mongo.connection(data,function(error, dbstatus){
			if(!error){
				console.log('User - Mongo_connection error is: '+error);
			}
			resp.setHeader('Content-Type', 'application/json');
			resp.json(dbstatus);
		})
	})
})

router.get('/get-contacts',function(req,resp){
	mongo.getContacts('', function(err, results){
		if(!err){
			resp.setHeader('Content-Type', 'application/json');
			resp.json(results);
		}else{
			resp.setHeader('Content-Type', 'application/json');
			resp.json(err);
		}
	})
})

module.exports = router;

	