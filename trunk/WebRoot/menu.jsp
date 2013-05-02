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
		//调用jQuery.ready函数，然后通过用jQuery对象调用coolMenu函数加载菜单
		$(document).ready(function(){
			$("#main").coolMenu({
				//url参数：配置提交后台的对应Action
				url:'./menuGenerator.action',
				//headUrl参数：配置顶层图片的URL
				headUrl:'./img/bgcerptop.gif',
				//MapModel参数：配置后台数据库字段到前台插件的所需要的数据项的映射关系
				mapModel:[{definedAs:'SYS_CODE', tableField:'SYS_CODE'},			
					{definedAs:'MENU_CODE', tableField:'MENU_CODE'},
					{definedAs:'MENU_NAME', tableField:'MENU_NAME'},
					{definedAs:'MENU_FATHER', tableField:'MENU_FATHER'},
					{definedAs:'MENU_LEVEL', tableField:'MENU_LEVEL'},
					{definedAs:'MENU_INDEX', tableField:'MENU_INDEX'},
					{definedAs:'PROG_URL', tableField:'PROG_URL'},
					{definedAs:'LEAF_FLAG', tableField:'LEAF_FLAG'},
					{definedAs:'PROG_PARAM', tableField:'PROG_PARAM'}
				],
				//根节点开始层数
				startLevel:1,
				//数据库对应表单名称
				tableName:'sam_menu'
			});
		});
	</script>
  </head>
  <body>
	<div id="main"></div>
  </body>
</html>