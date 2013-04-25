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
    	
    	var params = {opParam:'initial'};
    	
		$.post(url,params,function(data){
			$.fn.coolMenu.data = data;

			$.fn.coolMenu.result = eval('(' + $.fn.coolMenu.data.records + ')');
			$.fn.coolMenu.itemArray = eval('(' + $.fn.coolMenu.result.records + ')');
			
			var tmp = eval('(' + $.fn.coolMenu.data.menuLevel + ')');
			$.fn.coolMenu.menuLevel = tmp.menuLevel;
			
			drawLayout(headUrl);			
			addMenu();
			
			//$("#coolMenuContent").load("table.jsp");
		});
    };
    //加载页面总布局
	function drawLayout(url){
		//加载布局
		$.fn.coolMenu.div.append("<div class='container-fluid'><div class='span12'>"
			+ "<div class='row-fluid' id='coolMenuHead'></div>"
			+ "<div class='row-fluid'><div class='navbar'>"
			+ "<div class='navbar-inner' id='coolMenuNavBar'></div></div>"
			+ "<div class='container-fluid' id='coolMenuBottom'></div>"
			+ "</div></div>");
		
		//读取图片
		$("#coolMenuHead").append("<img src='" + url +"'>");
		//加载底层，包括侧边和主界面
		$("#coolMenuBottom").append("<div class='row-fluid'><div class='span3'>"
			+ "<div id='coolMenuSidebar'"
			+ "style='position:absolute; height:450px; overflow:auto'></div></div>"
			+ "<div class='span9'><div class='container-fluid' id='coolMenuContent'>"
			+ "</div></div></div>"
		);
		$("#coolMenuSidebar").append("<ul class='nav nav-list'>"
				+ "<li class='nav-header'>菜单树</li></ul>");
	}
	//生成菜单项
	function addMenu(){
		//如果只有一层，则顶层只显示欢迎界面
		if($.fn.coolMenu.menuLevel == 1){
			$("#coolMenuNavBar").append("<div class='span11'><a class='brand'>欢迎用户:" 
					+ "管理员" + "</a></div>" + "<ul class='nav'><li><a href='#'>退出</li></ul>");
			
			$.each($.fn.coolMenu.itemArray, function(n, value){
				if(value.MENU_LEVEL == 0)
					addSidebar(value);
			});
		}else{
			$("#coolMenuNavBar").append("<div class='span3'><a class='brand'>欢迎用户:" 
					+ "管理员" + "</a></div>" + "<ul class='nav' id='coolMenuItem'></ul>");
			
			$.each($.fn.coolMenu.itemArray, function(n, value) {
				if(value.MENU_LEVEL == 1){
					$("#coolMenuItem").append("<li class='dropdown' id='" + value.MENU_CODE + "'>"
							+ "<a class='dropdown-toggle' data-toggle='dropdown' href='#' id='menuAction"
							+ value.MENU_CODE + "'><i class='icon-tags'></i>&nbsp"
							+ value.MENU_NAME + "<b class='caret'></b></a>"
							+ "<ul  style='margin-top:-4px' class='dropdown-menu'></ul></li>");
					$("#menuAction" + value.MENU_CODE).click(function(){
						addSidebar(value);
					});
				}
				$("#" + value.MENU_CODE).hover(function(){
					$("#" + value.MENU_CODE).removeClass("dropdown");
					$("#" + value.MENU_CODE).addClass("dropdown open");
				});
				$("#" + value.MENU_CODE).mouseleave(function(){
					$("#" + value.MENU_CODE).removeClass("dropdown open");
					$("#" + value.MENU_CODE).addClass("dropdown");
				});
			});
			
			$.each($.fn.coolMenu.itemArray, function(n, value){
				if(value.MENU_LEVEL == 2){
					if(value.LEAF_FLAG == 'Y'){
						$("#" + value.MENU_FATHER + " ul:first").append("<li id='" + value.MENU_CODE
								+"'><a href='#' id='menuAction" + value.MENU_CODE 
								+ "'><i class='icon-pencil'></i>&nbsp" + value.MENU_NAME + "</a></li>");
					}else{
						$("#" + value.MENU_FATHER + " ul:first").append("<li id='"
							+ value.MENU_CODE + "'><a tabindex='-1' href='#' id='menuAction" + value.MENU_CODE 
							+ "'><i class='icon-zoom-in'></i>&nbsp" + value.MENU_NAME + "</a></li>");
					}
					$("#menuAction" + value.MENU_CODE).click(function(){
						console.log(value.MENU_CODE);
						addSidebar(value);
					});
				}
			});
			$("#coolMenuItem").append("<li id='coolMenuQuit'><a href='#'>退出</li>");
		}
	}

	//生成左侧菜单树
    function addSidebar(item){
    	$("#coolMenuSidebar").html("");
    	
		$("#coolMenuSidebar").append("<ul class='nav nav-list' id='collapse"
				+ item.MENU_CODE + "'>"
				+ "<li class='nav-header'>" + item.MENU_NAME + "</li></ul>");
    	
    	if(item.LEAF_FLAG == 'Y')
    		leafItemClick(item);
		else{	
			$.each($.fn.coolMenu.itemArray, function(n, value){
				if(value.MENU_LEVEL == (item.MENU_LEVEL + 1) && $("#collapse" + value.MENU_FATHER).length > 0){
					if(value.LEAF_FLAG == 'Y'){
						$("#collapse" + value.MENU_FATHER).append("<li><a href='#' id='sideAction"
								+ value.MENU_CODE + "'>" + "<i class='icon-pencil'></i>"
								+ value.MENU_NAME + "</a></li>");
					}else{					
						$("#collapse" + value.MENU_FATHER).append("<li><ul class='nav nav-list'>"
							+ "<a href='#' id='sideAction" + value.MENU_CODE
							+ "' class='collapsed' data-toggle='collapse' data-target='#collapse"
							+ value.MENU_CODE + "'><i class='icon-zoom-in'></i>" + value.MENU_NAME
							+ "</a><ul class='nav nav-list'><div id='collapse" + value.MENU_CODE
							+ "' class='collapse'></div></ul></li>");
					}
					$("#sideAction" + value.MENU_CODE).click(function(){
						sideItemClick(value);
					});
				}
			});
    	}
	}
    
    //点击叶节点都的跳转
    function leafItemClick(item){
		var linkUrl;
		if(item.PROG_PARAM == undefined)
			linkUrl = item.PROG_URL;
		else
			linkUrl = item.PROG_URL + "?" + "proj_param=" + item.PROG_PARAM;
		$("#coolMenuContent").html("");
		//$("#coolMenuContent").load("table.jsp");
		$("#coolMenuContent").append("<div>欢迎到" + item.MENU_CODE + "页面。地址:" + linkUrl + "</div>");
    }
    
    function sideItemClick(item){
    	if(item.LEAF_FLAG == 'Y')
    	{	
    		$("#coolMenuSidebar li").removeClass("active");
    		$("#sideAction" + item.MENU_CODE).parent().addClass("active");
    		leafItemClick(item);
    	}
    	else{
    		if($("#collapse" + item.MENU_CODE + ">li").length == 0)
    			appendSideItem(item);
    		else{
    			
    		}
    	}
    }
    
    function appendSideItem(item){
		$.each($.fn.coolMenu.itemArray, function(n, value) {
			if(value.MENU_FATHER == item.MENU_CODE){
				if(value.LEAF_FLAG == 'Y'){
					$("#collapse" + value.MENU_FATHER).append("<li><a href='#' id='sideAction"
							+ value.MENU_CODE + "'>" + "<i class='icon-pencil'></i>"
							+ value.MENU_NAME + "</a></li>");
				}else{
					$("#collapse" + value.MENU_FATHER).append("<li><ul class='nav nav-list'>"
							+ "<a href='#' id='sideAction" + value.MENU_CODE
							+ "' class='collapsed' data-toggle='collapse' data-target='#collapse"
							+ value.MENU_CODE + "'><i class='icon-zoom-in'></i>" + value.MENU_NAME
							+ "</a><ul class='nav nav-list'><div id='collapse" + value.MENU_CODE
							+ "' class='collapse'></div></ul></li>");
				}
				$("#sideAction" + value.MENU_CODE).click(function(){
					sideItemClick(value);
				});
			}
		});
    }
    
    $.fn.coolMenu.topMenu;
    $.fn.coolMenu.sideMenu;
    $.fn.coolMenu.result;
    $.fn.coolMenu.itemArray;
    $.fn.coolMenu.menuLevel;
    $.fn.coolMenu.data;
	$.fn.coolMenu.options = {};
	$.fn.coolMenu.div;
    $.fn.coolMenu.defaults = {};    
})(jQuery);
