app.controller('userCtrl',function($scope,$http)
{;
    $http.get(api.steam+"/ISteamUser/GetPlayerSummaries/v0002/?key="+api.key+"&steamids=76561197960435530")   //appel api steam
    .success(function(r)
    {
        $scope.user = r.response.players[0];
        retreiveFriendsList($scope.user.steamid);
    });

    function retreiveFriendsList(userId)
    {
        $http.get(api.steam+"/ISteamUser/GetFriendList/v0001/?key="+api.key+"&steamid="+userId+"&relationship=friend")
            .success(function(t)
            {
                $scope.userFriendsList = t.friendslist.friends;
            });
    }
});