// Global Variables
	// Matrix
		var canvasMatrix = [];
		
	// Canvas
		var canvasHeight = 0;
		var canvasWidth = 0;
		
	// Palette Colours
		var paletteActive = 2;
		var paletteColour = [];
		
		paletteColour[0] = {code:"xxx", label:"Empty"};
		paletteColour[1] = {code:"non", label:"No Scale"};
		paletteColour[2] = {code:"alb", label:"Aluminium (Brushed)"};
		paletteColour[3] = {code:"alm", label:"Aluminium (Mirror)"};
		paletteColour[4] = {code:"blk", label:"Black"};
		paletteColour[5] = {code:"blu", label:"Blue"};
		paletteColour[6] = {code:"brz", label:"Bronze"};
		paletteColour[7] = {code:"brb", label:"Brown (Brushed)"};
		paletteColour[8] = {code:"cha", label:"Champagne"};
		paletteColour[9] = {code:"chb", label:"Champagne (Brushed)"};
		paletteColour[10] = {code:"fro", label:"Frost"};
		paletteColour[11] = {code:"gld", label:"Gold"};
		paletteColour[12] = {code:"gls", label:"Gold (Shiny)"};
		paletteColour[13] = {code:"grn", label:"Green"};
		paletteColour[14] = {code:"ora", label:"Orange"};
		paletteColour[15] = {code:"pnk", label:"Pink"};
		paletteColour[16] = {code:"ppl", label:"Purple"};
		paletteColour[17] = {code:"red", label:"Red"};
		paletteColour[18] = {code:"snb", label:"Sand (Brushed)"};
		paletteColour[19] = {code:"out", label:"Outline"};
		
	// Rulers
		var rulerUnits = "m";
		var rulerSize = "small";
		var rulerData = [];
		
		rulerData['small'] = {width:14, height:22, gapH:1, gapV:6, weightS:0.35, weightR:0.13};
		rulerData['large'] = {width:22, height:36, gapH:2, gapV:12, weightS:0.54, weightR:0.42};
		
		rulerData['m'] = {unitSize:"mm", multiSize:1, unitWeight:"g", multiWeight:1};
		rulerData['i'] = {unitSize:"\"", multiSize:0.0393701, unitWeight:"oz", multiWeight:0.035274};
	
