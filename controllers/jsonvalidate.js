
app.controller('jsonValidate',($scope,$http) => {
	$scope.readJson = ()=> {
		$http.get('/readJson').then(function(respo){
			$scope.jsonData = respo.data;
		})
	}

	$scope.readJson();
});

