var api = {
  "key": "F2E9B955820953141E75002BB8052703",
  "steamDB" : "https://ravenholm.steamdb.info",
  "steamDBGlobal" : "https://ravenholm.steamdb.info/ispywithmylittleeye",
  "steamSpy" : "proxy.php?url=http://steamspy.com/api.php",
  "steam" : "proxy.php?url=http://api.steampowered.com",
  "steamDL": "http://cdn.akamai.steamstatic.com/steam/publicstats/download_traffic_per_country.json",
}

var app = angular.module('dataviz', [
  "ui.router"
]);

app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/steam");
  //
  // Now set up the states
  $stateProvider
    .state('steam', {
      url: "/",
      templateUrl: "views/steam.html"
    })
    .state('player', {
      url: "/player/{{steamid:int}}",
      templateUrl: "views/player.html",
      controller: function($stateParams)
      {
	      $stateParams.steamid  //*** Exists! ***//
	  }
    })
    .state('game.list', {
      url: "/game",
      templateUrl: "views/games.html"
    })
    .state('game', {
      url: "/game/{{appid:int}}",
      templateUrl: "views/game.single.html",
      controller: function($stateParams)
      {
	      $stateParams.appid  //*** Exists! ***//
	  }
    });
});

app.controller('mainCtrl', ['$scope', function($scope)
{
	// controlleur principal
	// ici se trouvent les fnction et variables globales
}]);