app.controller('userCtrl',function($scope,$http,$stateParams)
{
    $scope.user;
    $scope.userId = "76561197960287930";    //Gabe Newell id by default
    if($stateParams.steamid)            //if id is defined
    {
        $scope.userId = $stateParams.steamid;
    }

    var friendProfil;
    var friendsOfFriend;

    $http.get(api.steam+"/ISteamUser/GetPlayerSummaries/v0002/?key="+api.key+"&steamids="+$scope.userId)   //appel api steam
    .success(function(r)
    {
        $scope.user = r.response.players[0];
        $scope.user.friends = [];
        $scope.retreiveFriendsList($scope.user.steamid);
        console.log($scope.user);
    });

    $scope.retreiveFriendsList = function(userId)
    {
            $http.get(api.steam+"/ISteamUser/GetFriendList/v0001/?key="+api.key+"&steamid="+userId+"&relationship=friend")
                .success(function(t)
                {
                        for(i = 0; i < t.friendslist.friends.length; i++){
                            $scope.getFriendProfil(t.friendslist.friends[i].steamid);
                        }
                });
    }

    $scope.getFriendProfil = function(friendId){
        $http.get(api.steam+"/ISteamUser/GetPlayerSummaries/v0002/?key="+api.key+"&steamids="+friendId)   //appel api steam
            .success(function(r)
            {
                friendProfil = r.response.players[0];
                friendProfil.friends = [];
                $scope.user.friends.push(friendProfil);
                console.log('firendID : '+friendId);
                $scope.getFriendsListOfFriends(friendId, friendProfil);
            });
    }

    $scope.getFriendsListOfFriends = function(userId, userProfil){
        console.log('UserId from friendId : '+userId);
        $http.get(api.steam+"/ISteamUser/GetFriendList/v0001/?key="+api.key+"&steamid="+userId+"&relationship=friend")
            .success(function(t)
            {
                console.log('repere -----');
                console.log(userProfil);
                for(i = 0; i < t.friendslist.friends.length; i++){
                    $scope.getFriendProfilOfFriends(t.friendslist.friends[i].steamid, userProfil);
                }
            });
    }

    $scope.getFriendProfilOfFriends = function(friendId, userProfil){
        $http.get(api.steam+"/ISteamUser/GetPlayerSummaries/v0002/?key="+api.key+"&steamids="+friendId)   //appel api steam
            .success(function(r)
            {
                friendsOfFriend = r.response.players[0];
                userProfil.friends.push(friendsOfFriend);
                console.log($scope.user);
            });
    }

});