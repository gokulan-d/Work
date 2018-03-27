	var express 	= 	require('express');
	var router 		= 	express.Router();
	var url 		= 	require('url'); 
	var bodyParser 	= 	require('body-parser');

	var fs 			= 	require('fs');
	var user 		= 	require('../lib/users');
	var auth 		= 	require('../lib/validation');
	var streams	= 	require('../lib/fileupload');


	var app = express();
	

	app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
	app.use(bodyParser.json({limit: '50mb'}));

router.get('/', function(req, res){
	res.sendFile(__basedir + '/template/dashboard.html');
});

router.get('/fileStream', function(req, res){		
	streams.fileread(req, function(err, response){
		res.setHeader('Content-Type', 'application/json');
	 	res.status(200);
		res.json(response.toString());
	})
});

router.get('/register', function(req, res){
	res.sendFile(__basedir + '/template/register.html');
});

router.get('/dashboard', function(req, res){
	res.sendFile(__basedir + '/template/dashboard.html');
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

module.exports = router;

	