app.controller('userCtrl',function($scope,$http)
{;
    $http.get(api.steam+"/ISteamUser/GetPlayerSummaries/v0002/?key="+api.key+"&steamids=76561197960435530")   //appel api steam
    .success(function(r)
    {
    	console.log(r);
    	console.log('test');
    });
});