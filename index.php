<!DOCTYPE html>
<html ng-app="dataviz">
<head>

	<title>Steam Dataviz</title>
	<meta charset="utf-8">
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,400italic,100italic,500,500italic' rel='stylesheet' type='text/css'>
	<link href='assets/css/style.min.css' rel='stylesheet' type='text/css'>
	
	<style>
	<?php
	// loading all style
	foreach (glob("assets/css/*.css") as $filename)
	{
	    echo file_get_contents($filename);
	}
	?>
	</style>

	<!-- loading all prerequisite components -->
	<script src="assets/js/vendor/jquery.min.js"></script>
	<script src="assets/js/vendor/angular.min.js"></script>
	<script src="assets/js/vendor/underscore.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.min.js"></script> <!-- ui-router -->
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>

	<script>
	<?php

	// loading basic js
	foreach (glob("assets/js/*.js") as $filename)
	{
	    echo file_get_contents($filename);
	}

	// loading angular controllers
	foreach (glob("assets/js/controllers/*.js") as $filename)
	{
	    echo file_get_contents($filename);
	}
	?>
	</script>

</head>
<body ng-controller="mainCtrl">
	<div ui-view></div>
	<div class="sidebar" ng-include="'views/sidebar.html'">
    </div>
    <div class="main-container" ng-include="'views/steam.html'"></div>
</body>
</html>