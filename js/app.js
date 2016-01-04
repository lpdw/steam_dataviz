var app = angular.module('dataviz', [
'ui.router'
    ]);

app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
  
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('user', {
      url: "/user/:tvId",
      templateUrl: "views/user.html",
      controller: "userCtrl"
    })
    .state('tvEpisode', {
      url: "/tv/:tvId/season/{seasonNumber:int}/episode/{episodeNumber:int}",
      templateUrl: "views/tv_episode.html",
      controller: "tvEpisodeCtrl"
    })
});

app.controller('mainCtrl', ['$scope', '$http','$rootScope', function($scope, $http,$rootScope)
{
	// controlleur principal
	// ici se trouvent les fnction et variables globales
}]);