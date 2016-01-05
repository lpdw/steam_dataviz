<!DOCTYPE html>
<html ng-app="dataviz">
<head>

	<title>Steam Dataviz</title>
	<meta charset="utf-8">

	<style>
	<?php
	// loading all style
	foreach (glob("css/*.css") as $filename)
	{
	    echo file_get_contents($filename);
	}
	?>
	</style>

	<!-- loading all prerequisite components -->
	<script src="js/vendor/jquery.min.js"></script>
	<script src="js/vendor/angular.min.js"></script>
	<script src="js/vendor/underscore.min.js"></script>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>

	<script>
	<?php

	// loading basic js
	foreach (glob("js/*.js") as $filename)
	{
	    echo file_get_contents($filename);
	}

	// loading angular controllers
	foreach (glob("js/controllers/*.js") as $filename)
	{
	    echo file_get_contents($filename);
	}
	?>
	</script>

</head>
<body ng-controller="mainCtrl">
	<div ui-view></div>
	<div ng-controller="indexCtrl" ng-init="graph()">
		<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
	</div>
	<div ng-include="'views/sidebar.html'">
    </div>
</body>
</html>