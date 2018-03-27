var isJSON = require('is-valid-json');

module.exports = (function(){
	var _valid = {};

	_valid.registerValidation = function(req, callback){
		var error = {};
			console.log(req.body);
			console.log(Object.keys(req.body).length);
		
		if((Object.keys(req.body).length > 0 && req.body.constructor === Object) && (req.body.phone != undefined && req.body.phone != '')  &&  (req.body.username != undefined && req.body.username != '')){	
			
			if(req.body.username.length < 8){
				error.usernameLength = 'Username must be 8 characters length..';
			}

			if(req.body.phone.length <  9){
				error.phoneLenth = 'Phone number must be 10 characters..';
			} 
			var phNumbr = /^[0-9]+$/;
			if(!req.body.phone.match(phNumbr)){
				error.phoneNumeric = 'Phone number must be numeric';
			}

			
			if(req.body.password == undefined || req.body.password ==  ''){
				error.pwd = 'Please enter your password..';
			}

			var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
			
			if(!regex.test(req.body.password)){
				error.pwdValid = 'Password must be Minimum eight characters, at least one letter and one number:';
				error.confirmPwd = 'password & confirm password should be same..';
			}

			if(req.body.password != req.body.repassword){
				error.confirmPwd = 'password & confirm password should be same..';
			}
		}else{
			if(req.body.phone != '' && req.body.username != ''){
				error = {};
			}else{
				error.errormsg = 'Please fill the form data';
			}						
		}
		return callback(null, error);
	};

	_valid.objectValid = function(req, callback){
		if(isJSON(req)){
			return callback(null, true);
		}else{
			return callback(null, false);
		}		
	}

	return _valid;
})();