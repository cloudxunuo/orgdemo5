//Our coolMenu jquery plugin for automatic menu creation
//Author:Xuezi Zhang
//Version:1.0
//jQuery插件，用于自动从指定数据库读取菜单项条目
//生成顶层主菜单导航和侧边的副导航栏
//作者：张学孜
//版本：1.0
(function($){
	//入口参数：config参数：JSP页面中的配置信息
    $.fn.coolMenu = function(config){
        //初始化startLevel参数：根节点开始层数
    	$.fn.coolMenu.startLevel = config.startLevel;
    	//初始化前台传入的MapModel参数：配置后台数据库字段到前台插件的所需要的数据项的映射关系
		$.fn.coolMenu.mapModel = config.mapModel;
		//初始化tableName参数：配置数据库对应表单名称
		$.fn.coolMenu.tableName = config.tableName;
		//合并默认参数和配置参数
		$.extend($.fn.coolMenu.options, config);
		//获取调用该函数的jQuery对象
		$.fn.coolMenu.div = $(this);
		
		//初始化url参数，headUrl参数
    	var url = $.fn.coolMenu.options.url;
    	var headUrl = $.fn.coolMenu.options.headUrl;
    	
    	//设置post请求的参数，包括：
    	//opParam后台操作参数，mapModel映射关系,startLevel根节点层数和tableName数据库对应表名
    	var params = {mapModel:JSON.stringify(config.mapModel),
    			opParam:'initial',
    			startLevel:config.startLevel,
    			tableName:config.tableName
    	};
    	//提交Post请求，成功获取后台返回参数后调用回调函数
		$.post(url,params,function(data){
			//获取后台返回值，并将解析返回值中包含菜单项的JSONArray，之后赋值给插件的成员变量
			$.fn.coolMenu.data = data;
			$.fn.coolMenu.result = eval('(' + $.fn.coolMenu.data.records + ')');
			$.fn.coolMenu.itemArray = eval('(' + $.fn.coolMenu.result.records + ')');

			//获取最大层数
			var tmp = eval('(' + $.fn.coolMenu.data.menuLevel + ')');
			$.fn.coolMenu.menuLevel = tmp.menuLevel;
			
			//分割页面为几个div，并画出页面大致布局
			//入口参数：headUrl,会根据该参数读取顶层图片
			drawLayout(headUrl);
			//增加菜单项参数
			addMenu();
			//整合coolGrid插件
			//$("#coolMenuContent").load("table.jsp");
		});
    };
    //加载页面总布局。入口参数：url,顶层图片地址
	function drawLayout(url){
		//用jQuery对象的append加载布局
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
		//初始化顶层菜单
		$("#coolMenuSidebar").append("<ul class='nav nav-list'>"
				+ "<li class='nav-header'>菜单树</li></ul>");
	}
	//生成菜单项
	function addMenu(){
		//加载基本的欢迎信息
		$("#coolMenuNavBar").append("<div class='span3'><a class='brand'>欢迎用户:" 
			+ "管理员" + "</a></div>" + "<ul class='nav' id='coolMenuItem'></ul>");
		
		//加载顶层第一级菜单
		$.each($.fn.coolMenu.itemArray, function(n, value) {
			if(value.MENU_LEVEL == $.fn.coolMenu.startLevel){
				$("#coolMenuItem").append("<li class='dropdown' id='" + value.MENU_CODE + "'>"
					+ "<a class='dropdown-toggle' data-toggle='dropdown' href='#' id='menuAction"
					+ value.MENU_CODE + "'><i class='icon-folder-close'></i>&nbsp"
					+ value.MENU_NAME + "<b class='caret'></b></a>"
					+ "<ul  style='margin-top:-4px' class='dropdown-menu'></ul></li>");
				//click顶层一级菜单项后触发事件，以点击项为根节点加载侧边菜单
				$("#menuAction" + value.MENU_CODE).click(function(){
					addSidebar(value);
				});
				$("#" + value.MENU_CODE).hover(function(){
					$("#" + value.MENU_CODE).removeClass("dropdown");
					$("#" + value.MENU_CODE).addClass("dropdown open");
				});
				$("#" + value.MENU_CODE).mouseleave(function(){
					$("#" + value.MENU_CODE).removeClass("dropdown open");
					$("#" + value.MENU_CODE).addClass("dropdown");
				});
			}
		});
		//判断是否有第二层，如果有则在每一个以及父菜单下加载其相应的直接子菜单项
		if($.fn.coolMenu.menuLevel != $.fn.coolMenu.startLevel){
			$.each($.fn.coolMenu.itemArray, function(n, value){
				if(value.MENU_LEVEL == ($.fn.coolMenu.startLevel + 1)){
					//判断是否是叶节点，是叶节点在顶层append
					if(value.LEAF_FLAG == 'Y'){
						$("#" + value.MENU_FATHER + " ul:first").append("<li id='" + value.MENU_CODE
							+"'><a href='#' id='menuAction" + value.MENU_CODE 
							+ "'><i class='icon-pencil'></i>&nbsp" + value.MENU_NAME + "</a></li>");
					}else{
						//判断是否是叶节点，是非叶节点在顶层append
						$("#" + value.MENU_FATHER + " ul:first").append("<li id='"
							+ value.MENU_CODE + "'><a tabindex='-1' href='#' id='menuAction" + value.MENU_CODE 
							+ "'><i class='icon-zoom-in'></i>&nbsp" + value.MENU_NAME + "</a></li>");
					}
					//点击顶层菜单项所触发的函数，调用addSidebar函数加载或刷新侧边菜单栏
					$("#menuAction" + value.MENU_CODE).click(function(){
						addSidebar(value);
					});
				}
			});
		}
		
		$("#coolMenuItem").append("<li id='coolMenuQuit'><a href='#'>退出</li>");
	}

	//生成左侧菜单树，入口参数：所点击的点击顶层菜单项
    function addSidebar(item){
    	//一级菜单项图表更新
    	$(".dropdown-toggle >i").removeClass("icon-folder-open");
    	$(".dropdown-toggle >i").addClass("icon-folder-close");
    	$(".dropdown").has("#menuAction" + item.MENU_CODE).find("i :first").removeClass("icon-folder-close");
    	$(".dropdown").has("#menuAction" + item.MENU_CODE).find("i :first").addClass("icon-folder-open");
    	
    	$("#coolMenuSidebar").html("");
    	
    	//侧边菜单项增加根菜单
		$("#coolMenuSidebar").append("<ul class='nav nav-list' id='collapse"
				+ item.MENU_CODE + "'>"
				+ "<li class='nav-header'>" + item.MENU_NAME + "</li></ul>");
    	//如果是叶节点，则执行跳转函数
    	if(item.LEAF_FLAG == 'Y')
    		leafItemClick(item);
    	//如果不是则加载其直接子菜单项
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
    
    //点击叶节点都的跳转，入口参数：所触发点击事件的菜单项
    function leafItemClick(item){
    	//根据其PROG_PARAM属性和PROG_URL属性拼凑出跳转的URL
		var linkUrl;
		if(item.PROG_PARAM == undefined)
			linkUrl = item.PROG_URL;
		else
			linkUrl = item.PROG_URL + "?" + "proj_param=" + item.PROG_PARAM;
		$("#coolMenuContent").html("");
		//$("#coolMenuContent").load("table.jsp");
		//执行跳转，此处用div content中文字的修改作为演示
		$("#coolMenuContent").append("<div>欢迎到" + item.MENU_CODE + "页面。地址:" + linkUrl + "</div>");
    }
    
    //点击侧边菜单项所触发的函数
    //入口参数：点击的菜单项
    function sideItemClick(item){
    	//如果是未展开的非叶菜单项，则更改其图标为放大镜放大
		if($("#sideAction" + item.MENU_CODE).attr("class") == "collapsed"){
			$("#sideAction" + item.MENU_CODE + " i").removeClass("icon-zoom-in");
			$("#sideAction" + item.MENU_CODE + " i").addClass("icon-zoom-out");
		}else{
			//如果已未展开的非叶菜单项，则更改其图标为放大镜放大
			$("#sideAction" + item.MENU_CODE + " i").removeClass("icon-zoom-out");
			$("#sideAction" + item.MENU_CODE + " i").addClass("icon-zoom-in");
		}
		//如果是叶节点，则会执行跳转函数
    	if(item.LEAF_FLAG == 'Y')
    	{	
    		$("#coolMenuSidebar li").removeClass("active");
    		$("#sideAction" + item.MENU_CODE).parent().addClass("active");
    		leafItemClick(item);
    	}else{
    		//如果是非叶节点，则会加载其直接子节点
    		if($("#collapse" + item.MENU_CODE + ">li").length == 0)
    			appendSideItem(item);
    	}
    }
    
    //根据父菜单项加载直接子菜单，入口参数：父菜单项
    function appendSideItem(item){
		$.each($.fn.coolMenu.itemArray, function(n, value) {
			//如果是点击项的直接子菜单项，则在父菜单项的id下加载，但叶节点和非叶节点有不一样的加载规则
			if(value.MENU_FATHER == item.MENU_CODE){
				if(value.LEAF_FLAG == 'Y'){
					$("#collapse" + value.MENU_FATHER).append("<li><a href='#' id='sideAction"
							+ value.MENU_CODE + "'>" + "<i class='icon-pencil'></i>"
							+ value.MENU_NAME + "</a></li>");
				}else{
					//加载非叶节点时会Append Bootstrap的nav-list插件
					$("#collapse" + value.MENU_FATHER).append("<li><ul class='nav nav-list'>"
							+ "<a href='#' id='sideAction" + value.MENU_CODE
							+ "' class='collapsed' data-toggle='collapse' data-target='#collapse"
							+ value.MENU_CODE + "'><i class='icon-zoom-in'></i>" + value.MENU_NAME
							+ "</a><ul class='nav nav-list'><div id='collapse" + value.MENU_CODE
							+ "' class='collapse'></div></ul></li>");
				}
				//绑定点击菜单项所触发的事件函数
				$("#sideAction" + value.MENU_CODE).click(function(){
					sideItemClick(value);
				});
			}
		});
    }
    
    //各种coolMenu的成员变量
    $.fn.coolMenu.startLevel;
    $.fn.coolMenu.tableName;
    $.fn.coolMenu.mapModel;
    $.fn.coolMenu.result;
    $.fn.coolMenu.itemArray;
    $.fn.coolMenu.menuLevel;
    $.fn.coolMenu.data;
	$.fn.coolMenu.options = {};
	$.fn.coolMenu.div;
    $.fn.coolMenu.defaults = {};    
})(jQuery);
