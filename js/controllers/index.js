app.controller('indexCtrl',function($scope,$http)
{
    $http.get(api.steamDB+"/753w.json")   //appel api steam
    .success(function(r)
    {
        $scope.current = r.players[r.players.length-1];
        $scope.last = r.players[r.players.length-2];
    });

    $http.get(api.steamSpy+"?request=top100in2weeks")
    .success(function(r)
    {
    	$scope.top100 = _.sortBy(r, 'players_2weeks').reverse();
    	$scope.topGames = $scope.top100.slice(0, 15);

    	for (var i = 0; i < $scope.topGames.length; i++)
    	{
    		retreiveCurrentPlayers(i);	
    	};

    	function retreiveCurrentPlayers(i)
    	{
    		$http.get(api.steamDB+"/"+$scope.topGames[i].appid+"w.json")
    		.success(function(t)
    		{
    			$scope.topGames[i].currentPlayers = t.players[t.players.length-1];
    		});
    	}

    	console.log($scope.topGames);
    });
    //Ici on récupère le nombre d'utilisateurs en ligne en live et on simule un changement en temps réèl (alors qu'en fait non mais les gens sont con ils verront rien mdr)
});