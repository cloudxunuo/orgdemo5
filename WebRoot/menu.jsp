<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<html>
  <head>
    <title>My JSP 'head.jsp' starting page</title>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/coolMenu.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="css/myMenu.css" />
	<script type="text/javascript" src="js/bootstrap.js"></script>
	<script type="text/javascript">
	$(document).ready(function(){
		$("#sfc10").click({
			//$("#siderbar").
		});
		
	});
	</script>
  </head>
  <body>
  	<div class="container" id="headpic">
		<div class="span10">
			<div class="row-fluid">
  				<img src="./img/bgcerptop.gif">
  			</div>
	  		
			<div class="row-fluid" id="menu">
				<div class="navbar">
					<div class="navbar-inner">
						<div class="span3">
							<a class="brand">欢迎用户：管理员</a>
						</div>
						<ul class="nav">
							<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">生产计划管理
								<b class="caret"></b>
							</a>
							<ul class="dropdown-menu">
							      <li><a href="#">晶片生长计划</a></li>
							      <li><a href="#">晶片生产计划</a></li>
							      <li><a href="#">镜片生产通知单</a></li>
							</ul>
							</li>
							
							<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">基础数据管理
							    <b class="caret"></b>
							</a>
							<ul class="dropdown-menu">
							</ul>
							</li>
							
							<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">车间生产及追溯
							    <b class="caret"></b>
							</a>
							<ul class="dropdown-menu">
							       <li class="dropdown-submenu">
										<a tabindex="-1" href="#">多晶生长管理</a>
										<ul class="dropdown-menu">
											<li><a href="#">1</a></li>
											<li><a href="#">2</a></li>
										</ul>
							      <li><a href="#">单晶备料管理</a></li>
							      <li><a href="#">晶体生长管理</a></li>
							      <li><a href="#">晶片加工管理</a></li>
							      <li><a href="#">晶体加工管理</a></li>
							      <li><a href="#">晶片测试管理</a></li>
							      <li><a href="#">晶片切片管理</a></li>
							      <li><a href="#">晶片磨边管理</a></li>
							      <li><a href="#">晶片研磨管理</a></li>
							      <li><a href="#">晶片抛光管理</a></li>
							      <li id="sfc10"><a href="#">晶片清洗管理</a></li>
							</ul>
							</li>
							
							<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">系统辅助管理
							    <b class="caret"></b>
							</a>
							<ul class="dropdown-menu">
							      <!-- links -->
							</ul>
							</li>
							
							<li class="dropdown">
							<a class="dropdown-toggle" data-toggle="dropdown" href="#">系统管理
							    <b class="caret"></b>
							</a>
							<ul class="dropdown-menu">
							      <!-- links -->
							</ul>
							</li>
							<li><a href="#">退出</a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="container" id="bottom">
			  <div class="row-fluid">
			    <div class="span2" id="sidebar">
			    	<ul class="nav nav-list">
					  <li class="nav-header">干过管理</li>
					  <li><a href="#">Home</a></li>
					  <li><a href="#">Library</a></li>
					</ul>
					
					<ul class="nav nav-list">
					  <li class="nav-header">List header</li>
					  <li><a href="#">Home</a></li>
					  <li><a href="#">Library</a></li>
					</ul>
					
					<ul class="nav nav-list">
					  <li class="nav-header">List header</li>
					  <li><a href="#">Home</a></li>
					  <li><a href="#">Library</a></li>
					</ul>
			    </div>
			    <div class="span10">
			    	<div id="content">
					  <jsp:include page="table.jsp"/>
					</div>
			    </div>
			  </div>
			</div>
		</div>
	</div>
  </body>
</html>
