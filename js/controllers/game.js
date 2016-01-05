app.controller('gameCtrl',function($scope,$http)
{
    $scope.setGame = function(appid)
    {
        $http.get(api.steamDB+"/753w.json")   //appel api steam
        .success(function(r)
        {
            $scope.current = r.players[r.players.length-1];
            $scope.last = r.players[r.players.length-2];
        });
    }
    

    $http.get(api.steamSpy+"?request=top100in2weeks")
    .success(function(r)
    {
    	$scope.top100 = _.sortBy(r, 'players_2weeks').reverse();
    	console.log($scope.top100);
    });
    //Ici on récupère le nombre d'utilisateurs en ligne en live et on simule un changement en temps réèl (alors qu'en fait non mais les gens sont con ils verront rien mdr)
});