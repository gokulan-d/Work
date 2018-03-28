app.controller('apiContrller',($scope,$http) => {
	$scope.getContacts = ()=> {
		$http.get('/contact-api').then(function(respo){
			console.log(respo.data);
		})
	}

	$scope.getContacts();
});