// Canvas Functions
	// Refresh Canvas Scales
		function canvasRefresh(){
			// Reset Variables
				build = "";
				overlay = "";
				overlayAlt = 0;
				
			// Update Interface
				canvasInputUpdate();
				
			// Generate Content
				for(x = 0; x < canvasMatrix.length; x++){
					// Add Row DIV
						// Check for Indent
							if(canvasMatrix[x][canvasMatrix[x].length-1] == 0){
								rowAlt = " alt";
							} else {
								rowAlt = "";
							}
						
						// Row DIV
							build += "<div class='canvasRow " + rulerSize + rowAlt + "' style='z-index:" + (canvasMatrix.length - x) + ";'>";
					
					// Add Column DIVs
						for (y = 0; y < canvasMatrix[x].length; y++){
							if(canvasMatrix[x][y] != 0){
								// ID
									scaleID = "scale" + x + "-" + y;
								
								// Canvas
									build += "<div id='" + scaleID + "' class='canvasScale " + rulerSize + " scale" + paletteColour[canvasMatrix[x][y]]['code'] + "'></div>";
								
								// Overlay
									overlay += "<div class='canvasOverlayButton " + rulerSize;
									
									if(overlayAlt == 0){
										overlay += " alt";
										overlayAlt = 2;
									}
									
									overlay += "' onmouseover='scaleHover(\"" + scaleID + "\", 1)' onmouseout='scaleHover(\"" + scaleID + "\", 0)' onclick='scaleChange(\"" + scaleID + "\")'></div>";
							}
							
						}
					
					// Close Row DIV
						// Canvas
							build += "</div>";
							
						// Overlay
							overlay += "<br/>";
							overlayAlt--;
					
				}
				
			// Overlay
				build += "<div id='canvasOverlay'>";
					build += overlay;
				build += "</div>";
				
			// Modify
				build += "<div class='canvasModify top horizontal'>";
					build += "<div class='canvasModifyButton add marginRight25' onclick='matrixAddRow(1);'></div>";
					build += "<div class='canvasModifyButton remove' onclick='matrixRemoveRow(1);'></div>";
				build += "</div>";
				
				build += "<div class='canvasModify left vertical wrapNormal'>";
					build += "<div class='canvasModifyPusher'></div>";
					build += "<div class='canvasModifyButton add marginBottom25' onclick='matrixAddColumn(1);'></div>";
					build += "<div class='canvasModifyButton remove' onclick='matrixRemoveColumn(1);'></div>";
				build += "</div>";
				
				build += "<div class='canvasModify right vertical wrapNormal'>";
					build += "<div class='canvasModifyPusher'></div>";
					build += "<div class='canvasModifyButton add marginBottom25' onclick='matrixAddColumn(0);'></div>";
					build += "<div class='canvasModifyButton remove' onclick='matrixRemoveColumn(0);'></div>";
				build += "</div>";
				
				build += "<div class='canvasModify bottom horizontal'>";
					build += "<div class='canvasModifyButton add marginRight25' onclick='matrixAddRow(0);'></div>";
					build += "<div class='canvasModifyButton remove' onclick='matrixRemoveRow(0);'></div>";
				build += "</div>";
				
			// Output
				writeHTML("canvas", build);
				
			// Refresh
				dataUpdate();
				
			// Testing
				//matrixOutput();
		}
	
	// Reset Canvas
		function canvasClear(){
			// Generate Output
				build = "<h3>Set the size of your inlay above and click build.</h3>";
				build += "<ul>";
					build += "<li>Your scales will appear here.</li>";
					build += "<li>Use the palette to change the colour of your scales.</li>";
					build += "<li>Whichever colour you have selected will be applied when you click build, or when you click on a scale.</li>";
					build += "<li>Select the size of your scales, and switch between ruler units.</li>";
					build += "<li>Save and Load your design to keep on working.</li>";
				build += "</ul>";
				
			// Output
				writeHTML("canvas", build);
				
			// Disable Interface
				canvasButtonsDisable();
		}
	
	// Enable Interface
		function canvasButtonsEnable(){
			buttonEnable("buttonSave");
			buttonEnable("buttonSmall");
			buttonEnable("buttonLarge");
			buttonEnable("buttonMetric");
			buttonEnable("buttonImperial");
		}
	
	// Disable Interface
		function canvasButtonsDisable(){
			buttonDisable("buttonSave");
			buttonDisable("buttonSmall");
			buttonDisable("buttonLarge");
			buttonDisable("buttonMetric");
			buttonDisable("buttonImperial");
		}
		
	// Update Height and Width
		function canvasInputUpdate(){
			// Calculate Height
				canvasHeight = canvasMatrix.length;
				
			// Calculate Width
				canvasWidth = canvasMatrix[0].length - 1;
				
			// Update Inputs
				writeValue("inputHeight", canvasHeight);
				writeValue("inputWidth", canvasWidth);
		}

// Scale Functions
	// Change Scale Colour
		function scaleChange(t){
			// Get Matrix Values
				matrixX = t.slice(5, t.indexOf("-"));
				matrixY = t.slice(t.indexOf("-") + 1);
			
			// Change Matrix Value
				canvasMatrix[matrixX][matrixY] = paletteActive;
				
			// Change Scale Image
				c = "canvasScale " + rulerSize + " scale" + paletteColour[paletteActive]['code'];
				writeClass(t, c);
				
			// Refresh
				dataUpdate();
				
			// Testing
				//matrixOutput();
		}
	
	// Scale Hover Highlight
		function scaleHover(t, m){
			if(m == 1){
				writeStyle(t, "background-position:100% 0%;");
			} else {
				writeStyle(t, "");
			}
		}
	
// Data Functions
	// Change Scale Size
		function dataScale(s){
			// Configure Size
				if(s == 0){
					rulerSize = "small";
				} else {
					rulerSize = "large";
				}
				
			// Refresh
				canvasRefresh();
		}
	
	// Change Data Units
		function dataUnits(u){
			// Configure Units
				if(u == 1){
					rulerUnits = "i";
				} else {
					rulerUnits = "m";
				}
				
			// Refresh
				dataUpdate();
		}
	
