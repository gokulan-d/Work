app.controller('apiContrller',($scope,$http) => {
	$scope.getContacts = ()=> {
		$scope.loader = true;
		$http.get('/get-contacts').then(function(respo){
			$scope.contact_data = respo.data;
			$scope.loader = false;
			console.log($scope.contact_data[1]);
		})
	}

	 $scope.getContacts();
});