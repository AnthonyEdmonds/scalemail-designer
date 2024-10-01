<?php
	// Restricted words
		$restrictedWords = array("lair of the raven", "anthony edmonds");
		$restrictedAuthors = array("raven", "lotr");
		$allowedCharacters = "/^[a-z0-9 _-]+$/";
		
	// Write Image
		function writeImage($name, $data){
			$data = str_replace('data:image/jpeg;base64,', '', $data);
			$data = str_replace(' ', '+', $data);
			$data = base64_decode($data);
			
			file_put_contents("../patterns/" . $name . ".jpg", $data);
		}

	// Validation Function
		function validateData($input, $type = false, $minL = false, $maxL = false, $restricted = -1){
			if($type && gettype($input) != $type){
				return "Expected " . $type . ", got " . gettype($input) . ".";
			}
			
			if($minL && strlen($input) < $minL && $input == ""){
				return "Input is too short.";
			}
			
			if($maxL && strlen($input) > $maxL){
				return "Input is too long.";
			}
			
			if($restricted >= 0){
				if(checkCharacters($input)){
					return "Input contains restricted characters.";
				}
			}
			
			if($restricted == 1){
				if(checkRestricted($input)){
					return "Input contains a restricted word.";
				}
			}
			
			if($restricted == 2){
				if(checkRestricted($input, true)){
					return "Input contains a restricted word.";
				}
			}
			
			return true;
		}
		
		function checkRestricted($input, $extended = false){
			global $restrictedWords, $restrictedAuthors;
			
			$input = strtolower($input);
			
			if($input == ""){
				return false;
			}
			
			foreach($restrictedWords as $word){
				if(strpos($input, $word) !== false){
					return true;
				}
			}
			
			if(extended === true){
				foreach($restrictedAuthors as $word){
					if(strpos($input, $word) !== false){
						return true;
					}
				}
			}
			
			return false;
		}
		
		function checkCharacters($input){
			global $allowedCharacters;
			
			$input = strtolower($input);
			
			if($input == ""){
				return false;
			}
			
			if(!preg_match($allowedCharacters, $input)){
				return true;
			}
			
			return false;
		}
		
		function outputError($code, $errors){
			$log = '{';
				$log .= '"code":"' . $code . '",';
				$log .= '"messages":[';
					foreach($errors as $error){
						if($error[1] != 1){
							$log .= '{';
								$log .= '"input":"' . $error[0] . '",';
								$log .= '"txt":"' . $error[1] . '"';
							$log .= '},';
						}
					}
				
					$log = rtrim($log, ",");
				
				$log .= "]";
			$log .= '}';
			
			print $log;
		}
		
		function outputSearch($code, $title, $message, $results){
			$log =  '{';
				$log .= '"code":"' . $code . '",';
				$log .= '"heading":"' . $title . '",';
				$log .= '"message":"' . $message . '",';
				$log .= '"results":[';
					while($result = $results -> fetch_object()){
						$log .= '{';
							$log .= '"id":"' . $result -> id . '",';
							$log .= '"title":"' . $result -> title . '",';
							$log .= '"author":"' . $result -> author . '",';
							$log .= '"scales":"' . $result -> scales . '",';
							$log .= '"src":"' . $result -> id . '",';
							$log .= '"timestamp":"' . date("j/n/Y", strtotime($result -> timestamp)) . '"';
						$log .= '},';
					}
					
					$log = rtrim($log, ",");
				
				$log .= ']';
			$log .= '}';
			
			print $log;
		}
		
		function outputPattern($code, $result, $full = true, $image = false){
			$result = $result -> fetch_object();
			
			if($image){
				writeImage($result -> id, $image);
			}
			
			$log =  '{';
				$log .= '"code":"' . $code . '",';
				$log .= '"messages":[],';
				$log .= '"id":"' . $result -> id . '",';
				$log .= '"title":"' . $result -> title . '",';
				$log .= '"author":"' . $result -> author . '",';
				$log .= '"privacy":"' . $result -> privacy . '",';
				$log .= '"src":"' . $result -> id . '"';
				
				if($full){
					$log .= ',"pattern":' . $result -> pattern . '';
				}
			$log .= '}';
			
			print $log;
		}
?>