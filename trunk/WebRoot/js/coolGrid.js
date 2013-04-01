//Our coolGrid jquery plugins
//Author:Xuezi Zhang and Qiang Xu

document.write("<script type='text/javascript' src='js/colResizable-1.3.med.js'></script>");
document.write("<script type='text/javascript' src='js/page.js'></script>");

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
		
		//如故insertable为true，预先设置好新增数据的modal,此操作必须在drawTableHeader之后
		if ($.fn.coolGrid.options.insertModel != undefined){
			SetInsertModal();
		}

		var pageParams = {
			currentPage : 1,
			pageSize : $.fn.coolGrid.options.pageSize,
			totalPage : 1
		};
		var sortParams = {
			sortCol : $.fn.coolGrid.options.activeSortCol,
			order : $.fn.coolGrid.options.sortorder
		};
		
		//初始化全局变量
		$.fn.coolGrid.activeColName = $.fn.coolGrid.options.activeSortCol;
		$.fn.coolGrid.activeSortOrder = $.fn.coolGrid.options.sortorder;
		
		//载入表格数据
		loadTableData(pageParams, sortParams);
		
		//如果定义了该字段，那么列宽可调整
		if ($.fn.coolGrid.options.colResize != undefined){
			$.fn.coolGrid.table.colResizable({liveDrag:true,minWidth:50,gripInnerHtml:"<div class='grip'></div>", 
			    draggingClass:"dragging"});
		}
	};
	
	function SetInsertModal(){
		$.fn.coolGrid.div.append("<div id='coolGridInsertModal' class='modal hide fade' tabindex='-1' role='dialog'"
				+"		aria-labelledby='myModalLabel' aria-hidden='true' style='top:100px;width:500px'>"
				+"		<div class='modal-header'>"
				+"			<button type='button' class='close' data-dismiss='modal'"
				+"				aria-hidden='true'>×</button>"
				+"			<h3 id='myModalLabel'>新增数据</h3>"
				+"		</div>"
				+"		<div class='modal-body'>"
				+"		<form id='insertForm' class='form-horizontal'></form> </div>"
				+"		<div class='modal-footer'>"
				+"			<button class='btn' data-dismiss='modal' aria-hidden='true'>关闭</button>"
				+"			<button id='insertBtn' class='btn btn-primary'>添加数据</button>"
				+"		</div>"
				+"	</div>");
		//对modal的一些属性进行设置
		$('#coolGridInsertModal').modal({
			backdrop: "static",
			show:false
			});
		//根据配置向modal中添加数据
		var $form = $("#insertForm");

		var insertModel = $.fn.coolGrid.options.insertModel;
		
		if (insertModel == "get"){
			//需要从后台获取insertModel
			var url = $.fn.coolGrid.options.url;
			var params = {
					opParam : "getInsertModel",
					dataTable : "detail",
				};
			var paramsString = JSON.stringify(params);
			$.post(url,// 发送请求地址
				{param:paramsString}, function(data) {
					var tmp = eval('(' + data + ')');
					insertModel = tmp.insertModel;
					drawModel(insertModel,$form);
			});
		}
		else{
			//直接用前台配置的model
			drawModel(insertModel,$form);
		}
	}
	
	function drawModel(insertModel,$form){
		//$.fn.coolGrid.options配置的queryParams中作为外键添加在table中的字段,在此不能画出
		//因为在onAddClick函数中会自动添加该值，这里如果画出，提交的时候会出现重复
		var $table = $.fn.coolGrid.table;
		var $foreignKeys = $table.children("input:hidden");
		
		for (var i = 0; i < insertModel.length; i++){
			$form.append("<div class='control-group'></div>");
			var $ctrlGroup = $form.find("div.control-group:last");
			
			var isForeignKey = false;
			$.each($foreignKeys, function(k,val){  
				if (insertModel[i].name == val.name){
					isForeignKey = true;
				}
			});
			
			var types = insertModel[i].type.split("|");
			for ( var n = 0; n < types.length; n++) {
				switch (types[n]) {
				case "text":
					if (isForeignKey){
						//如果是作为外键存在的字段，则不画；
					}
					else if (insertModel[i].nullable != undefined){
						$ctrlGroup.append("<label class='control-label' for='"+
								insertModel[i].name+""+i+"'>"+insertModel[i].display+"</label>"
								+"<div class='controls'>"
								+"  <input class='input-large' type='text' id='"+
								insertModel[i].name+""+i+"' placeholder='"+insertModel[i].display+
								"' value='' name='"+insertModel[i].name+"' required key='true'>"+
								"<span style='color:red;margin-left:10px;font-size:30px;' class='help-inline'>*</span>"
								+ "</div>");
					}else{
						$ctrlGroup.append("<label class='control-label' for='"+
								insertModel[i].name+""+i+"'>"+insertModel[i].display+"</label>"
								+"<div class='controls'>"
								+"  <input class='input-large' type='text' id='"+
								insertModel[i].name+""+i+"' placeholder='"+insertModel[i].display+
								"' value='' name='"+insertModel[i].name+"'>"+"</div>");
					}
					break;
				case "number":
					break;
				case "bool":
					break;
				}
			}
		}
		
		//绑定按钮事件
		$("#insertBtn").bind("click", onAddClick);
		
		//当弹出窗口隐藏时，应该复原弹出窗口至初始状态
		$('#coolGridInsertModal').on('hidden', function () {
			$("#insertForm").find("input").filter("[foreignKey!=true]").val("");//清除上一次添加的数据，因为该弹出框只是隐藏了，若不清除，下次显示时有BUG
		});
	}

	function addAttr2Div() {
		if ($.fn.coolGrid.options.width == undefined)
			$.fn.coolGrid.div.css("width", $.fn.coolGrid.defaultWidth);
		else
			$.fn.coolGrid.div.css("width",
					parseInt($.fn.coolGrid.options.width));
	}

	function bindEvents() {
		$table = $.fn.coolGrid.table;
		$table.find(".delete").bind("click", onDeleteClick);
		$table.find(".update").bind("click", onUpdateClick);
		
		//如果全表保存功能启用，绑定双击修改事件
		if ($.fn.coolGrid.options.saveTableEnable != undefined) {
			$table.bind("dblclick",onEditClick);
		}
	}
	
	function onEditClick(event){
		//此函数的语句顺序极为重要，请勿轻易调整
		var $tmp = $(event.target);
		if ($tmp.attr("editable") == "true"){
			var tmpName = $tmp.children("input").attr("name");
			var tmpVal = $tmp.children("input").attr("value");
			if (tmpVal == "nullval"){
				tmpVal="";//如果该单元格没有值
			}
			var changed = false;
			if ($tmp.children("input").attr("changed") == 'true'){
				changed = true;
			}
			if (changed){
				$tmp.html("<input style='width:90%;' changed='true' type='text' name='"
						+ tmpName
						+ "' value='"
						+ tmpVal
						+ "'>");
			}else{
				$tmp.html("<input style='width:90%;' type='text' name='"
						+ tmpName
						+ "' value='"
						+ tmpVal
						+ "'>");
			}
			//为新添加的input添加失去焦点函数
			$tmp.children("input").focus();
			$tmp.children("input").bind("blur",onEditBlur);
			$tmp.children("input").bind("change",onEditChange);
		}
	}
	
	function onEditBlur(event){
		//此函数的语句顺序极为重要，请勿轻易调整
		var $tmp = $(event.target);
		var $td = $tmp.parent();
		
		var tmpName = $tmp.attr("name");
		var tmpVal = $tmp.attr("value");
		if (tmpVal==""){
			tmpVal = "nullval";
		}
		var changed = false;
		
		if ($td.children("input").attr("changed") == "true"){
			changed = true;
		}
		
		if (tmpVal=="nullval"){
			$td.html("");
		}else{
			$td.html(tmpVal);
		}
		
		if (changed){
			$td.append("<input changed='true' style='width:90%;' type='hidden' name='"
					+ tmpName
					+ "' value='"
					+ tmpVal
					+ "'>");
			//如果更改了 增加一个标记
			$td.append("<i style='margin-left:15px' class='icon-pencil'></i>");
		}else{
			$td.append("<input style='width:90%;' type='hidden' name='"
					+ tmpName
					+ "' value='"
					+ tmpVal
					+ "'>");
		}
	}
	
	function onEditChange(event){
		var $tmp = $(event.target);
		$tmp.attr("changed","true");
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
		
		//修改全局变量
		$.fn.coolGrid.activeColName = colName;
		$.fn.coolGrid.activeSortOrder = "asc";

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

		//修改全局变量
		$.fn.coolGrid.activeColName = colName;
		$.fn.coolGrid.activeSortOrder = "desc";
		
		loadTableData(pageParams, sortParams);
	}

	function onAddClick(event) {
		var data = [];
		var tmpData = $("#insertForm").find("input");
		var keyNull = false;
		
		tmpData.each(function(){
			var val = $(this).val();
			if (val != ''){
				data.push({
					name : $(this).attr("name"),
					value : val
				});
			}else{
				if ($(this).attr("key") == "true"){
					keyNull = true;
				}
			}
		});
		// 添加table里没显示出来的外键数据
		var foreignKey = $table.children(":input").serializeArray();
        for ( var i = 0; i < foreignKey.length; i++) {
                data.push(foreignKey[i]);
        }
		
		//如果主键没填写
		if (keyNull){
			var $inputNeed =  $("#insertForm").find("input[key='true']").filter("[value='']:first");
			$inputNeed.focus();
			return ;
		}
		
		var param = {
			opParam : "insert"
		};
		param.dataTable = $.fn.coolGrid.options.databaseTableName;
		param.dataParams = data;
		var finalparam = {
			param : JSON.stringify(param)
		};
		var url = $.fn.coolGrid.options.url;
		$.post(url,// 发送请求地址
		finalparam, function(data) {
			if (data == "success") {
				var currentPage = $.fn.coolGrid.currentPage;
				var pageCount = $.fn.coolGrid.pageCount;
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
		$("#coolGridInsertModal").modal('hide');//隐藏对话框
	}
	function onDeleteClick(event) {
		var $firstTR = $(event.target).parents("tr").filter(":first");
		var data = [];
		// 如果是简单表
		data = $firstTR.find(":input:hidden").filter(".keyData").serializeArray();
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
				var currentPage = $.fn.coolGrid.currentPage;
				var pageCount = $.fn.coolGrid.pageCount;
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
			sortCol : $.fn.coolGrid.activeColName,
			order : $.fn.coolGrid.activeSortOrder
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
                $lastTR.append("<td>" + $queryModel.data[i].display + "</td>");
                $lastTR.append("<td><input type='text' class='input-medium' name='"
                                + $queryModel.data[i].name + "'></td>");
        }
        $tmpTable.append("<tr><td style='text-align:right;padding-top:5px;padding-right:20px;' colspan='"
                                        + (infoCountPerRow * 2) + "'></td></tr>");
        $lastTR = $tmpTable.children("tbody").children("tr").filter(":last");
        $lastTR.children("td").append("<button id='coolGridSearch' type='button' class='btn btn-primary btn-small'>查询数据</button>");
        $lastTR.children("td").append("<button id='coolGridReset' type='button' class='btn btn-primary btn-small' style='margin-left:10px'>重置</button>");
        $.fn.coolGrid.div.append("<br>");

        // 绑定查询和重置事件
        $("#coolGridSearch").bind("click", queryFormSearch);
        $("#coolGridReset").click(function() {
                $("#coolGridQueryForm :input").val("");
        });
	}

	function queryFormSearch() {
		var currentPage = 1;
		var pageCount = $.fn.coolGrid.pageCount;
		var pageParams = {
			currentPage : currentPage,
			pageSize : $.fn.coolGrid.options.pageSize,
			totalPage : pageCount
		};
		var sortParams = {
			sortCol : $.fn.coolGrid.activeColName,
			order : $.fn.coolGrid.activeSortOrder
		};
		loadTableData(pageParams, sortParams);
	}

	function drawTableHeader() {
		// 最简单的table
		
		//添加保存修改按钮
		if ($.fn.coolGrid.options.saveTableEnable != undefined) {
			$.fn.coolGrid.div.append("<button id='coolGridSaveTable' class='btn btn-small btn-warning' type='button'><i class='icon-ok icon-white'></i> 保存修改</button>");
		}
		//添加新增数据按钮
		if ($.fn.coolGrid.options.insertModel != undefined) {
			$.fn.coolGrid.div.append("<a href='#coolGridInsertModal' role='button' class='btn btn-small btn-warning' data-toggle='modal' style='margin-left:2px'><i class='icon-plus icon-white'></i> 新增数据</a>");
		}
		
		$.fn.coolGrid.div.append("<br/>");
		
		$.fn.coolGrid.div.append("<table id='coolGridDataTable' style='margin-top:2px;background-color:#fffba0'></table>");
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
								+ "<div class='sortAsc' style='overflow:false;clean:both'></div>"
								+ "<div class='sortDesc' style='overflow:false;clean:both'>"
								+ "</div></div></div></th>");
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

		// 添加翻页功能
		$.fn.coolGrid.div.append("<div id='myPager' class='pagination' ></div>");

		// 画好header之后，绑定一些事件，这些事件只绑定一次，跟bindEvents函数不同
		bindEventsOnce();
	}

	function bindEventsOnce() {
		// 绑定排序事件
		$table.find(".sortAsc").bind("click", sortAscClick);
		$table.find(".sortDesc").bind("click", sortDescClick);

		// 初始化翻页插件
		$("#myPager").pagination(0,{current_page:0,items_per_page:$.fn.coolGrid.options.pageSize,
			callback:function(page, component){}});

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

					for ( var i = 1; i < tableRowCount; i++) {// 第一行表头不需要
						var rowChangeData = [];
						var rowQueryData = [];
						var $TR = $table.children("tbody").children("tr")
								.filter(":eq(" + i + ")");
						if ($TR.find("input[changed='true']").length == 0){
							//如果改行没有改动过
							continue;
						}
						var queryData = $TR.find(":input:hidden").filter(".keyData")
								.serializeArray();
						for ( var k = 0; k < queryData.length; k++) {
							rowQueryData.push(queryData[k]);
						}

						var changeData = $TR.find(":input:hidden").filter(
								"[changed='true']").serializeArray();
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
					$table.find("td input").removeAttr("changed");
					$table.find("td").children("i").remove();
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
							$td.append("<input type='hidden' class='keyData' name='" + colName
									+ "' value='" + data.dataSet[m][colName]
									+ "'></input>");
						var types = colModel[k].type.split("|");
						for ( var n = 0; n < types.length; n++) {
							switch (types[n]) {
							case "data":
								if (colModel[k].editable == undefined){
									$td.append(data.dataSet[m][colName]);
									$td.attr("editable","true");
									if (data.dataSet[m][colName] == null){
										$td.append("<input style='width:90%;' type='hidden' name='"
												+ colName
												+ "' value='nullval'>");
									}else{
										$td.append("<input style='width:90%;' type='hidden' name='"
												+ colName
												+ "' value='"
												+ data.dataSet[m][colName]
												+ "'>");
									}
								}
								else{
									$td.append(data.dataSet[m][colName]);
								}
								break;
							case "detail":
								$td
										.append("<a class='btn btn-warning btn-mini edit' href='#'><i class='icon-eye-open icon-white'></i> 详细</a>");
								break;
							case "delete":
								$td
										.append("<a class='btn btn-warning btn-mini delete' href='#'><i class='icon-remove icon-white'></i> 删除</a>");
								break;
							case "edit":
								$td
										.append("<a class='btn btn-warning btn-mini edit' href='#'><i class='icon-pencil icon-white'></i> 编辑</a>");
								break;
							}
						}
					}
				}
			}
		}

		// 修改currentPage和pageCount的值
		$("#myPager").pagination(data.pageParam.totalPage,{current_page:data.pageParam.currentPage - 1,
			items_per_page:$.fn.coolGrid.options.pageSize,callback:function(page, component){
				$.fn.coolGrid.currentPage = page + 1;
				$.fn.coolGrid.pageCount = data.pageParam.totalPage;
				pageQuery(page + 1, data.pageParam.totalPage);//翻页时重新查询
			}});
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
			var dataJson = eval('(' + data + ')');
			addData2Table(dataJson);
			bindEvents();
		});

	}
	$.fn.coolGrid.options = {};
	$.fn.coolGrid.table;
	$.fn.coolGrid.div;
	$.fn.coolGrid.defaultWidth = 500;
	$.fn.coolGrid.currentPage = 1;
	$.fn.coolGrid.pageCount = 1;
	$.fn.coolGrid.activeColName = "";
	$.fn.coolGrid.activeSortOrder = "";
})(jQuery);