<?php
	// Connect to Database
		require "dataConnect.php";
		require "scaleFunctions.php";
		
	// Get data from post
		$title	= mysqli_real_escape_string($dbConnection, $_POST['title']);
		$author	= mysqli_real_escape_string($dbConnection, $_POST['author']);
		$minS	= mysqli_real_escape_string($dbConnection, $_POST['minS']);
		$maxS	= mysqli_real_escape_string($dbConnection, $_POST['maxS']);
		$sort	= mysqli_real_escape_string($dbConnection, $_POST['sort']);
	
	// Format data
		$minS = intval($minS);
		$maxS = intval($maxS);
	
	// Validate data
		$error = false;
		$validationList = [];
		
		array_push($validationList, ["Title", validateData($title, "string", false, false, 0)]);
		array_push($validationList, ["Author", validateData($author, "string", false, false, 0)]);
		array_push($validationList, ["Min. Scales", validateData($minS, "integer")]);
		array_push($validationList, ["Max. Scales", validateData($maxS, "integer")]);
		array_push($validationList, ["Sort", validateData($sort, "string", false, false, 0)]);
		
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
		switch($sort){
			case "taz":
				$sort = "title ASC, author ASC, scales ASC, timestamp DESC";
				break;
			
			case "tza":
				$sort = "title DESC, author ASC, scales ASC, timestamp DESC";
				break;
			
			case "aaz":
				$sort = "author ASC, title ASC, scales ASC, timestamp DESC";
				break;
			
			case "aza":
				$sort = "author DESC, title ASC, scales ASC, timestamp DESC";
				break;
				
			case "saz":
				$sort = "scales ASC, title ASC, author ASC, timestamp DESC";
				break;
				
			case "sza":
				$sort = "scales DESC, title ASC, author ASC, timestamp DESC";
				break;
			
			case "dno":
				$sort = "timestamp DESC, title ASC, author ASC, scales ASC";
				break;
			
			case "don":
				$sort = "timestamp ASC, title ASC, author ASC, scales ASC";
				break;
		}
	
		$sql = "SELECT id, title, author, scales, image, timestamp
				FROM scaledata
				WHERE (title LIKE '%$title%' && author LIKE '%$author%' && scales >= '$minS' && scales <= '$maxS' && private = 1) || title = '$title'
				ORDER BY $sort";
				
		$result = $dbConnection -> query($sql);
		
		if($result -> num_rows > 0){
			outputSearch("s", "Search Results", "", $result);
		} else {
			outputSearch("f", "No results found", "Nothing was found for your entered search results. Change your parameters and try again.", false);
		}
?>