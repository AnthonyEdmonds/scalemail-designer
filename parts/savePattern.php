<?php
	// Connect to Database
		require "dataConnect.php";
		require "scaleFunctions.php";
	
	// Get data from post
		$title 		= mysqli_real_escape_string($dbConnection, $_POST['title']);
		$author 	= mysqli_real_escape_string($dbConnection, $_POST['author']);
		$password 	= mysqli_real_escape_string($dbConnection, $_POST['password']);
		$private 	= mysqli_real_escape_string($dbConnection, $_POST['private']);
		$pattern 	= mysqli_real_escape_string($dbConnection, $_POST['pattern']);
		$scales 	= mysqli_real_escape_string($dbConnection, $_POST['scales']);
		$image 		= mysqli_real_escape_string($dbConnection, $_POST['image']);
		
	// Format Data
		if($private == "true"){
			$private = true;
		} else {
			$private = false;
		}
		
		$scales = intval($scales);
	
	// Validate Data
		$error = false;
		$validationList = [];

		array_push($validationList, ["Title", validateData($title, "string", 1, 60, 1)]);
		array_push($validationList, ["Author", validateData($author, "string", 1, 60, 2)]);
		array_push($validationList, ["Password", validateData($password, "string", 1, 60)]);
		array_push($validationList, ["Private", validateData($private, "boolean")]);
		array_push($validationList, ["Pattern", validateData($pattern, "string", 1)]);
		array_push($validationList, ["Scales", validateData($scales, "integer", 1)]);
		array_push($validationList, ["Image", validateData($image, "string", 1)]);
		
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
		$sql = "SELECT password
				FROM scaledata
				WHERE title = '$title'
				LIMIT 1";
				
		$result = $dbConnection -> query($sql);
		
		if($result -> num_rows == 1){
			$result = $result -> fetch_object();
			
			if($result -> password == $password){
				$sql = "UPDATE scaledata
						SET pattern = '$pattern', scales = '$scales'
						WHERE title = '$title'
						LIMIT 1";
						
				if($dbConnection -> query($sql)){
					$sql = "SELECT id, title, author, private AS privacy, image
							FROM scaledata
							WHERE title = '$title'
							LIMIT 1";
					
					$result = $dbConnection -> query($sql);
					
					outputPattern("s", $result, false, $image);
					
				} else {
					$el = [["Updating", "The server returned an error while trying to update your pattern."]];
					outputError("x02", $el);
				}
				
			} else {
				$el = [["Password", "The entered password was incorrect."]];
				outputError("x03", $el);
			}
			
		} else {
			$sql = "INSERT
					INTO scaledata (title, author, password, pattern, private, scales, image)
					VALUES ('$title', '$author', '$password', '$pattern', '$private', '$scales', '$image')";
						
			if($dbConnection -> query($sql) === true){
				$sql = "SELECT id, title, author, private AS privacy
						FROM scaledata
						WHERE title = '$title'
						LIMIT 1";
						
				$result = $dbConnection -> query($sql);
				
				outputPattern("s", $result, false, $image);
			} else {
				$el = [["Inserting", "The server returned an error while trying to save your pattern."]];
				outputError("x04", $el);
			}
		}
?>