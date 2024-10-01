<?php
	function databaseConnect(){
        // Connection Details
    		$lotrHost = "";
    		$lotrDB = "";

    		$lotrUser = "";
    		$lotrPass = "";

    	// Create Database Connection
    		$dbCon = mysqli_connect($lotrHost, $lotrUser, $lotrPass, $lotrDB);

			if(mysqli_connect_errno()){
				return false;
			} else {
				return $dbCon;
			}
	}
?>
