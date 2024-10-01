<?php
	// Connect to Database
		require "dataConnect.php";
		require "scaleFunctions.php";
		
	// Get data from post
		$id = mysqli_real_escape_string($dbConnection, $_POST['id']);
		
	// Format data
		$id = intval($id);
		
	// Validate data
		$error = false;
		$validationList = [];
		
		array_push($validationList, ["ID", validateData($id, "integer", 1)]);
		
		foreach($validationList as $log){
			if($log[1] !== true){
				$error = true;
			}
		}
		
		if($error === true){
			outputError("x01", $validationList);
			die();
		}
	
	// Execute query
		$sql = "SELECT id, title, author, private AS privacy, pattern, image
				FROM scaledata
				WHERE id = $id
				LIMIT 1";
		
		$result = $dbConnection -> query($sql);
		
		if($result -> num_rows == 1){
			outputPattern("s", $result);
		} else {
			$el = [["Opening", "No results for that ID."]];
			outputError("x02", $el);
		}
?>