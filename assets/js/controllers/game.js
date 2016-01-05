app.controller('gameCtrl',function($scope,$http)
{
    $scope.game = {};
    $scope.setGame = function(appid)
    {
        $http.get(api.steamDB+"/"+appid+"w.json")   //appel api steam
        .success(function(r)
        {
            $scope.game = r;
        });
    }
    //Ici on récupère le nombre d'utilisateurs en ligne en live et on simule un changement en temps réèl (alors qu'en fait non mais les gens sont con ils verront rien mdr)
});