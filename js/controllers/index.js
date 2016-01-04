app.controller('indexCtrl',function($scope,$http)
{
    $http.get(steamDbApiIndex+"/753w.json")   //appel api steam
    .success(function(r)
    {
        console.log(r.players);
        $scope.current = r.players[r.players.length-1];
        $scope.last = r.players[r.players.length-2];
        console.log($scope.last);
    });
    //Ici on récupère le nombre d'utilisateurs en ligne en live et on simule un changement en temps réèl (alors qu'en fait non mais les gens sont con ils verront rien mdr)
});