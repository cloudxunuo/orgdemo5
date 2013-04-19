<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'form.jsp' starting page</title>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/coolForm.js"></script>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<script type="text/javascript">
	$(document).ready(function(){
		$("#form").coolForm({
			url:"",
			type:"GET",
			columns:12,
			title:"入库单",
			fields:
			[
				{type:"text",display:"入库日期",span:12,center:true},
				{type:"group",group:
				[
					{type:"text",display:"仓库编码",span:4,key:true},
					{type:"text",display:"仓库名称",span:4},
					{type:"text",display:"库管员",span:4},
					{type:"text",display:"货区编码",span:4},
					{type:"text",display:"货区名称",span:4},
					{type:"text",display:"制单人",span:4},
					{type:"text",display:"到货单号",span:4},
					{type:"text",display:"备注",span:4}
				]}
			],
			buttons:["save"]
		});
	});
	</script>

  </head>
  
  <body>
    <div id="form"></div>
  </body>
</html>
