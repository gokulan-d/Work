app.controller('regisCtrl',function($scope,$window,$http){
	$scope.errorMss = {};
	
	$scope.setEmpyt = function(key){
		if(key == undefined){
			key = '';
			return key;
		}else{
			return key;
		}
	}

	$scope.submitForm = function(){
		var form = {
			username 	: $scope.setEmpyt($scope.username),
			phone	 	: $scope.setEmpyt($scope.phone),
			password 	: $scope.setEmpyt($scope.password),
			repassword 	: $scope.setEmpyt($scope.repassword)
		};
		console.log(form);
		$http.post('/registerForm', form).then(function(response){
			console.log(response.data);
			if(response.data.errormsg != ''){
				$scope.errorMss = response.data;
				$scope.hideForm = true;
				if($scope.errorMss.confirmPwd != ''){
					$scope.hideconfirm = false;
				}
			}

			if(response.data.status == 0){
				$scope.hideForm = true;
				$scope.errorMss.errormsg = response.data.msg;
			}

			if(response.data.status == 1){
				$window.location.href="/";
			}
			
		})
	}
$scope.hidePhone = true;
$scope.hidePassword = true;
$scope.hideconfirm = true;

	$scope.validate = function(key){

		if(key == 'username'){
			if($scope.username.length > 7){
				$scope.errorMss.usernameLength = '';
			}else{
				$scope.errorMss.usernameLength = 'Username must be 8 characters length..';
			}
		}

		if(key == 'phone'){
			if(!isNaN($scope.phone)){
				$scope.hidePhone = true;				
			}else{
				$scope.hidePhone = false;				
			}	

			if($scope.phone.length > 9){
				$scope.errorMss.phoneLenth = '';
			}	else{
				$scope.errorMss.phoneLenth = 'Phone number must be 10 characters..';
			}	
		}

		if(key == 'password'){
			var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
			if(regex.test($scope.password)){
				$scope.hidePassword = true;	
				$scope.errorMss.pwdValid = '';
			}else{
				$scope.errorMss.pwdValid = 'Password must be Minimum eight characters, at least one letter and one number';
				$scope.hidePassword = false;
			}

			if($scope.password == $scope.repassword){
				$scope.hideconfirm = true;	
				$scope.errorMss.confirmPwd = ''
			}else{
				$scope.hideconfirm = false;
				$scope.errorMss.confirmPwd = 'password & confirm password should be same..';
			}
		}
		if(key == 'repassword'){
			if($scope.password == $scope.repassword){
				$scope.hideconfirm = true;	
				$scope.errorMss.confirmPwd = ''
			}else{
				$scope.hideconfirm = false;
				$scope.errorMss.confirmPwd = 'password & confirm password should be same..';
			}
		}

		if($scope.username.length > 7 && $scope.phone.length > 9 && $scope.hidePhone && $scope.hidePassword && $scope.hideconfirm){
			$scope.errorMss = {};
			$scope.hideForm = false;
		}
	}
})