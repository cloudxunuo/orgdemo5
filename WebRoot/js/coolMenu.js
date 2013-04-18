//Our coolMenu jquery plugin for automatic menu creation
//Author:Xuezi Zhang
//Version:1.0
(function($){
    $.fn.coolMenu = function(config){
        //各种属性、参数
		$.extend($.fn.coolMenu.options, config);
		$.fn.coolMenu.div = $(this);

    	var url = $.fn.coolMenu.options.url;
    	var headUrl = $.fn.coolMenu.options.headUrl;
    	
		$.post(url,function(data){
			$.fn.coolMenu.data = data;

			var tmp = eval('(' + $.fn.coolMenu.data.menuLevel + ')');

			$.fn.coolMenu.menuLevel = tmp.menuLevel;
			
			drawLayout();
			addMenu(headUrl);
			$("#coolMenuContent").load("table.jsp");
		});
    	var conf = $.extend($.fn.coolMenu.defaults, config);
    };
    
	function drawLayout(){
		$.fn.coolMenu.div.append("<div class='container'>" +
				"<div class='span11'>" + "<div class='row-fluid' id='coolMenuHead'></div>" +
				"<div class='row-fluid'>" +
				"<div class='navbar'><div class='navbar-inner' id='coolMenuNavBar'></div>" + 
				"</div></div>" +
				"<div class='container' id='coolMenuBottom'>" +
				"<div class='row-fluid'><div class='span2'>" +
				"<div class='container' id='coolMenuSidebar'>菜单树未生成，请点击顶层菜单项</div></div>" +
				"<div class='span10'><div class='container' id='coolMenuContent'>" +
				"</div></div></div></div>");
	}
	
	function addMenu(url){
		$("#coolMenuHead").append("<img src='" + url +"'>");
		if($.fn.coolMenu.menuLevel == 1){
			$("#coolMenuNavBar").append("<div class='span11'><a class='brand'>欢迎用户:" 
					+ "管理员" + "</a></div>" + "<ul class='nav'><li><a href='#'>退出</li></ul>");			
		}else{
			$("#coolMenuNavBar").append("<div class='span3'><a class='brand'>欢迎用户:" 
					+ "管理员" + "</a></div>" + "<ul class='nav' id='coolMenuItem'></ul>");
			var tmp = eval('(' + $.fn.coolMenu.data.records + ')');
			var tmpArray = eval('(' + tmp.records + ')');
			
			$.each(tmpArray,function(n,value) {
				if(value.MENU_LEVEL == 1){
					$("#coolMenuItem").append("<li class='dropdown'>" +
							"<a class='dropdown-toggle' data-toggle='dropdown' href='#'>" + value.MENU_NAME +
								"<b class='caret'></b></a>" +
							"<ul class='dropdown-menu' id='" + value.MENU_CODE + "'></ul></li>");
				}
			});
			
			for(var i = 1; i < $.fn.coolMenu.menuLevel; i++){
				$.each(tmpArray,function(n,value) {
					if(value.MENU_LEVEL == (i + 1)){
						if(value.LEAF_FLAG == 'Y'){
							var linkUrl;
							if(value.PROG_PARAM == undefined)
								linkUrl = value.PROG_URL;
							else
								linkUrl = value.PROG_URL + "?" + "proj_param=" + value.PROG_PARAM;
							$("#" + value.MENU_FATHER).append("<li id='" + value.MENU_CODE
									+"'><a href='#'>" + value.MENU_NAME + "</a></li>");
							$("#" + value.MENU_CODE).click(function(){
								leafClick(value.MENU_LEVEL, value.MENU_CODE, value.SYS_CODE, 
										value.MENU_FATHER ,linkUrl);
							});
						}else{
							$("#" + value.MENU_FATHER).append("<li class='dropdown-submenu'>" +
								"<a tabindex='-1' href='#'>" + value.MENU_NAME + "</a>" +
								"<ul class='dropdown-menu' id='" + value.MENU_CODE + "'></ul></li>");
						}
					}
				});
			}
			$("#coolMenuItem").append("<li id='coolMenuQuit'><a href='#'>退出</li>");
		}
	}

    function leafClick(level, id, part, parent, url){
    	$("#coolMenuSidebar").empty();
    	jumpAction(id, url);
		var tmp = eval('(' + $.fn.coolMenu.data.records + ')');
		var tmpArray = eval('(' + tmp.records + ')');
		var root;
		
		$.each(tmpArray,function(n,value) {
			if(value.MENU_CODE == parent){
				root = value.MENU_FATHER;
			}
		});
		
		$.each(tmpArray,function(n,value) {
			if(value.SYS_CODE == part){
				if(value.MENU_LEVEL == (level - 1) && value.MENU_FATHER == root){
					$("#coolMenuSidebar").append("<ul class='nav nav-list'>"
						+"<li class='nav-header' id='side"
						+ value.MENU_CODE +"'>" + value.MENU_NAME + "</li></ul>");
				}
			}
		});
		
		$.each(tmpArray,function(n,value) {
			if($("#side" + value.MENU_FATHER).length > 0){
				if(id == value.MENU_CODE){
					$("#side" + value.MENU_FATHER).append("<li class='active' id='side" +
						value.MENU_CODE + "'><a href='#'>"+ value.MENU_NAME +"</a></li>");
				}else{
					$("#side" + value.MENU_FATHER).append("<li id='side" +
						value.MENU_CODE + "'><a href='#'>"+ value.MENU_NAME +"</a></li>");
				}
				$("#side" + value.MENU_CODE).click(function(){
					var linkUrl;
					if(value.PROG_PARAM == undefined)
						linkUrl = value.PROG_URL;
					else
						linkUrl = value.PROG_URL + "?" + "proj_param=" + value.PROG_PARAM;
					jumpAction(value.MENU_CODE, linkUrl);
				});
			}
		});
    }
    
    function jumpAction(id, url){
		$("#coolMenuContent").html("");
		$("#coolMenuContent").append("<div>欢迎到" + id + "页面。地址:" + url + "</div>");
    }
    
    $.fn.coolMenu.menuLevel;
    $.fn.coolMenu.data;
	$.fn.coolMenu.options = {};
	$.fn.coolMenu.div;
    
    $.fn.coolMenu.defaults = {};
})(jQuery);