// Pallette Functions
	// Build Palette
		function paletteBuild(){
			// Reset Build
				build = "<h2>Scale Palette</h2>";
			
			// Generate Palette
				for(x = 1; x < paletteColour.length; x++){
					build += "<div id='" + paletteColour[x]['code'] + "' title='" + paletteColour[x]['label'] + "' class='canvasScale cursorPointer small scale" + paletteColour[x]['code'] + " marginBottom3'";
					
					if(paletteActive == x){
						build += " style='background-position:100% 0%;'";
					}
					
					build += " onclick='paletteChangeActive(" + x + ")'></div>";
				}
				
			// Information Panes
				build += "<br/><div id='dataColour'></div>";
				build += "<div id='dataStats'></div>";
				
			// Output
				writeHTML("palette", build);
		}
	
	// Change Active Colour
		function paletteChangeActive(c){
			// Clear Active Style
				writeStyle(paletteColour[paletteActive]['code'], "");
			
			// Set New Colour
				paletteActive = c;
			
			// Apply Active Style
				writeStyle(paletteColour[paletteActive]['code'], "background-position:100% 0%;");
		}
		
// Data Functions
	// Update Colour & Size Data
		function dataUpdate(){
			// Reset Variables
				build = "";
				countColour = [];
				countScales = 0;
				countRings = 0;
				rulerHeightFraction = "";
				rulerWidthFraction = "";
			
			// Colours
				// Count Scale Colours
					for(x = 0; x < canvasMatrix.length; x++){
						for(y = 0; y < canvasMatrix[x].length; y++){
							if(countColour[canvasMatrix[x][y]]){
								countColour[canvasMatrix[x][y]]++;
								
							} else {
								countColour[canvasMatrix[x][y]] = 1;
								
							}
						}
					}
					
				// Output Colours
					for(x = 2; x < countColour.length; x++){
						if(countColour[x]){
							build += "<p class='fontSizeSmall'>" + countColour[x] + "x " + paletteColour[x]['label'] + "</p>";
							countScales += countColour[x];
						}
					}
					
					build = "<h3>Colours Used</h3>" + build;
						
					writeHTML("dataColour", build);
					
			// Stats
				// Calculate Size
					// Pattern Height
						rulerHeight = ((+canvasHeight-1) * +rulerData[rulerSize]['gapV'] + +rulerData[rulerSize]['height']) * rulerData[rulerUnits]['multiSize'];
						
						// Generate Imperial Fraction
							if(rulerUnits == "i"){
								rulerHeightFraction = " " + inchesFraction(rulerHeight);
								rulerHeight = Math.floor(rulerHeight);
							}
						
					// Pattern Width
						rulerWidth = ((+rulerData[rulerSize]['width'] / 2) * ((+canvasWidth + 1) * 2))  * rulerData[rulerUnits]['multiSize'];
						
						// Generate Imperial Fraction
							if(rulerUnits == "i"){
								rulerWidthFraction = " " + inchesFraction(rulerWidth);
								rulerWidth = Math.floor(rulerWidth);
							}
						
				// Calculate Weight
					// Scale Weight
						weightScales = countScales * rulerData[rulerSize]['weightS'] * rulerData[rulerUnits]['multiWeight'];
					
					// Ring Weight
						countRings = countScales * 2;
						weightRings = countRings * rulerData[rulerSize]['weightR'] * rulerData[rulerUnits]['multiWeight'];
						
					// Total Weight
						weightTotal = weightScales + weightRings;
						
					// Reduce Decimal Places
						weightScales = weightScales.toFixed(2);
						weightRings = weightRings.toFixed(2);
						weightTotal = weightTotal.toFixed(2);
					
				// Output Data
					// Size
						build = "<h3>Inlay Size</h3>";
						
						build += "<p>~" + rulerWidth + rulerData[rulerUnits]['unitSize'] + rulerWidthFraction + " wide</p>";
						build += "<p>~" + rulerHeight + rulerData[rulerUnits]['unitSize'] + rulerHeightFraction + " high</p>";
						
					// Weight
						build += "<h3 class='marginTop25'>Inlay Weight</h3>";
						
						build += "<p>" + countScales + " Scales (~" + weightScales + rulerData[rulerUnits]['unitWeight'] + ")</p>";
						build += "<p>" + countRings + " Rings (~" + weightRings + rulerData[rulerUnits]['unitWeight'] + ")</p>";
						build += "<p>~" + weightTotal + rulerData[rulerUnits]['unitWeight'] + " Total</p>";
					
					// Output
						writeHTML("dataStats", build);
		}
	
