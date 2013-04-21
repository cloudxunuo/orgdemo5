<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>

<html>
  <head>
    <title>My JSP 'head.jsp' starting page</title>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/coolMenu.js"></script>
    
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="css/myMenu.css" />
    <link rel="stylesheet" type="text/css" href="css/mytable.css" />
    
	<script type="text/javascript" src="js/bootstrap.js"></script>
    <script type="text/javascript" src="js/coolGrid.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#main").coolMenu({url:'./menuGenerator.action',
				headUrl:'./img/bgcerptop.gif'
			});
		});
	</script>
  </head>
  <body>
	<div id="main"></div>
  </body>
</html>