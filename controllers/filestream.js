app.controller('fileReadCtrl',($scope,$http,Upload) => {
	$scope.fileRead = function(files){
		Upload.upload({
          url: '/fileStream',
          file: files
        }).success(function(response){
        	$scope.readable = response.data;
        })
	}


	$scope.closeContnt = function(){
		$scope.readable = '';
	}
});
