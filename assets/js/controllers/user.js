app.controller('userCtrl',function($scope,$http,$stateParams)
{
    $scope.user = {};
    var totalAchievements = 0;
    var achievementsUnlocked = 0;
    $scope.userId = "76561197960287930";    //Gabe Newell id by default
    $scope.user.friendsCount = 0;
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
        $scope.retreiveGamesList($scope.userId);
        
    });


    $scope.retreiveGamesList = function(userId)
    {
        $http.get(api.steam+"/IPlayerService/GetOwnedGames/v0001/?key="+api.key+"&steamid="+userId+"&format=json")
        .success(function(r)
        {
            var trueGame = _.filter(r.response.games, function(g){ return g.playtime_forever > 0; });
            $scope.user.game_count = r.response.game_count;
            $scope.user.games = trueGame;
            for(i = 0; i < $scope.user.games.length; i++)
            {
                $scope.retreiveUserAchievements(userId,$scope.user.games[i].appid);
            }
        });
    }

    $scope.retreiveFriendsList = function(userId)
    {
            $http.get(api.steam+"/ISteamUser/GetFriendList/v0001/?key="+api.key+"&steamid="+userId+"&relationship=friend")
                .success(function(t)
                {
                    $scope.user.friendsCount = t.friendslist.friends.length;
                    for(i = 0; i < t.friendslist.friends.length; i++){
                        $scope.getFriendProfil(t.friendslist.friends[i].steamid);
                    }
                });
    }

    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
    }

    $scope.retreiveUserAchievements = function(userId,appId)
    {
        $http.get(api.steam+"/ISteamUserStats/GetPlayerAchievements/v0001/?appid="+appId+"&key="+api.key+"&steamid="+userId)   //appel api steam
        .success(function(r)
        {
            if($scope.user.games && r.playerstats)
            {
                if(r.playerstats.success)
                {
                    var trg = findWithAttr($scope.user.games, 'appid', appId);
                    $scope.user.games[trg].achievements = r.playerstats.achievements;
                    if(r.playerstats.achievements)
                    {
                        totalAchievements += r.playerstats.achievements.length;
                        var c = _.where(r.playerstats.achievements,{achieved : 1});
                        achievementsUnlocked += c.length;
                        console.log($scope.user);
                    }
                }
            }

            $scope.user.achievementsUnlocked = achievementsUnlocked;
            $scope.user.totalAchievements = totalAchievements;
            $scope.user.achievementPercent = Math.floor((achievementsUnlocked/totalAchievements)*100);
            
        });
    }

    $scope.getFriendProfil = function(friendId){
        $http.get(api.steam+"/ISteamUser/GetPlayerSummaries/v0002/?key="+api.key+"&steamids="+friendId)   //appel api steam
            .success(function(r)
            {
                friendProfil = r.response.players[0];
                friendProfil.friends = [];
                $scope.user.friends.push(friendProfil);
                console.log('charge les amis');
                //$scope.getFriendsListOfFriends(friendId, friendProfil);
            });
    }

    $scope.getFriendsListOfFriends = function(userId, userProfil){
        console.log('UserId from friendId : '+userId);
        $http.get(api.steam+"/ISteamUser/GetFriendList/v0001/?key="+api.key+"&steamid="+userId+"&relationship=friend")
            .success(function(t)
            {
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
        });
    }

});