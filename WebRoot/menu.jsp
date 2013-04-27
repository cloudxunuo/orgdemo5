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
				headUrl:'./img/bgcerptop.gif',
				mapModel:[{definedAs:'SYS_CODE', tableField:'SYS_CODE'},			
					{definedAs:'MENU_CODE', tableField:'MENU_CODE'},
					{definedAs:'MENU_NAME', tableField:'MENU_NAME'},
					{definedAs:'MENU_FATHER', tableField:'MENU_FATHER'},
					{definedAs:'MENU_LEVEL', tableField:'MENU_LEVEL'},
					{definedAs:'MENU_INDEX', tableField:'MENU_INDEX'},
					{definedAs:'PROG_URL', tableField:'PROG_URL'},
					{definedAs:'LEAF_FLAG', tableField:'LEAF_FLAG'},
					{definedAs:'PROG_PARAM', tableField:'PROG_PARAM'},
				],
				startLevel:1,
				headMenuLevelNum:2,
				tableName:'sam_menu'
			});
		});
	</script>
  </head>
  <body>
	<div id="main"></div>
  </body>
</html>