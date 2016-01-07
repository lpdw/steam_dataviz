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
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('steam', {
      url: "/",
      templateUrl: "views/steam.html"
    })
    .state('steam.login', {
      url: "/?login",
      templateUrl: "views/steam.html"
    })
    .state('player', {
      url: "/player",
      templateUrl: "views/players.html",
      controller: "userCtrl"
    })
    .state('playerSingle', {
      url: "/player/:steamid",
      templateUrl: "views/player.single.html",
      controller: "userCtrl"
    })
    .state('game', {
      url: "/game",
      templateUrl: "views/games.html",
      controller: "gameCtrl"
    })
    .state('gameSingle', {
      url: "/game/:appid",
      templateUrl: "views/game.single.html",
      controller: "gameCtrl"
    });
});

app.controller('mainCtrl', ['$scope', function($scope)
{
	// controlleur principal
	// ici se trouvent les fnction et variables globales

	colorChoice = Math.floor(Math.random()*6+1);

	switch(colorChoice) {
    case 1:
        $scope.randomColor = "rgba(230,19,19,0.6)";//red
        break;
    case 2:
        $scope.randomColor = "rgba(0,107,222,0.6)";//blue
        break;
    case 3:
        $scope.randomColor = "rgba(13,160,33,0.6)";//green
        break;
    case 4:
        $scope.randomColor = "rgba(160,28,183,0.6)";//purple
        break;
    case 5:
        $scope.randomColor = "rgba(224,133,16,0.6)";//orange
        break;
    case 6:
        $scope.randomColor = "rgba(2,29,234,0.6)";//night
        break;
  }

  $(".menu-mobile").click(function(){
    $(this).toggleClass("opened");
    if($(this).hasClass("opened")){
      $(".sidebar").animate({
        "left" : "0px",
      });
      $(".main-container").animate({
        "margin-left" : "175px",
      });
      $(this).animate({
        "left" : "195px",
      });
      $(this).children("img").attr("src", "assets/img/close.png");
    }else{
      $(".sidebar").animate({
        "left" : "-175px",
      });
      $(".main-container").animate({
        "margin-left" : "0px",
      });
      $(this).animate({
        "left" : "20px",
      });
      $(this).children("img").attr("src", "assets/img/menu-mobile.png");
    }
  });

}]);
