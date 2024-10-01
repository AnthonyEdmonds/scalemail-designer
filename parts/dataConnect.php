<?php
	// Connection Details
		$lotrHost = "";
		$lotrDB = "";
		
		$lotrUser = "";
		$lotrPass = "";
		
	// Create Database Connection
		$dbConnection = mysqli_connect($lotrHost, $lotrUser, $lotrPass, $lotrDB);
		
	// Check Connection
		if(mysqli_connect_errno()){
			die("Lair of the Raven cannot be reached right now. Please try again later!");
		}
