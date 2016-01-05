app.controller('indexCtrl',function($scope,$http)
{
    $http.get(api.steamDB+"/753w.json")   //appel api steam
    .success(function(r)
    {
    	$scope.chart = r.players;
        $scope.chart.current = r.players[r.players.length-1];
        $scope.chart.last = r.players[r.players.length-2];
    });

    $http.get(api.steamSpy+"?request=top100in2weeks")
    .success(function(r)
    {
    	$scope.top100 = _.sortBy(r, 'players_2weeks').reverse();
    	$scope.topGames = $scope.top100.slice(0, 15);

    	for (var i = 0; i < $scope.topGames.length; i++)
    	{
    		retreiveCurrentPlayers(i);	
    	}
    });
    function retreiveCurrentPlayers(i)
    {
        $http.get(api.steamDB+"/"+$scope.topGames[i].appid+"w.json")
            .success(function(t)
            {
                $scope.topGames[i].currentPlayers = t.players[t.players.length-1];
            });
    }

    console.log($scope.topGames);
    //Ici on récupère le nombre d'utilisateurs en ligne en live et on simule un changement en temps réèl (alors qu'en fait non mais les gens sont con ils verront rien mdr)
    
    $scope.graph = function () {
        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        // Load the fonts
        Highcharts.createElement('link', {
           href: '//fonts.googleapis.com/css?family=Unica+One',
           rel: 'stylesheet',
           type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

        $('#container').highcharts({
            chart: {
                backgroundColor: {
                 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                 stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                 ]
              },
              style: {
                 fontFamily: "'Unica One', sans-serif"
              },
              plotBorderColor: '#606063',
                type: 'areaspline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = $scope.current
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 1,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
           plotOptions: {
              areaspline: {
                fillOpacity: 0.5
            }
           },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: $scope.current
                        });
                    }
                    return data;
                }())
            }]
        });
    }
});