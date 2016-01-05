app.controller('userCtrl',function($scope,$http,$stateParams,$location)
{;
    $http.get("")   //appel api steam
    .success(function(r)
    {
    	console.log(r);
        $scope.user = r.users[0];
    });

    // * check if edit request */
    var c = $location.search().edit;
    if(c != undefined)
    {
    	$http.get(apiIndex+"/me")
	    .success(function(r)
	    {
	    	var lId = r.me[0].id;
	        if(lId == $scope.user.id)
	        {
	        	$scope.userProfilView = "views/user/edit.html";
	        }
	    });
    }

    /* button tab active effect */
    $(document).on("click",".user-navbar .btn",function()
    {
        $(".user-navbar .btn").removeClass("active");
        $(this).addClass("active");
    });
});