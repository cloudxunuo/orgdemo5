<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<html>
  <head>
    <title>My JSP 'head.jsp' starting page</title>
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/coolGrid.js"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="css/mytable.css" />
	<script type="text/javascript" src="js/bootstrap.js"></script>
	<script type="text/javascript">
	$(document).ready(function(){
	  $("#test").coolGrid({
	  	url: './gridHandler.action',
		colModel :
		[
			{type:'data',display: '序号', name : 'ID', width : 15, key:true, editable:false, sortable:true},
			{type:'data',display: '状态', name : 'STATUS', width : 23},
			{type:'data',display: '审核人', name : 'AUDITOR', width : 23},
			{type:'data',display: '审核日期', name : 'VERIFY_DATE', width : 24,sortable:true},
			{type:'delete|detail',display: '操作', name : 'operator', width : 15}
		],
		insertModel:
		[
			{type:'text', display:'序号',name:'ID', nullable:"NO"},
			{type:'text', display:'状态',name:'STATUS', nullable:"NO"},
			{type:'text', display:'审核人',name:'AUDITOR'},
			{type:'text', display:'实际审核人',name:'REAL_AUDITOR'},
			{type:'text', display:'审核日期',name:'VERIFY_DATE'}
		],
		queryModel:
		{
			legend:'审核查询信息',
			data:[
				{type:'data', display:'序号',name:'ID'},
				{type:'data', display:'状态',name:'STATUS'},
				{type:'data', display:'审核人',name:'AUDITOR'},
				{type:'data', display:'实际审核人',name:'REAL_AUDITOR'},
				{type:'data', display:'审核日期',name:'VERIFY_DATE'}
				]
		},
		sortorder: 'asc',
		activeSortCol:'ID',
		width:750,
		pageSize: 3,
		databaseTableName:'detail',
		queryParams:[{name:'MAIN_ID',value:'SQ20120903ADMI0002'}],
		colResize:true,
		saveTableEnable:true
		});
	});
	</script>
  </head>
  <body>
  	<div style="margin-left:50px" id="test">
  	</div>
  </body>
</html>
