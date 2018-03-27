app.controller('loginCtrl', function($scope,$http,$window){
	
	$scope.setEmpyt = function(key){
		if(key == undefined){
			key = '';
			return key;
		}else{
			return key;
		}
	}

	$scope.loginForm = function(){
		var obj = {
			username	: 	$scope.setEmpyt($scope.username),
			password	: 	$scope.setEmpyt($scope.password)
		}

		$http.post('/verify_me', obj).then(function(response){
			if(response.data.msg != ''){
				$scope.errorMss = response.data;
			}else{
				$window.location.href= response.data.redirectTo;
			}
		})
	}
})