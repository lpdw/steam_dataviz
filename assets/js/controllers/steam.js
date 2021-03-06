app.controller('indexCtrl',function($scope,$http)
{
    $http.get(api.steamDB+"/753w.json")   //appel api steam
    .success(function(r)
    {
        $scope.Math = window.Math;
    	$scope.startPoint = r.start * 1000;
        $scope.chart = r.players;
        $scope.chart.current = r.players[r.players.length-1];
        $scope.chart.last = r.players[r.players.length-2];
        $scope.chart.display = $scope.chart.last;           // Displayed value
        $scope.chart.evolving = {};
        $scope.graph();

        setInterval(function(){
            $scope.fakeRealTime();

            var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
            $('#users').animateNumber(
              {
                number: $scope.chart.display,
                numberStep: comma_separator_number_step
              }
            );
            $('#increaseVal').animateNumber(
              {
                number: $scope.chart.evolving.val
              }
            );
            $('#decreaseVal').animateNumber(
              {
                number: -($scope.chart.evolving.val)
              }
            );

        },5000);      // instantiate graph animation

        setInterval(function(){
            $scope.checkTrueValue();
        },20000);
    });

    $http.get(api.steamSpy+"?request=top100in2weeks")
    .success(function(r)
    {
    	$scope.top100 = _.sortBy(r, 'players_2weeks').reverse();
    	$scope.topGames = $scope.top100.slice(0, 15);

    	for (var i = 0; i < $scope.topGames.length; i++)
    	{
    		retreiveCurrentPlayers(i);
            getTimePlayed(i);
    	}
    });

    function getTimePlayed(i){
                console.log($scope.topGames[i].average_forever);
                var playTimeYear = $scope.topGames[i].average_forever*$scope.topGames[i].players_forever/60/24/365;
                var playTimeMonth = (playTimeYear - parseInt(playTimeYear))*12;
                var playTimeDay = (playTimeMonth - parseInt(playTimeMonth))*30;
                $scope.topGames[i].timePlayedYear = parseInt(playTimeYear);
                $scope.topGames[i].timePlayedMonth = parseInt(playTimeMonth);
                $scope.topGames[i].timePlayedDay = parseInt(playTimeDay);
    }

    function retreiveCurrentPlayers(i)
    {
        $http.get(api.steamDB+"/"+$scope.topGames[i].appid+"w.json")
        .success(function(t)
        {
            //$scope.topGames = _.sortBy($scope.topGames, 'currentPlayers').reverse();
            $scope.topGames[i].currentPlayers = t.players[t.players.length-1];
        });
    }

    $scope.fakeRealTime = function()
    {
                                // first, we determine if the number of players is ascending or descending
        var ascending = true;
        var newValue;
        if($scope.chart.current <= $scope.chart.last)
        {
            ascending = false;
        }

                    // their is one chance on four that the value go in the invert sens
        var r = (5*60)/5;
        var d;
        if(ascending)
        {
            d = $scope.chart.current - $scope.chart.last;
        }
        else
        {
            d = $scope.chart.last - $scope.chart.current;
        }

        $scope.$apply(function () // auto refresh the scope
        {
            $scope.chart.evolving = {};
            $scope.chart.evolving.ascending = ascending;
            $scope.chart.evolving.val = d;

            var a;
            if(Math.round(d/r) <= 1000)
            {
                a = Math.round(d/r);
            }
            else
            {
                a = Math.floor(Math.random() * (900 - 200 +1)) + 200;       // prevent exponential augmentation
            }

            if(ascending)
            {
                $scope.chart.display += a;
            }
            else
            {
                $scope.chart.display -= a;
            }

            $scope.chart.evolving.val = a;
        });

    }

    $scope.checkTrueValue = function()
    {
        $http.get(api.steamDB+"/753w.json")   //appel api steam
        .success(function(r)
        {
            $scope.chart.current = r.players[r.players.length-1];
        });
    }

    console.log($scope.topGames);
    //Ici on récupère le nombre d'utilisateurs en ligne en live et on simule un changement en temps réèl

    //Graphs
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
                                 y = $scope.chart.display;
                             series.addPoint([x, y], true, true);
                         }, 5000);
                    }
                }
            },
            title: {
                text: 'Players on Steam these last days',
                style: {
                    color: '#FFF',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Players',
                    style: {
                        color: '#ddd',
                        fontSize: '16px'
                    }
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
                        Highcharts.dateFormat('%d-%m-%Y %H:%M:%S', this.x) + '<br/>' +
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
                name: 'Number of players logged on steam',
                data: $scope.chart,
                pointStart: $scope.startPoint,
                pointInterval: 600 * 1000
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