// Matrix Functions
	// Build Matrix
		function matrixBuild(o){
			// Get Height & Width
				if(getValue("inputHeight") < 1 || getValue("inputWidth") < 1){
					alert("You can't build an inlay with no scales in it!");
					return false;
				}
				
				if(canvasHeight = getValue("inputHeight")){
				} else {
					alert("You can't build an inlay with no scales in it!");
					return false;
				}
				
				if(canvasWidth = getValue("inputWidth")){
				} else {
					alert("You can't build an inlay with no scales in it!");
					return false;
				}
			
			// Build Matrix
				canvasMatrix = [];
				
				for(x = 0; x < canvasHeight; x++){
					matrixBuildRow(0);
				}
				
			// Output
				if(o == 1){
					canvasButtonsEnable();
					canvasRefresh();
				} else {
					return true;
				}
		}
		
	// Add Matrix Row
		function matrixBuildRow(m){
			// Reset Variables
				build = [];
				
			// Build Scales
				for(y = 0; y < canvasWidth; y++){
					build.push(paletteActive);
				}
				
			// Get Position
				if(m == 1){
					// Start Position
						pos = 0
				} else {
					// End Position
						pos = canvasMatrix.length - 1;
				}
			
			// Even/Odd Row Detection
				if(canvasMatrix[pos] != undefined && canvasMatrix[pos][canvasMatrix[pos].length-1] == 0){
					build.push(paletteActive);
				} else {
					build.push(0);
				}
				
			// Detect Mode
				if(m == 1){
					// Add to Start
						canvasMatrix.unshift(build);
				} else {
					// Add to End
						canvasMatrix.push(build);
				}
		}
		
	// Load JSON Matrix
		function matrixLoad(d){
			// Attempt to Load
				try{
					// Load Matrix from JSON
						canvasMatrix = JSON.parse(d);
					
					// Refresh Canvas
						canvasRefresh();
						canvasButtonsEnable();
					
					// Hide Pane
						overlayHide();
					
				} catch(err) {
					// Load Error
						alert("Failed to Load. Please check your save data and try again.");
				}
		}
		
	// Add Row
		function matrixAddRow(m){
			// Build Row
				matrixBuildRow(m);

			// Refresh Canvas
				canvasRefresh();
		}
		
	// Remove Row
		function matrixRemoveRow(m){
			// Check Height
				if(canvasMatrix.length < 2){
					alert("You can't build an inlay without any scales in it!");
					return false;
				}
				
			// Select Mode
				if(m == 1){
					// Remove from Start
						canvasMatrix.shift();
				} else {
					// Remove from End
						canvasMatrix.pop();
				}
				
			// Refresh Canvas
				canvasRefresh();
		}
		
	// Add Column
		function matrixAddColumn(m){
			// Cycle Matrix
				for(x = 0; x < canvasMatrix.length; x++){
					if(m == 1){
						// Add to Start
							canvasMatrix[x].unshift(paletteActive);
							
					} else {
						// Add to End
							if(canvasMatrix[x][canvasMatrix[x].length-1] != 0){
								// Even
									canvasMatrix[x].push(paletteActive);
									
							} else {
								// Odd
									canvasMatrix[x][canvasMatrix[x].length - 1] = paletteActive;
									canvasMatrix[x].push(0);
							}
					}
				}
			
			// Refresh Canvas
				canvasRefresh();
		}
		
	// Remove Column
		function matrixRemoveColumn(m){
			// Check Width
				if(canvasMatrix[0].length < 3){
					alert("You can't build an inlay without any scales in it!");
					return false;
				}
				
			// Cycle Matrix
				for(x = 0; x < canvasMatrix.length; x++){
					if(m == 1){
						// Remove from Start
							canvasMatrix[x].shift();
							
					} else {
						// Remove from End
							if(x % 2){
								// Even
									canvasMatrix[x].pop();
									
							} else {
								// Odd
									canvasMatrix[x].pop();
									canvasMatrix[x].pop();
									canvasMatrix[x].push(0);
							}
					}
				}
			
			// Refresh Canvas
				canvasRefresh();
		}
		
