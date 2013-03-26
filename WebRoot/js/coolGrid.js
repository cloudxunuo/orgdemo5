//Our coolGrid jquery plugins
//Author:Xuezi Zhang and Qiang Xu

document.write("<script type='text/javascript' src='js/colResizable-1.3.med.js'><\/script>");

(function($) {
	// 
	// plugin definition
	//
	$.fn.coolGrid = function(configuration) {

		$.extend($.fn.coolGrid.options, configuration);

		$.fn.coolGrid.div = $(this);

		// 给插件DIV添加属性
		addAttr2Div();

		if ($.fn.coolGrid.options.queryModel != undefined) {
			// 如果指定了查询框
			drawQueryForm();
		}

		//画出表头
		drawTableHeader();

		var pageParams = {
			currentPage : 1,
			pageSize : $.fn.coolGrid.options.pageSize,
			totalPage : 1
		};
		var sortParams = {
			sortCol : $.fn.coolGrid.options.activeSortCol,
			order : $.fn.coolGrid.options.sortorder
		};
		
		//载入表格数据
		loadTableData(pageParams, sortParams);
		
		//如果定义了该字段，那么列宽可调整
		if ($.fn.coolGrid.options.colResize != undefined){
			$.fn.coolGrid.table.colResizable({liveDrag:true,minWidth:50,gripInnerHtml:"<div class='grip'></div>", 
			    draggingClass:"dragging"});
		}
	};

	function addAttr2Div() {
		if ($.fn.coolGrid.options.width == undefined)
			$.fn.coolGrid.div.css("width", $.fn.coolGrid.defaultWidth);
		else
			$.fn.coolGrid.div.css("width",
					parseInt($.fn.coolGrid.options.width));
	}

	function bindEvents() {
		$table = $.fn.coolGrid.table;
		$table.find(".add").bind("click", onAddClick);
		$table.find(".delete").bind("click", onDeleteClick);
		$table.find(".update").bind("click", onUpdateClick);
		
		//绑定双击修改事件
		$table.bind("dblclick",onEditClick);
	}
	
	function onEditClick(event){
		var $tmp = $(event.target);
		if ($tmp.attr("editable") == "true"){
			var tmpName = $tmp.children("input").attr("name");
			var tmpVal = $tmp.children("input").attr("value");
			$tmp.html("<input style='width:90%;' type='text' name='"
					+ tmpName
					+ "' value='"
					+ tmpVal
					+ "'>");
			//为新添加的input添加失去焦点函数
			$tmp.children("input").focus();
			$tmp.children("input").bind("blur",onEditBlur);
			$tmp.children("input").bind("change",onEditChange);
		}
	}
	
	function onEditBlur(event){
		var $tmp = $(event.target);
		var $td = $tmp.parent();
		
		var tmpName = $tmp.attr("name");
		var tmpVal = $tmp.attr("value");
		
		$td.html(tmpVal);
		$td.append("<input style='width:90%;' type='hidden' name='"
				+ tmpName
				+ "' value='"
				+ tmpVal
				+ "'>");
		//如果更改了 增加一个标记
		if ($td.attr("changed") == "true"){
			$td.append("<i style='margin-left:15px' class='icon-pencil'></i>");
		}
	}
	
	function onEditChange(event){
		var $tmp = $(event.target);
		var $td = $tmp.parent();
		$td.attr("changed","true");
	}

	function sortAscClick(event) {
		var $tmp = $(event.target);
		while ($tmp.parent("tr").length == 0)
			$tmp = $tmp.parent();
		var colName = $tmp.parent("tr").find("input:first").val();

		var pageParams = {
			currentPage : 1,
			pageSize : $.fn.coolGrid.options.pageSize,
			totalPage : 1
		};
		var sortParams = {
			sortCol : colName,
			order : "asc"
		};

		loadTableData(pageParams, sortParams);
	}

	function sortDescClick(event) {
		var $tmp = $(event.target);
		while ($tmp.parent("tr").length == 0)
			$tmp = $tmp.parent();
		var colName = $tmp.parent("tr").find("input:first").val();

		var pageParams = {
			currentPage : 1,
			pageSize : $.fn.coolGrid.options.pageSize,
			totalPage : 1
		};
		var sortParams = {
			sortCol : colName,
			order : "desc"
		};

		loadTableData(pageParams, sortParams);
	}

	function onAddClick(event) {
		var $firstTR = $(event.target).parents("tr").filter(":first");
		var clickRowIndex = $firstTR[0].rowIndex;
		var colModel = $.fn.coolGrid.options.colModel;
		var data = [];

		var tmpData = $firstTR.find(":input").serializeArray();
		for ( var key in tmpData) {
			if (tmpData[key]["value"] != '')
				data.push({
					name : tmpData[key]["name"],
					value : tmpData[key]["value"]
				});
		}
		
		var param = {
			opParam : "insert"
		};
		param.dataTable = $.fn.coolGrid.options.databaseTableName;
		var foreignKey = $table.children(":input").serializeArray();
		for ( var i = 0; i < foreignKey.length; i++) {// 添加table里没显示出来的外键数据
			data.push(foreignKey[i]);
		}
		param.dataParams = data;
		var finalparam = {
			param : JSON.stringify(param)
		};
		var url = $.fn.coolGrid.options.url;
		$.post(url,// 发送请求地址
		finalparam, function(data) {
			if (data == "success") {
				var currentPage = parseInt($("#currentPage").val());
				var pageCount = parseInt($("#pageCount").val());
				var pageParams = {
					currentPage : currentPage,
					pageSize : $.fn.coolGrid.options.pageSize,
					totalPage : pageCount
				};
				var sortParams = {
					sortCol : $.fn.coolGrid.options.activeSortCol,
					order : $.fn.coolGrid.options.sortorder
				};
				loadTableData(pageParams, sortParams);
				alert("插入成功");
			} else {
				alert("插入失败");
			}
		});
	}
	function onDeleteClick(event) {
		var $firstTR = $(event.target).parents("tr").filter(":first");
		var clickRowIndex = $firstTR[0].rowIndex;
		var colModel = $.fn.coolGrid.options.colModel;
		var data = [];
		// 如果是简单表
		data = $firstTR.find(":input:hidden").serializeArray();
		var param = {
			opParam : "delete"
		};
		param.dataTable = $.fn.coolGrid.options.databaseTableName;
		param.queryParams = data;
		var finalparam = {
			param : JSON.stringify(param)
		};
		var url = $.fn.coolGrid.options.url;
		$.post(url,// 发送请求地址
		finalparam, function(data) {
			if (data == "success") {
				var currentPage = parseInt($("#currentPage").val());
				var pageCount = parseInt($("#pageCount").val());
				var pageParams = {
					currentPage : currentPage,
					pageSize : $.fn.coolGrid.options.pageSize,
					totalPage : pageCount
				};
				var sortParams = {
					sortCol : $.fn.coolGrid.options.activeSortCol,
					order : $.fn.coolGrid.options.sortorder
				};
				loadTableData(pageParams, sortParams);
				alert("删除成功");
			} else {
				alert("删除失败");
			}
		});

	}
	function onUpdateClick(event) {
		var $tmp = $(event.target);
		while ($tmp.parent("tr").length == 0)
			$tmp = $tmp.parent();

		var queryParams = $tmp.parent("tr").find("input:hidden")
				.serializeArray();
		var clickRowIndex = $tmp.parent("tr").filter(":first")[0].rowIndex;
		var colModel = $.fn.coolGrid.options.colModel;

		var data = [];
		// 如果是简单表
		var changeParams = $tmp.parent("tr").find(":input")
				.serializeArray();
		for ( var key in changeParams) {
			if (changeParams[key]["value"] != '')
				data.push({
					name : changeParams[key]["name"],
					value : changeParams[key]["value"]
				});
		}

		var $obj = $.fn.coolGrid.options;
		var url = $obj.url;
		var dataTable = $obj.databaseTableName;
		// alert($obj.url);
		var param = {
			opParam : "update",
			dataTable : dataTable,
			changeParams : data,
			queryParams : queryParams
		};
		var params = {
			param : JSON.stringify(param)
		};
		$.post(url,// 发送请求地址
		params, function(data) {
			if (data == "success") {
				alert("修改成功");
			} else {
				alert("修改失败");
			}
		});
	}

	function pageQuery(currentPage, pageCount) {
		var pageParams = {
			currentPage : currentPage,
			pageSize : $.fn.coolGrid.options.pageSize,
			totalPage : pageCount
		};
		var sortParams = {
			sortCol : $.fn.coolGrid.options.activeSortCol,
			order : $.fn.coolGrid.options.sortorder
		};
		loadTableData(pageParams, sortParams);
	}

	function drawQueryForm() {
		var infoCountPerRow = 3;

		if ($.fn.coolGrid.options.width != undefined)
			$.fn.coolGrid.div
					.append("<fieldset id='coolGridFieldset' style='width:"
							+ (parseInt($.fn.coolGrid.options.width)- 5)
							+ "px;border:solid 1px #aaa;position:relative;'></fieldset>");
		else
			$.fn.coolGrid.div
					.append("<fieldset id='coolGridFieldset' style='width:"
							+ $.fn.coolGrid.defaultWidth
							+ "px;border:solid 1px #aaa;position:relative;'></fieldset>");

		var $queryModel = $.fn.coolGrid.options.queryModel;
		var $queryFieldset = $("#coolGridFieldset");
		$queryFieldset.append("<legend>" + $queryModel.legend + "</legend>");
		$queryFieldset
				.append("<div id='coolGridQueryForm' style='padding:5px;'></div>");
		$("#coolGridQueryForm").append("<table style='width:100%;'></table>");
		var $tmpTable = $("#coolGridQueryForm").children("table");
		var $lastTR;
		for ( var i = 0; i < $queryModel.data.length; i++) {
			if (i % infoCountPerRow == 0) {
				$tmpTable.append("<tr></tr>");
				$lastTR = $tmpTable.children("tbody").children("tr").filter(
						":last");
			}
			$lastTR.append("<td>" + $queryModel.data[i].display + ": </td>");
			$lastTR.append("<td><input type='text' class='input-small' name='"
					+ $queryModel.data[i].name + "'></td>");
		}
		$tmpTable
				.append("<tr><td style='text-align:right;padding-top:5px;padding-right:20px;' colspan='"
						+ (infoCountPerRow * 2) + "'></td></tr>");
		$lastTR = $tmpTable.children("tbody").children("tr").filter(":last");
		$lastTR
				.children("td")
				.append(
						"<font face='Webdings' class='redcolor'>4</font><a id='coolGridSearch' href='#'>查询</a>&nbsp;&nbsp;");
		$lastTR
				.children("td")
				.append(
						"<font face='Webdings' class='redcolor'>4</font><a id='coolGridReset' href='#'>重置</a>&nbsp;&nbsp;");
		$.fn.coolGrid.div.append("<br>");

		// 绑定查询和重置事件
		$("#coolGridSearch").bind("click", queryFormSearch);
		$("#coolGridReset").click(function() {
			$("#coolGridQueryForm :input").val("");
		});
	}

	function queryFormSearch() {
		var currentPage = 1;
		var pageCount = parseInt($("#pageCount").val());
		var pageParams = {
			currentPage : currentPage,
			pageSize : $.fn.coolGrid.options.pageSize,
			totalPage : pageCount
		};
		var sortParams = {
			sortCol : $.fn.coolGrid.options.activeSortCol,
			order : $.fn.coolGrid.options.sortorder
		};
		loadTableData(pageParams, sortParams);
	}

	function drawTableHeader() {
		// 最简单的table
		$.fn.coolGrid.div.append("<table id='coolGridDataTable'></table>");
		$.fn.coolGrid.table = $.fn.coolGrid.div.find("#coolGridDataTable");
		$table = $.fn.coolGrid.table;

		if ($.fn.coolGrid.options.width == undefined) {
			$table.attr("width", $.fn.coolGrid.defaultWidth);
		} else {
			$table.attr("width", $.fn.coolGrid.options.width);
		}
		$table.append("<tr></tr>");

		var colModel = $.fn.coolGrid.options.colModel;

		$table.addClass("table table-bordered table-striped");
		var $tr = $table.find("tr :last");

		for ( var i = 0; i < colModel.length; i++) {
			if (colModel[i].sortable == true) {
				$tr
						.append("<th style='width:"
								+ colModel[i].width
								+ "%;'><div"
								+"><div style='float:left'>"
								+ colModel[i].display
								+ "<input type='hidden' value='"
								+ colModel[i].name
								+ "'></input></div><div style='float:left'>"
								+ "<div style='overflow:false;clean:both'>"
								+ "<a href='#' class='sortAsc'>"
								+ "<img alt='升序' src='img/asc.gif'></a></div>"
								+ "<div style='overflow:false;clean:both'>"
								+ "<a href='#' class='sortDesc'>"
								+ "<img alt='降序' src='img/desc.gif'></a></div></div></div></th>");
			} else {
				$tr.append("<th style='width:" + colModel[i].width +"%;'>"
						+ colModel[i].display + "</th>");
				//
				//
			}
		}

		for ( var i = 0; i < $.fn.coolGrid.options.queryParams.length; i++) {
			// 如果初始化配置的查询条件中有未在table里显示出来的列，那么该条件是外键，应该作为<input
			// type="hidden">添加到表格里
			// 在插入数据时需要用到该外键
			var show = false;
			for ( var k = 0; k < colModel.length; k++) {
				if ($.fn.coolGrid.options.queryParams[i].name == colModel[k].name) {
					show = true;
					break;
				}
			}
			if (!show) {
				$table.append("<input type='hidden' name='"
						+ $.fn.coolGrid.options.queryParams[i].name
						+ "' value='"
						+ $.fn.coolGrid.options.queryParams[i].value
						+ "'></input>");
			}
		}

		// 如果定义了saveTableEnable，添加全表保存按钮
		if ($.fn.coolGrid.options.saveTableEnable != undefined) {
			$.fn.coolGrid.div
					.append("<div style='width:70;float:right' id='coolGridSaveTableDiv'><font face='Webdings' class='redcolor'>4</font><a id='coolGridSaveTable' href='#'>全部保存</a></div>");
		}

		// 添加翻页功能
		$.fn.coolGrid.div
				.append("<div id='pageDiv' style='width:200px;height:20px;'><a href='#'><font id='first' face='Webdings' style='color: #0000ff'>9</font></a>&nbsp;<a href='#'><font id='prev' face='Webdings' style='color: #0000ff'>3</font></a>&nbsp;<input type='text' id='currentPage' name='currentPage' value='1' style='width: 30px'/>/&nbsp;<input readonly type='text' id='pageCount' name='pageCount' value='1' style='width: 30px;border:0;background:transparent;'/><a href='#'><font id='next' face='Webdings' style='color: #0000ff'>4</font></a>&nbsp;<a href='#'><font id='last' face='Webdings' style='color: #0000ff'>:</font></a></div>");

		// 画好header之后，绑定一些事件，这些事件只绑定一次，跟bindEvents函数不同
		bindEventsOnce();
	}

	function bindEventsOnce() {
		// 绑定排序事件
		$table.find(".sortAsc").bind("click", sortAscClick);
		$table.find(".sortDesc").bind("click", sortDescClick);

		// 翻页事件绑定
		$("#pageDiv").click(function(event) {
			var currentPage = 1;
			var pageCount = parseInt($("#pageCount").val());
			if (event.target.id == "first") {
				pageQuery(1, $("#pageCount").val());
			} else if (event.target.id == "prev") {
				if (parseInt($("#currentPage").val()) - 1 > 0) {
					currentPage = parseInt($("#currentPage").val()) - 1;
				} else {
					currentPage = pageCount;
				}
				pageQuery(currentPage, pageCount);
			} else if (event.target.id == "next") {
				if (parseInt($("#currentPage").val()) + 1 > pageCount) {
					currentPage = 1;
				} else {
					currentPage = parseInt($("#currentPage").val()) + 1;
				}
				pageQuery(currentPage, pageCount);
			} else if (event.target.id == "last") {
				pageQuery(pageCount, pageCount);
			}
		});
		$("#currentPage").change(function() {
			var currentPage = parseInt($("#currentPage").val());
			var pageCount = parseInt($("#pageCount").val());
			if (currentPage > pageCount) {
				alert("超出范围！");
				currentPage = pageCount;
			} else if (currentPage < 1) {
				alert("超出范围！");
				currentPage = 1;
			}
			pageQuery(currentPage, pageCount);
		});

		// 跟全表保存有关的事件绑定
		if ($.fn.coolGrid.options.saveTableEnable != undefined) {
			bindSaveTableEvents();
		}
	}

	function bindSaveTableEvents() {

		// 绑定table的change事件，修改过的tr加上need2save属性
		$("#coolGridSaveTable").click(
				function() {
					var colModel = $.fn.coolGrid.options.colModel;

					var queryParams = [];
					var changeParams = [];

					// 简单表
					var $table = $.fn.coolGrid.table;
					var tableRowCount = $table[0].rows.length;

					if ($.fn.coolGrid.options.insertable == undefined) {
						// 如果没有添加数据row
						var lastRow2Save = tableRowCount;
					} else {
						// 如果有添加数据row
						var lastRow2Save = tableRowCount - 1;
					}

					for ( var i = 1; i < lastRow2Save; i++) {// 第一行表头和最后一行不需要
						var rowChangeData = [];
						var rowQueryData = [];
						var $TR = $table.children("tbody").children("tr")
								.filter(":eq(" + i + ")");
						var queryData = $TR.find(":input:hidden")
								.serializeArray();
						for ( var k = 0; k < queryData.length; k++) {
							rowQueryData.push(queryData[k]);
						}

						var changeData = $TR.find(":input").filter(
								":not(:hidden)").serializeArray();
						for ( var k = 0; k < changeData.length; k++) {
							if (changeData[k].value != ''
									&& changeData[k].value != 'null')
								rowChangeData.push(changeData[k]);
						}
						changeParams.push({
							data : rowChangeData
						});
						queryParams.push({
							data : rowQueryData
						});
					}

					// 获得数据之后向后台提交
					var $obj = $.fn.coolGrid.options;
					var url = $obj.url;
					var dataTable = $obj.databaseTableName;
					var param = {
						opParam : "saveTable",
						dataTable : dataTable,
						changeParams : changeParams,
						queryParams : queryParams
					};
					var params = {
						param : JSON.stringify(param)
					};
					$.post(url,// 发送请求地址
					params, function(data) {
						if (data == "success") {
							alert("保存成功");
						} else {
							alert("保存失败");
						}
					});
				});
	}

	function addData2Table(data) {
		$table = $.fn.coolGrid.table;
		var colModel = $.fn.coolGrid.options.colModel;
		$table.children("tbody").children("tr").filter(":gt(0)").remove();// 如果该表有数据，除了列名tr全部移除

		// 重新添加数据
		for ( var key in data) {
			if (key == "dataSet") {
				for ( var m = 0; m < data.dataSet.length; m++) {
					// 如果是简单表
					$table.append("<tr></tr>");
					for ( var k = 0; k < colModel.length; k++) {
						$tr = $table.find("tr :last");
						$tr.append("<td></td>");
						$td = $tr.find("td :last");
						var colName = colModel[k].name;
						if (colModel[k].key != undefined)
							$td.append("<input type='hidden' name='" + colName
									+ "' value='" + data.dataSet[m][colName]
									+ "'></input>");
						var types = colModel[k].type.split("|");
						for ( var n = 0; n < types.length; n++) {
							switch (types[n]) {
							case "data":
								if (colModel[k].editable == undefined){
									$td.append(data.dataSet[m][colName]);
									$td.attr("editable","true");
									$td.append("<input style='width:90%;' type='hidden' name='"
											+ colName
											+ "' value='"
											+ data.dataSet[m][colName]
											+ "'>");
									}
								else{
									$td.append(data.dataSet[m][colName]);
								}
								break;
							case "insert":
								$td
										.append("<a href='#' class='insert'><img src='images/add.gif' border='0' alt='添加记录'></a>");
								break;
							case "delete":
								$td
										.append("<a href='#' class='delete'><img src='images/delete.gif' border='0' alt='删除记录'></a>");
								break;
							case "update":
								$td
										.append("<a href='#' class='update'><img src='images/update.gif' border='0' alt='删除记录'></a>");
								break;
							}
						}
					}
				}
			}
		}

		if ($.fn.coolGrid.options.insertable != undefined) {
			// 是否只是可添加数据
			// 如果是简单表
			var rowCount = $table.children("tbody").children("tr").length;
			if (rowCount % 2 != 0)
				$table.append("<tr class='tabtd1'></tr>");
			else
				$table.append("<tr class='tabtd2'></tr>");
			$tr = $table.find("tr :last");
			for ( var k = 0; k < colModel[0].data.length; k++) {
				$tr.append("<td></td>");
				$td = $tr.find("td :last");
				if (k == 0)
					$td
							.append("<a href='#' class='add'><img src='images/add.gif' border='0' alt='添加记录'></a>");
				else {
					$td
							.append("<input style='width:90%;' type='text' name='"
									+ colModel[0].data[k].name + "'>");
				}
			}
		}

		// 修改currentPage和pageCount的值
		$("#currentPage").val(data.pageParam.currentPage);
		$("#pageCount").val(data.pageParam.totalPage);
	}

	function loadTableData(pageParams, sortParams) {
		$table = $.fn.coolGrid.table;
		var url = $.fn.coolGrid.options.url;
		var dataTable = $.fn.coolGrid.options.databaseTableName;
		var colModel = $.fn.coolGrid.options.colModel;
		var queryCols = [];

		for ( var j = 0; j < colModel.length; j++) {
			if (colModel[j].type.indexOf('data') != -1) {
				var temp = {
					name : colModel[j].name
				};
				queryCols.push(temp);
			}
		}

		var queryParams = [];
		if ($.fn.coolGrid.options.queryModel == undefined) {
			queryParams = $.fn.coolGrid.options.queryParams;
		} else {
			for ( var i = 0; i < $.fn.coolGrid.options.queryParams.length; i++) {
				queryParams.push($.fn.coolGrid.options.queryParams[i]);
			}

			var formData = $("#coolGridQueryForm :input").serializeArray();
			for ( var i = 0; i < formData.length; i++) {
				if (formData[i].value != '') {
					queryParams.push(formData[i]);
				}
			}
		}

		var params = {
			opParam : 'view',
			dataTable : dataTable,
			queryCols : queryCols,
			queryParams : queryParams,
			pageParams : pageParams,
			sortParams : sortParams
		};
		var paramsString = JSON.stringify(params);
		var tmp = {
			param : paramsString
		};

		$.post(url,//发送请求地址
		tmp, function(data) {
			console.log(data);
			var dataJson = eval('(' + data + ')');
			console.log(dataJson);
			addData2Table(dataJson);
			bindEvents();
		});

	}
	$.fn.coolGrid.options = {};
	$.fn.coolGrid.table;
	$.fn.coolGrid.div;
	$.fn.coolGrid.defaultWidth = 500;
})(jQuery);