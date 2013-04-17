<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My Form Demo</title>
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/myForm.js"></script>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
<script type="text/javascript">
	$(document).ready(function() {
		$("#form").myForm({
			width : 750,
			url : "./MyFormHandlerServlet",
			type : "GET",
			title : "表单名",
			columns : 12,
			fields : [ {
				type : "text",
				display : "文本框",
				validation : {
					required : true
				},
				span : 12
			}, {
				type : "password",
				display : "密码框",
				validation : {
					min : 4,
					max : 6
				},
				span : 12
			}, {
				type : "checkbox",
				display : "复选框",
				values : [ "胡筱", "许强", "张学孜" ],
				name : "people",
				span : 12
			}, {
				type : "radio",
				display : "单选按钮",
				values : [ "男", "女" ],
				name : "sex",
				span : 12
			}, {
				type : "select",
				display : "下拉列表",
				values : [ "胡筱", "许强", "张学孜" ],
				span : 12
			}, {
				type : "hidden",
				display : "隐藏域",
				span : 12
			}, {
				type : "textarea",
				display : "多行文本域",
				span : 12
			} ],
			buttons : [ "query", "save", "reset", {
				display : "按钮",
				click : function() {
					alert("button click");
				}
			} ]
		});
	});
</script>
</head>

<body>
	<div id="form"></div>
</body>
</html>
