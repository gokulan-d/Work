app.controller('fileReadCtrl',($scope,$http) => {
	$scope.fileRead = function(){
		$http.get('/fileStream').then(function(resp){
			$scope.readable = resp.data;
		})
	}

	$scope.fileRead();
});