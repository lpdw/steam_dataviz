app.controller('usersListCtrl',function($scope,$http)
{
    var listUsersId = [
        "76561198029591305",
        "76561198011689607",
        "76561197986394775",
        "76561198029580146",
        "76561198039347865",
        "76561198073967722"
    ];

    listUsersId = _.shuffle(listUsersId);   //shuffle the array
    console.log(listUsersId);

    var endRequestFriendsList;

    $scope.users = [];

    $scope.retreiveFriendsList = function(userId)
    {
        $http.get(api.steam+"/ISteamUser/GetFriendList/v0001/?key="+api.key+"&steamid="+userId+"&relationship=friend")
            .success(function(t)
            {
                for(var i = 0; i < t.friendslist.friends.length; i++){
                    if(listUsersId.indexOf(t.friendslist.friends[i].steamid) === -1){
                        listUsersId.push(t.friendslist.friends[i].steamid);
                        console.log(listUsersId.length);
                    }
                }
                $scope.loadUserProfil(listUsersId);
            });
    }

    for(var i = 0; i < listUsersId.length; i++){
        $scope.retreiveFriendsList(listUsersId[i]);
    }

    $scope.loadUserProfil = function(listUsersId){
        //console.log("load profil : " + listUsersId.length);
        if(listUsersId.length == 136){
            for(var i = 0; i < listUsersId.length; i++){
                $http.get(api.steam+"/ISteamUser/GetPlayerSummaries/v0002/?key="+api.key+"&steamids="+listUsersId[i])   //appel api steam
                    .success(function(r)
                    {
                        if($scope.users.indexOf(r.response.players[0]) === -1){
                            $scope.users.push(r.response.players[0]);
                            console.log(r.response.players[0]);
                        }
                    });
            }
        }
    }
});
