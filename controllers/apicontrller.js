app.controller('apiContrller',($scope,$http,$filter) => {
	

	// Pagination

	    $scope.currentPage = 0;
	    $scope.pageSize = 10;
	    $scope.search_tab = '';

	    $scope.getData = function () {
	      return $filter('filter')($scope.contact_data, $scope.search_tab)
	    }
    
    	$scope.numberOfPages=function(){
    		console.log($scope.getData());
        	return Math.ceil($scope.getData().length/$scope.pageSize);
        }	

	$scope.loadContacts = ()=> {
		$scope.loader = true;
		$http.get('/contact-api').then(function(respo){
			$scope.loader = false;
		})
	}

	$scope.getContacts = ()=> {
		$scope.loader = true;
		$http.get('/get-contacts').then(function(respo){
			$scope.contact_data = respo.data;
			$scope.loader = false;
			
		})
	}

	$scope.getContacts();
                
    	
});

//let's make a startFrom filter
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});