// Save & Load Functions
	// Server-side & AJAX
		// Server Save
			function serverSave(){
				// Reset Styles
					writeStyle("updKey", "");
					writeStyle("updPassword", "");
					writeStyle("newTitle", "");
					writeStyle("newPassword", "");
					
				// Detect Mode
					if(getValue("updKey")){
						// Update Design
							// Get Values
								updKey = getValue("updKey");
								updPassword = getValue("updPassword");
								
							// Validation
								// Key
									if(updKey.length != 10){
										writeStyle("updKey", "border:1px solid #ff1111; color:#ff1111;");
										return alert("The entered Key was too short (10 characters).");
									}
								
								// Password
									if(updPassword.length > 10 || updPassword.length < 1){
										writeStyle("updPassword", "border:1px solid #ff1111; color:#ff1111;");
										return alert("The entered Password was too short/long (1-10 characters).");
									}
									
							// Assemble AJAX
								updPassword = CryptoJS.SHA3(updPassword);
								ajaxString = "m=0&k=" + updKey + "&p=" + updPassword + "&d=" + JSON.stringify(canvasMatrix);
								
					} else {
						// New Design
							// Get Values
								newTitle = getValue("newTitle");
								newPassword = getValue("newPassword");
								
							// Validation
								// Key
									if(newTitle.length > 60 || newTitle.length < 1){
										writeStyle("newTitle", "border:1px solid #ff1111; color:#ff1111;");
										return alert("The entered Title was too short/long (1-60 characters).");
									}
								
								// Password
									if(newPassword.length > 10 || newPassword.length < 1){
										writeStyle("newPassword", "border:1px solid #ff1111; color:#ff1111;");
										return alert("The entered Password was too short/long (1-10 characters).");
									}
									
							// Assemble AJAX
								newPassword = CryptoJS.SHA3(newPassword);
								ajaxString = "m=1&t=" + newTitle + "&p=" + newPassword + "&d=" + JSON.stringify(canvasMatrix);
					}
					
				// Submit AJAX
					ajax = new XMLHttpRequest();
					ajax.onreadystatechange = function(){
						if(ajax.readyState == 4 && ajax.status == 200) {
							writeHTML("overlayPane", ajax.responseText);
						}
					}
					
					ajax.open("POST", "parts/dataSave.php", true);
					ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					ajax.send(ajaxString);
					
				// Change Overlay Pane
					build = "<h1>Saving to the Server...</h1>"
					build += "<img src='images/lotrWaiting.gif' />";
					
					writeHTML("overlayPane", build);
			}
			
		// Server Load
			function serverLoad(){
				// Reset Styles
					writeStyle("loadKey", "");
					
				// Get Values
					key = getValue("loadKey");
				
				// Validation
					if(key.length != 10){
						writeStyle("loadKey", "border:1px solid #ff1111; color:#ff1111;");
						return alert("The entered Key was too short (10 characters).");
					}
				
				// Assemble AJAX
					ajaxString = "k=" + key;
				
				// Submit AJAX
					ajax = new XMLHttpRequest();
					ajax.onreadystatechange = function(){
						if(ajax.readyState == 4 && ajax.status == 200) {
							serverLoadResult(ajax.responseText);
						}
					}
					
					ajax.open("POST", "parts/dataLoad.php", true);
					ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					ajax.send(ajaxString);
					
				// Change Overlay Pane
					build = "<h1>Loading from the Server...</h1>"
					build += "<img src='images/lotrWaiting.gif' />";
					
					writeHTML("overlayPane", build);
			}
			
		// Server Load Result
			function serverLoadResult(d){
				try{
					data = JSON.parse(d);
					
					matrixLoad(data['scaleData']);
					
				} catch(err) {
					writeHTML("overlayPane", d);
				}
			}
			
		// Server Query
			function serverQuery(v){
				
			}

	// Local & Overlay Pane
		// Save
			function canvasSave(){
				// Reset Variables
					build = "";
					
				// Build Text
					build += "<h1>Save Inlay Design</h1>";
					build += "<h3>Select whether you would like to save to the server, or to a local text file.</h3>";
					build += "<p>When you are done, click anywhere outside of this pane to close it.</p>";
					
				// Database Save
					build += "<div class='canvasOverlayBrick'>";
						build += "<h2>Save to Server</h2>";
						build += "<h3>Keep your inlay design on the server.</h3>";
						build += "<p>If this is a new design, give your design a title and an edit password - a key will be provided to you after saving. If you are updating an existing design, enter your key and edit password.<p>";
						build += "<p>Anyone with the key can view your design. Only someone with the edit password will be able to save changes to your design.</p>";
						
						// New Save
							build += "<div class='canvasOverlayBrick'>";
								build += "<h3>New Design</h3>";
								build += "<input id='newTitle' type='text' placeholder='Title' maxlength='60' />";
								build += "<input id='newPassword' type='text' placeholder='Password' maxlength='10' />";
							build += "</div>"
						
						// Update Save
							build += "<div class='canvasOverlayBrick'>";
								build += "<h3>Existing Design</h3>";
								build += "<input id='updKey' type='text' placeholder='Design Key' maxlength='10' />";
								build += "<input id='updPassword' type='text' placeholder='Password' maxlength='10' />";
							build += "</div>"
						
						build += "<input type='submit' value='Save to Server' onclick='serverSave();' />";
					build += "</div>"
					
				// Text Save
					build += "<div class='canvasOverlayBrick'>";
						build += "<h2>Save to .txt File</h2>";
						build += "<h3>Keep your inlay design on your local computer in a .txt file.</h3>";
						build += "<p>Make sure that you copy the text perfectly, with all of the square brackets. Use a program that won't reformat your pasted text, such as Notepad++. Make sure you name the .txt file something memorable so that you don't lose it!</p>";
						build += "<textarea class='fontColourOrange fontWeightBold fontSizeBig cursorNormal'>" + JSON.stringify(canvasMatrix) + "</textarea>";
					build += "</div>"
					
				// Output
					writeHTML("overlayPane", build);
					
				// Show Pane
					writeStyle("overlay", "display:inline;");
			}
		
		// Load
			function canvasLoad(){
				// Reset Variables
					build = "";
					
				// Build Text
					build += "<h1>Load Inlay Design</h1>";
					build += "<h3>Select whether you would like to load from the server, or from a local text file.</h3>";
					build += "<p>If you want to cancel, click anywhere outside of this pane to close it.</p>";
					
				// Database Load
					build += "<div class='canvasOverlayBrick'>";
						build += "<h2>Load from Server</h2>";
						build += "<h3>Retreive an inlay design from the server.</h3>";
						build += "<p class='marginBottom25'>Enter the 10-character key for the design you want to load. You do not need the edit password to view a design, however you will need it if you want to save any changes to the design.</p>";
						
						build += "<input id='loadKey' type='text' placeholder='Design Key' maxlength='10' />";
						build += "<input type='submit' value='Load from Server' onclick='serverLoad();' />";
					build += "</div>"
					
				// Text Load
					build += "<div class='canvasOverlayBrick'>";
						build += "<h2>Load from .txt File</h2>";
						build += "<h3>Load a .txt string from your local computer.</h3>";
						build += "<p>Make sure that you copy the text perfectly, with all of the square brackets. If you have any issues loading your design, double check to make sure that you have it saved as plain text and without formatting.</p>";
						
						build += "<textarea id='inputLoad' class='fontColourOrange'></textarea>";
						build += "<input type='submit' class='marginTop25' value='Load Design' onclick='matrixLoad(getValue(\"inputLoad\"));' />";
					build += "</div>"
					
				// Output
					writeHTML("overlayPane", build);
					
				// Show Pane
					writeStyle("overlay", "display:inline;");
					
			}
			
		// Overlay Hider
			function overlayHide(){
				writeStyle("overlay", "");
			}
	
