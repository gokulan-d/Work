app.controller('apiContrller',($scope,$http,$filter) => {
	
	//Export Option

	$scope.filename = 'contact_array';

	// Pagination

	    $scope.currentPage = 0;
	    $scope.pageSize = 10;
	    $scope.search_tab = '';

	    $scope.getData = function () {
	      return $filter('filter')($scope.contact_data, $scope.search_tab)
	    }
    
    	$scope.numberOfPages=function(){
    		return Math.ceil($scope.getData().length/$scope.pageSize);
        }	

	$scope.loadContacts = ()=> {
		console.log('load-contacts');
		$scope.loader = true;
		$http.get('/contact-api').then(function(respo){
			$scope.loader = false;
			$scope.getContacts();
		})
	}

	$scope.getContacts = ()=> {
		console.log('get-contacts');
		$scope.loader = true;
		$http.get('/get-contacts').then(function(respo){
			$scope.contact_data = respo.data;
			$scope.loader = false;
			
		})
	}


	$scope.syncData = ()=> {
		console.log('start-sync');
		//$scope,loader = true;	
		$http.get('/drop-contact_api').then(function(response){
			var status = response.data;
			if(status){
				$scope.loadContacts();
			}
		})
	}
	
	$scope.getContacts();     
	// $scope.loadContacts();     
    	
});

//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});