<?php
	// Set Up Variables
		$message = "";
		$status = true;
		
	// Connect to Database
		require('dataConnect.php');
		$dbCon = databaseConnect();
		$table = "savedata";
		
	// Get POST Data
		$mode = mysqli_real_escape_string($dbCon, $_POST['m']);
		$key = mysqli_real_escape_string($dbCon, $_POST['k']);
		$title = mysqli_real_escape_string($dbCon, $_POST['t']);
		$password = mysqli_real_escape_string($dbCon, $_POST['p']);
		$data = mysqli_real_escape_string($dbCon, $_POST['d']);
		
	// Validate Data
		if(!$data){
			$message = "Error: Invalid Data.";
			$status = false;
		}
		
		if($mode != 0 && $mode != 1){
			$message = "Error: Invalid Mode.";
			$status = false;
		}
		
		if(!$password || strlen($password) != 128){
			$message = "Error: Invalid Password.";
			$status = false;
		}
		
		if(strlen($key) > 10){
			$message = "Error: Invalid Key.";
			$status = false;
		}
		
		if(strlen($title) > 60){
			$messagebuild = "Error: Invalid Title.";
			$status = false;
		}
	
	// Detect Mode (0 = New, 1 = False)
		if($status){
			switch($mode){
				case 0:
					// Check Password
						// Query
							$query = "SELECT scalePassword FROM $table WHERE scaleKey = '$key' AND scalePassword = '$password' LIMIT 1";
							$query = mysqli_query($dbCon, $query);
						
						// Check for Error
							if(mysqli_error($dbCon)){
								$message = "Something went wrong with the server (Query Failed, Check Password). Please try again.";
								$status = false;
								break;
							}
						
						// Check for Result
							if($query->num_rows < 1){
								// No Results
									$message = "The entered Key or Password were incorrect. Please try again.";
									$status = false;
									break;
								
							} else {
								// Update Data
									$query = "UPDATE $table SET scaleData = '$data' WHERE scaleKey = '$key' LIMIT 1";
									$query = mysqli_query($dbCon, $query);
									
								// Check for Error
									if(mysqli_error($dbCon)){
										$message = "Something went wrong with the server (Query Failed, Update Save). Please try again.";
										$status = false;
										break;
									} else {
										$message = "Your Inlay Design has been updated successfully!";
										$status = true;
										break;
									}
							}

					break;
					
				case 1:
					// Generate Key
						while(!$x){
							// Randomise Key
								$key = "";
								$pool = "abcdefghijklmnopqrstuvwxyz1234567890";
								
								for($i = 0; $i < 10; $i++){
									$key .= $pool[(rand() % strlen($pool))];
								}
								
							// Test Key
								$query = "SELECT scaleKey FROM $table WHERE scaleKey = '$key' LIMIT 1";
								$query = mysqli_query($dbCon, $query);
							
							// Check for Error
								if(mysqli_error($dbCon)){
									$message = "Something went wrong with the server (Query Failed, Generate Key). Please try again.";
									$status = false;
									break;
								}
							
							// Check for Uniqueness
								if($query->num_rows < 1){
									$x = true;
								}
						}
						
					// Update Data
						$query = "INSERT INTO $table (scaleKey, scaleTitle, scalePassword, scaleData) VALUES ('$key', '$title', '$password', '$data')";
						$query = mysqli_query($dbCon, $query);
						
					// Check for Error
						if(mysqli_error($dbCon)){
							$message = "Something went wrong with the server (Query Failed, Save New). Please try again.";
							$status = false;
							break;
						} else {
							$message = "Your Inlay Design has been saved successfully! Your design key is:</p><p class='fontSizeBig fontColourOrange fontWeightBold'>".$key."</p><p>Keep a record of your design key and your edit password!";
							$status = true;
							break;
						}
						
					break;
					
				default:
					// Unrecognised
						$message = "Something was wrong with the data you submitted (Incorrect Mode). Please try again.";
						$status = false;
						break;
			}
		}
		
	// Output
		if($status){
			$build = "<h1>Save Successful</h1>";
		} else {
			$build = "<h1>Save Failed</h1>";
		}
		
		echo $build."<p>".$message."</p>";
?>