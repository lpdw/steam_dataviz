app.controller('userCtrl',function($scope,$http)
{
    $scope.user;
    var friendProfil;
    var friendsOfFriend;

    $scope.$watch('userId', function () {
        $scope.setUser($scope.userId);
    });

    $scope.setUser = function(userId){
        $http.get(api.steam+"/ISteamUser/GetPlayerSummaries/v0002/?key="+api.key+"&steamids="+userId)   //appel api steam
            .success(function(r)
            {
                $scope.user = r.response.players[0];
                $scope.user.friends = [];
                $scope.retreiveFriendsList($scope.user.steamid);
            });
    }

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