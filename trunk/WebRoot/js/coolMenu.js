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

			$.fn.coolMenu.result = eval('(' + $.fn.coolMenu.data.records + ')');
			$.fn.coolMenu.itemArray = eval('(' + $.fn.coolMenu.result.records + ')');
			
			var tmp = eval('(' + $.fn.coolMenu.data.menuLevel + ')');

			$.fn.coolMenu.menuLevel = tmp.menuLevel;
			
			drawLayout();
			addMenu(headUrl);
			//$("#coolMenuContent").load("table.jsp");
		});
    };
    
	function drawLayout(){
		$.fn.coolMenu.div.append("<div class='container'>" +
				"<div class='span12'>" + "<div class='row-fluid' id='coolMenuHead'></div>" +
				"<div class='row-fluid'>" +
				"<div class='navbar'><div class='navbar-inner' id='coolMenuNavBar'></div>" + 
				"</div></div>" +
				"<div class='container' id='coolMenuBottom'>" +
				"<div class='row-fluid'><div class='span3'>" +
				"<div id='coolMenuSidebar' style='position:absolute; height:400px; overflow:auto'>菜单树未生成，请点击顶层菜单项</div></div>" +
				"<div class='span9'><div class='container' id='coolMenuContent'>" +
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
			
			$.each($.fn.coolMenu.itemArray, function(n, value) {
				if(value.MENU_LEVEL == 1){
					$("#coolMenuItem").append("<li class='dropdown' id='" + value.MENU_CODE + "'>"
							+ "<a class='dropdown-toggle' data-toggle='dropdown' href='#' id='menuAction"
							+ value.MENU_CODE + "'>" + value.MENU_NAME + "<b class='caret'></b></a>"
							+ "<ul class='dropdown-menu'></ul></li>");
					$("#menuAction" + value.MENU_CODE).click(function(){
						console.log(value.MENU_CODE);
						addSidebar(value);
					});
				}
			});
			
			for(var i = 1; i < $.fn.coolMenu.menuLevel; i++){
				$.each($.fn.coolMenu.itemArray, function(n, value){
					if(value.MENU_LEVEL == (i + 1)){
						if(value.LEAF_FLAG == 'Y'){
							$("#" + value.MENU_FATHER + " ul:first").append("<li id='" + value.MENU_CODE
									+"'><a href='#' id='menuAction" + value.MENU_CODE 
									+ "'>" + value.MENU_NAME + "</a></li>");
						}else{
							$("#" + value.MENU_FATHER + " ul:first").append("<li class='dropdown-submenu' id='"
								+ value.MENU_CODE + "'><a tabindex='-1' href='#' id='menuAction" + value.MENU_CODE 
								+ "'>" + value.MENU_NAME + "</a>" + "<ul class='dropdown-menu'></ul></li>");
						}
						$("#menuAction" + value.MENU_CODE).click(function(){
							console.log(value.MENU_CODE);
							addSidebar(value);
						});
					}
				});
			}
			$("#coolMenuItem").append("<li id='coolMenuQuit'><a href='#'>退出</li>");
		}
	}

    function addSidebar(item){
    	$("#coolMenuSidebar").html("");
    	
    	if(item.LEAF_FLAG == 'Y')
    		jumpAction(item);
		
		$("#coolMenuSidebar").append("<ul class='nav nav-list' id='collapse"
			+ item.MENU_CODE + "'>"
			+ "<li class='nav-header'>" + item.MENU_NAME + "</li></ul>");
		
		for(var i = item.MENU_LEVEL + 1; i < ($.fn.coolMenu.menuLevel + 1); i++){
			$.each($.fn.coolMenu.itemArray, function(n, value){
				if(value.MENU_LEVEL == i && $("#collapse" + value.MENU_FATHER).length > 0){
					if(value.LEAF_FLAG == 'Y'){
						$("#collapse" + value.MENU_FATHER).append("<li><a href='#' id='sideAction"
								+ value.MENU_CODE + "'>" + value.MENU_NAME + "</a></li>");
						$("#sideAction" + value.MENU_CODE).click(function(){
							console.log(value.MENU_CODE);
							jumpAction(value);
						});
					}else{					
						$("#collapse" + value.MENU_FATHER).append("<ul class='nav nav-list'><li>"
							+ "<a href='#' id='sideAction" + value.MENU_CODE
							+ "' class='collapsed' data-toggle='collapse' data-target='#collapse"
							+ value.MENU_CODE + "'>" + value.MENU_NAME + "</a>"
							+ "<ul class='nav nav-list'><div id='collapse" + value.MENU_CODE
							+ "' class='collapse'></div></ul></li></ul>");
					}
				}
			});
		}
    }
    
    function jumpAction(item){
		var linkUrl;
		if(item.PROG_PARAM == undefined)
			linkUrl = item.PROG_URL;
		else
			linkUrl = item.PROG_URL + "?" + "proj_param=" + item.PROG_PARAM;
		$("#coolMenuContent").html("");
		//$("#coolMenuContent").load("table.jsp");
		$("#coolMenuContent").append("<div>欢迎到" + item.MENU_CODE + "页面。地址:" + linkUrl + "</div>");
    }
    /*
    function sidebarItemClick(item){
    	if(item.LEAF_FLAG == 'Y')
    		jumpAction(item);
    	else{
    		if($("#side" + item.MENU_CODE + " ul").length > 0){
    			$("#side" + item.MENU_CODE).html("<a href='#' id='sideAction" + item.MENU_CODE
    				+ "'>" + item.MENU_NAME + "</a>");
				$("#sideAction" + item.MENU_CODE).click(function(){
					sidebarItemClick(item);
				});
    		}else{		
    			$.each($.fn.coolMenu.itemArray, function(n, value) {
    				if(value.MENU_FATHER == item.MENU_CODE){
    					$("#side" + value.MENU_FATHER).append("<ul class='nav nav-list'><li id='side" +
    						value.MENU_CODE + "'><a href='#' id='sideAction" + value.MENU_CODE + "'>"
    						+ value.MENU_NAME +"</a></li></ul>");
    					
    					$("#sideAction" + value.MENU_CODE).click(function(){
    						sidebarItemClick(value);
    					});
    				}
    			});
    		}
    	}
    }
    */

    $.fn.coolMenu.result;
    $.fn.coolMenu.itemArray;
    $.fn.coolMenu.menuLevel;
    $.fn.coolMenu.data;
	$.fn.coolMenu.options = {};
	$.fn.coolMenu.div;
    $.fn.coolMenu.defaults = {};    
})(jQuery);
