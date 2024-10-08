<!DOCTYPE html>
<html lang='en-gb'>
	<head>
		<!-- META Tags -->
			<meta charset="utf-8" />
			<meta name='robots' content='all' />
			
			<meta name='author' content='Anthony Edmonds' />
			<meta name='description' content='Design your own scalemail patterns and inlays.' />
			
			<title>Scalemail Designer - Lair of the Raven</title>
			
		<!-- Open Graph -->
			<meta property='og:title' content='Scalemail Designer' />
			<meta property='og:description' content='Design your own scalemail patterns and inlays.' />
			<meta property='og:type' content='website' />
			<meta property='og:url' content='https://scalemail.lairoftheraven.co.uk' />
			<meta property='og:image' content='images/scalemailOpengraphLogo.png' />
			<meta property='og:site_name' content='Lair of the Raven' />
			<meta property='og:locale' content='en_gb' />
		
		<!-- Links -->
			<link href='scalemailCSS.css' type='text/css' rel='stylesheet' />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
			<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		
		<!-- Scripts -->
			<script src='scalemailJS.js' type='text/javascript'></script>
			
		<!-- Google -->
			
	</head>
	
	<body class='backgroundTheme'>
		<div id='canvasWrapper' class='canvasWrapper cursorGrab'>
			<canvas id="canvasBackground" class='canvasLayer'></canvas>
			<canvas id="canvasEditor" class='canvasLayer'></canvas>
			<canvas id="canvasUI" class='canvasLayer'></canvas>
		</div>
		
		<div id="overlayWrapper" class="show">
			<div id="overlayBackground" class='load'></div>
			
			<div id="overlayWindow">
				<img class="splash" src="images/splashScreen.png" alt="Scalemail Designer v2.0 Beta" />
				<p id='splashText' class='textAlignCenter fontSizeLarge'>Starting up...</p>
			</div>
			
			<div id="overlayLoading">
				<img src="images/loading.svg" alt="Working..." />
			</div>
		</div>
		
		<a id="photoAnchor" class="hidden"></a>
		<img src='images/scaleLogo.png' class='hidden' />
		
		<script>
			setupElements();
			imageAssets.loadImages();
			addEvent(window, "resize", scaleCanvases);
		</script>
	</body>
</html>