<html>
	<head>
		<title>Test Page</title>
	    <script type="text/javascript" src="js/jquery.js"></script>
	    
	    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
	    
		<script type="text/javascript" src="js/bootstrap.js"></script>
		<script type="text/javascript">
			$(document).ready(function(){

			});
		</script>
	</head>
	<body>
	    <ul class="nav nav-list">
		    <li class="nav-header">List header</li>
		    <li class="active"><a href="#">Home</a></li>
		    <li><a id="sideActionsfc01" class="collapsed" data-target="#collapsesfc01" data-toggle="collapse" href="#">Library</a>
		    	<div id="collapsesfc01" class="collapse">
		    	<ul class="nav nav-list">
				    <li class="active"><a href="#">Home</a></li>
				    <li>
				    	<a href="#">Library</a>
				    		<ul class="nav nav-list">
							    <li class="active"><a href="#">Home</a></li>
							    <li>
							    	<a href="#">Library</a>
							    </li>
    						</ul>
				    </li>
    			</ul>
    			</div>
		    </li>
	    </ul>
    </body>
</html>