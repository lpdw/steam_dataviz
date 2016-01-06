app.controller('indexCtrl',function($scope,$http)
{
    $http.get(api.steamDB+"/753w.json")   //appel api steam
    .success(function(r)
    {
    	$scope.startPoint = r.start * 1000;
        $scope.chart = r.players;
        $scope.chart.current = r.players[r.players.length-1];
        $scope.chart.last = r.players[r.players.length-2];
        $scope.chart.display = $scope.chart.last;           // Displayed value
        $scope.graph();

        setInterval(function(){
            $scope.fakeRealTime();
        },2000);      // instantiate graph animation
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

    $scope.fakeRealTime = function()
    {
                                // first, we determine if the number of players is ascending or descending
        var ascending = true;
        var randValue;
        if($scope.chart.current <= $scope.chart.last)
        {
            ascending = false;
        }

                    // their is one chance on four that the value go in the invert sens
        var c = Math.floor(Math.random() * (10  - 1 + 1)) + 1;
        if(c == 10)
        {
            ascending = !ascending; //inverse the boolean
        }


        if(ascending)
        {
            randValue = Math.floor(Math.random() * ($scope.chart.current - $scope.chart.display) + $scope.chart.display);
        }
        else
        {
            randValue = Math.floor(Math.random() * ($scope.chart.current + $scope.chart.display) + $scope.chart.display);
        }
        
        $scope.chart.display = randValue;

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

        $('#graph').highcharts({
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
                                 y = r.players.length+1;
                             series.addPoint([x, y], true, true);
                         }, 5000);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
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
                data: $scope.chart,
                pointStart: $scope.chart.last,
                pointInterval: 600
                // (function () {
                //     // generate an array of random data
                //     var data = [],
                //         time = (new Date()).getTime(),
                //         i;

                //     for (i = 0; i <= $scope.chart.length; i++) {
                //         console.log()
                //         data.push({
                //             x: time,
                //             y: $scope.chart[i]
                //         });
                //     }
                //     return data;
                // }())
            }]
        });
    }
});