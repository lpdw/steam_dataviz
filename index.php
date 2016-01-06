<?php require 'steamauth/steamauth.php';?>

<!DOCTYPE html>
<html ng-app="dataviz">
<head>
	<title>Steam Dataviz</title>
	<meta charset="utf-8">
	<link href='https://fonts.googleapis.com/css?family=Roboto:400,100,400italic,100italic,500,500italic' rel='stylesheet' type='text/css'>

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
	<div class="sidebar">
		<a ui-sref="steam" class="logo">
			<img src="assets/img/logo.png" alt="Logo">
		</a>
		<nav>
			<ul>
				<li><a ui-sref="steam">Steam</a></li>
				<li><a ui-sref="game">Games</a></li>
				<li><a ui-sref="player">Players</a></li>
			</ul>
		</nav>
		<?php
		if(!isset($_SESSION['steamid'])) {

		    steamlogin(); //login button

		}
		else
		{

		    include ('steamauth/userInfo.php'); //To access the $steamprofile array
		    //Protected content
		    echo "<div class='user-profile' style='background: url(assets/img/profile.png)'>
				<div class='profile-content' style='background-color: {{randomColor}}'>
					<a href=''><span class='profile-btn'>Profile</span></a>
					<a href='steamauth/logout.php'><img src='assets/img/off.png' alt='Sign out'></a>
					<div class='user-names'>
						<p class='pseudo'>".$steamprofile['steamid']."</p>
						<p class='name'>John Doe</p>
					</div>
				</div>
			</div>";
		}
		?>

    </div>

    <div ng-controller="userCtrl" ng-init="userId: '<?php $steamprofile['steamid']; ?>'">
    	{{user.name}}
    </div>
    <a href="" class="menu-mobile"><img src="assets/img/menu-mobile.png" alt="Mobile Menu"></a>
    <div class="main-container">
    	<div ui-view></div>

    </div>
</body>
</html>
