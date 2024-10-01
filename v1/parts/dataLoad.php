<?php
	// Set Up Variables
		$message = "";
		$status = true;
		
	// Connect to Database
		require('dataConnect.php');
		$dbCon = databaseConnect();
		$table = "savedata";
		
	// Get POST Data
		$key = mysqli_real_escape_string($dbCon, $_POST['k']);
		
	// Validate Data
		if(strlen($key) != 10){
			$message = "Error: Invalid Key.";
			$status = false;
		}
		
	if($status){
		// Load Design
			$query = "SELECT scaleData FROM $table WHERE scaleKey = '$key' LIMIT 1";
			$query = mysqli_query($dbCon, $query);
			
		// Check for Error
			if(mysqli_error($dbCon)){
				$message = "Something went wrong with the server (Query Failed, Load Query). Please try again.";
				$status = false;
			}
		
		// Check for Result
			if($query->num_rows < 1){
				$message = "The entered Key did not match anything in the database. Please check your entry and try again. ";
				$status = false;
				
			} else {
				$message = json_encode(mysqli_fetch_assoc($query));
				$status = true;
			}
	}
		
	// Output
		if($status){
			// Output Design
				echo $message;
				
		} else {
			// Output Error
				$build = "<h1>Load Failed</h1>";
				echo $build."<p>".$message."</p>";
				
		}
?>