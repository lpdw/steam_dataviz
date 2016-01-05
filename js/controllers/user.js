app.controller('userCtrl',function($scope,$http)
{;
    $http.get("")   //appel api steam
    .success(function(r)
    {
    	console.log(r);
        $scope.user = r;
    });
});