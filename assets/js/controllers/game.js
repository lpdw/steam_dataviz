app.controller('gameCtrl',function($scope,$http,$stateParams)
{
    $scope.game;
    $scope.appid = "76561197960287930";    //Gabe Newell id by default
    if($stateParams.appid)            //if id is defined
    {
        $scope.appid = $stateParams.appid;
    }

    var friendProfil;
    var friendsOfFriend;

    $http.get(api.steamSpy+"?request=appdetails&appid="+$scope.appid)   //appel api steam
    .success(function(r)
    {
        console.log(api.steamSpy+"?request=appdetails&appid="+$scope.appid);
        $scope.game = r;
        console.log($scope.game);
    });
    //Ici on récupère le nombre d'utilisateurs en ligne en live et on simule un changement en temps réèl (alors qu'en fait non mais les gens sont con ils verront rien mdr)
});