// General Functions
	// Add HTML
		function writeHTML(t, v, m){
			if(m == 1){
				document.getElementById(t).innerHTML += v;
			} else {
				document.getElementById(t).innerHTML = v;
			}
			
			return;
		}
		
	// Write Classes
		function writeClass(t, v, m){
			if(m == 1){
				document.getElementById(t).className += v;
			} else {
				document.getElementById(t).className = v;
			}
			
			return;
		}
		
	// Write Styles
		function writeStyle(t, v){
			document.getElementById(t).setAttribute("style", v);
			
			return;
		}

	// Get Value
		function getValue(t){
			return document.getElementById(t).value;
		}
		
	// Write Value
		function writeValue(t, v){
			document.getElementById(t).value = v;
		}
		
	// Disable Button
		function buttonDisable(t){
			document.getElementById(t).disabled = true;
		}
		
	// Enable Button
		function buttonEnable(t){
			document.getElementById(t).disabled = false;
		}
		
	// Inches Fraction
		function inchesFraction(v){
			return Math.floor(16 * (v % 1)) + "/16<sup>ths</sup>";
		}
		
	// Add Delay
		function addDelay(t, v){
			document.getElementById(t).style.animationDelay = v;
		}
	
// SHA 3
	/*
	CryptoJS v3.1.2
	code.google.com/p/crypto-js
	(c) 2009-2013 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	
	var CryptoJS=CryptoJS||function(v,p){var d={},u=d.lib={},r=function(){},f=u.Base={extend:function(a){r.prototype=this;var b=new r;a&&b.mixIn(a);b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
	s=u.WordArray=f.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=p?b:4*a.length},toString:function(a){return(a||y).stringify(this)},concat:function(a){var b=this.words,c=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var n=0;n<a;n++)b[j+n>>>2]|=(c[n>>>2]>>>24-8*(n%4)&255)<<24-8*((j+n)%4);else if(65535<c.length)for(n=0;n<a;n+=4)b[j+n>>>2]=c[n>>>2];else b.push.apply(b,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<
	32-8*(b%4);a.length=v.ceil(b/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],c=0;c<a;c+=4)b.push(4294967296*v.random()|0);return new s.init(b,a)}}),x=d.enc={},y=x.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],j=0;j<a;j++){var n=b[j>>>2]>>>24-8*(j%4)&255;c.push((n>>>4).toString(16));c.push((n&15).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],j=0;j<b;j+=2)c[j>>>3]|=parseInt(a.substr(j,
	2),16)<<24-4*(j%8);return new s.init(c,b/2)}},e=x.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],j=0;j<a;j++)c.push(String.fromCharCode(b[j>>>2]>>>24-8*(j%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],j=0;j<b;j++)c[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new s.init(c,b)}},q=x.Utf8={stringify:function(a){try{return decodeURIComponent(escape(e.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return e.parse(unescape(encodeURIComponent(a)))}},
	t=u.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new s.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=q.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,c=b.words,j=b.sigBytes,n=this.blockSize,e=j/(4*n),e=a?v.ceil(e):v.max((e|0)-this._minBufferSize,0);a=e*n;j=v.min(4*a,j);if(a){for(var f=0;f<a;f+=n)this._doProcessBlock(c,f);f=c.splice(0,a);b.sigBytes-=j}return new s.init(f,j)},clone:function(){var a=f.clone.call(this);
	a._data=this._data.clone();return a},_minBufferSize:0});u.Hasher=t.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){t.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,c){return(new a.init(c)).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return(new w.HMAC.init(a,
	c)).finalize(b)}}});var w=d.algo={};return d}(Math);
	(function(v){var p=CryptoJS,d=p.lib,u=d.Base,r=d.WordArray,p=p.x64={};p.Word=u.extend({init:function(f,s){this.high=f;this.low=s}});p.WordArray=u.extend({init:function(f,s){f=this.words=f||[];this.sigBytes=s!=v?s:8*f.length},toX32:function(){for(var f=this.words,s=f.length,d=[],p=0;p<s;p++){var e=f[p];d.push(e.high);d.push(e.low)}return r.create(d,this.sigBytes)},clone:function(){for(var f=u.clone.call(this),d=f.words=this.words.slice(0),p=d.length,r=0;r<p;r++)d[r]=d[r].clone();return f}})})();
	(function(v){for(var p=CryptoJS,d=p.lib,u=d.WordArray,r=d.Hasher,f=p.x64.Word,d=p.algo,s=[],x=[],y=[],e=1,q=0,t=0;24>t;t++){s[e+5*q]=(t+1)*(t+2)/2%64;var w=(2*e+3*q)%5,e=q%5,q=w}for(e=0;5>e;e++)for(q=0;5>q;q++)x[e+5*q]=q+5*((2*e+3*q)%5);e=1;for(q=0;24>q;q++){for(var a=w=t=0;7>a;a++){if(e&1){var b=(1<<a)-1;32>b?w^=1<<b:t^=1<<b-32}e=e&128?e<<1^113:e<<1}y[q]=f.create(t,w)}for(var c=[],e=0;25>e;e++)c[e]=f.create();d=d.SHA3=r.extend({cfg:r.cfg.extend({outputLength:512}),_doReset:function(){for(var a=this._state=
	[],b=0;25>b;b++)a[b]=new f.init;this.blockSize=(1600-2*this.cfg.outputLength)/32},_doProcessBlock:function(a,b){for(var e=this._state,f=this.blockSize/2,h=0;h<f;h++){var l=a[b+2*h],m=a[b+2*h+1],l=(l<<8|l>>>24)&16711935|(l<<24|l>>>8)&4278255360,m=(m<<8|m>>>24)&16711935|(m<<24|m>>>8)&4278255360,g=e[h];g.high^=m;g.low^=l}for(f=0;24>f;f++){for(h=0;5>h;h++){for(var d=l=0,k=0;5>k;k++)g=e[h+5*k],l^=g.high,d^=g.low;g=c[h];g.high=l;g.low=d}for(h=0;5>h;h++){g=c[(h+4)%5];l=c[(h+1)%5];m=l.high;k=l.low;l=g.high^
	(m<<1|k>>>31);d=g.low^(k<<1|m>>>31);for(k=0;5>k;k++)g=e[h+5*k],g.high^=l,g.low^=d}for(m=1;25>m;m++)g=e[m],h=g.high,g=g.low,k=s[m],32>k?(l=h<<k|g>>>32-k,d=g<<k|h>>>32-k):(l=g<<k-32|h>>>64-k,d=h<<k-32|g>>>64-k),g=c[x[m]],g.high=l,g.low=d;g=c[0];h=e[0];g.high=h.high;g.low=h.low;for(h=0;5>h;h++)for(k=0;5>k;k++)m=h+5*k,g=e[m],l=c[m],m=c[(h+1)%5+5*k],d=c[(h+2)%5+5*k],g.high=l.high^~m.high&d.high,g.low=l.low^~m.low&d.low;g=e[0];h=y[f];g.high^=h.high;g.low^=h.low}},_doFinalize:function(){var a=this._data,
	b=a.words,c=8*a.sigBytes,e=32*this.blockSize;b[c>>>5]|=1<<24-c%32;b[(v.ceil((c+1)/e)*e>>>5)-1]|=128;a.sigBytes=4*b.length;this._process();for(var a=this._state,b=this.cfg.outputLength/8,c=b/8,e=[],h=0;h<c;h++){var d=a[h],f=d.high,d=d.low,f=(f<<8|f>>>24)&16711935|(f<<24|f>>>8)&4278255360,d=(d<<8|d>>>24)&16711935|(d<<24|d>>>8)&4278255360;e.push(d);e.push(f)}return new u.init(e,b)},clone:function(){for(var a=r.clone.call(this),b=a._state=this._state.slice(0),c=0;25>c;c++)b[c]=b[c].clone();return a}});
	p.SHA3=r._createHelper(d);p.HmacSHA3=r._createHmacHelper(d)})(Math);

// Testing
	function matrixOutput(){
		build = "";
		
		for(x = 0; x < canvasMatrix.length; x++){
			build += x + " [" + canvasMatrix[x] + "]<br/>";
		}
		
		writeHTML("matrix", build);
		
		dataUpdate();
	}