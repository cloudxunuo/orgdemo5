/*
 * My Form Plugin
 */
;
(function($) {
	$.fn.coolForm = function(options) {
		var settings = $.extend($.fn.coolForm.defaults, options);
		var $this = $(this);
		if (settings.width != undefined) {
			$this.width(settings.width);
		}
		$this.append("<form action='" + settings.url + "' method='"
				+ settings.type + "'class='form-horizontal'></form>");
		var $form = $this.children("form");
		$form.append("<fieldset></filedset>");
		var $fieldset = $form.children("fieldset");
		if (settings.title != undefined) {
			$fieldset.append("<legend>" + settings.title + "</legend>");
			var $legend = $fieldset.children("legend");
			if(settings.title_align != undefined) $legend.attr("align",settings.title_align);
		}
		$fieldset.append("<div class='row-fluid'><div class='span"
				+ settings.columns + "'></div></div>");
		var $container = $fieldset.children("div").children("div");
		$container.append("<div class='row-fluid'></div>");
		var count = 0;
		for ( var i in settings.fields) {
			count = count + settings.fields[i].span;
			if (count > settings.columns) {
				$container.append("<div class='row-fluid'></div>");
				count = settings.fields[i].span;
			}
			var $lastRow = $container.children("div").filter(":last");
			if(settings.fields[i].type != "group")
			$lastRow.append("<div class='span" + settings.fields[i].span
					+ "'></div>");
			var $lastSpan = $lastRow.children("div").filter(":last");
			switch (settings.fields[i].type) {
			case "text":
				$lastSpan
						.append("<div class='control-group'><label class='control-label'>"
								+ settings.fields[i].display + "</label></div>");
				$lastSpan
						.children("div")
						.append(
								"<div class='controls'><input type='text' class='input'></div>");
				if (settings.fields[i].key == true)
					$lastSpan.children("div").children("div").children("input")
							.attr("key", "true");
				if(settings.fields[i].center == true){
					$lastSpan.attr("style","text-align:center");
				}
				break;
			case "password":
				$lastSpan
						.append("<div class='control-group'><label class='control-label'>"
								+ settings.fields[i].display + "</label></div>");
				$lastSpan
						.children("div")
						.append(
								"<div class='controls'><input type='password' class='input'></div>");
				break;
			case "hidden":
				$lastSpan
						.append("<div class='control-group'><label class='control-label'>"
								+ settings.fields[i].display + "</label></div>");
				$lastSpan
						.children("div")
						.append(
								"<div class='controls'><input type='hidden' class='input'></div>");
				if (settings.fields[i].key == true)
					$lastSpan.children("div").children("div").children("input")
							.attr("key", "true");
				break;
			case "textarea":
				$lastSpan
						.append("<div class='control-group'><label class='control-label'>"
								+ settings.fields[i].display + "</label></div>");
				$lastSpan.children("div").append(
						"<div class='controls'><textarea></textarea></div>");
				break;
			case "select":
				$lastSpan
						.append("<div class='control-group'><label class='control-label'>"
								+ settings.fields[i].display + "</label></div>");
				$lastSpan
						.children("div")
						.append(
								"<div class='controls'><select class='input'></select></div>");
				for ( var j in settings.fields[i].values) {
					$lastSpan.children("div").children("div")
							.children("select").append(
									"<option>" + settings.fields[i].values[j]
											+ "</option>");
				}
				break;
			case "checkbox":
				$lastSpan
						.append("<div class='control-group'><label class='control-label'>"
								+ settings.fields[i].display + "</label></div>");
				$lastSpan.children("div").append("<div class='controls'>");
				for ( var j in settings.fields[i].values) {
					$lastSpan.children("div").children("div")
							.append(
									"<label class='checkbox inline'><input type='checkbox' name='"
											+ settings.fields[i].name + "'>"
											+ settings.fields[i].values[j]
											+ "</label>");
				}
				$lastSpan.children("div").append("</div>");
				break;
			case "radio":
				$lastSpan
						.append("<div class='control-group'><label class='control-label'>"
								+ settings.fields[i].display + "</label></div>");
				$lastSpan.children("div").append("<div class='controls'>");
				for ( var j in settings.fields[i].values) {
					$lastSpan.children("div").children("div")
							.append(
									"<label class='radio inline'><input type='radio' name='"
											+ settings.fields[i].name + "'>"
											+ settings.fields[i].values[j]
											+ "</label>");
				}
				$lastSpan.children("div").append("</div>");
				break;
			case "group":
				$container.append("<div style='border:solid 1px #aaa;'></div>");
				$group = $container.children("div").filter(":last");
				$group.append("<div class='row-fluid'></div>");
				count = 0;
				for ( var j in settings.fields[i].group) {
					count = count + settings.fields[i].group[j].span;
					if (count > settings.columns) {
						$group.append("<div class='row-fluid'></div>");
						count = settings.fields[i].group[j].span;
					}
					$lastRow = $group.children("div").filter(":last");
					$lastRow.append("<div class='span"
							+ settings.fields[i].group[j].span + "'></div>");
					$lastSpan = $lastRow.children("div").filter(":last");
					switch (settings.fields[i].group[j].type) {
					case "text":
						$lastSpan
								.append("<div class='control-group'><label class='control-label'>"
										+ settings.fields[i].group[j].display
										+ "</label></div>");
						$lastSpan
								.children("div")
								.append(
										"<div class='controls'><input type='text' class='input'></div>");
						if (settings.fields[i].group[j].key == true)
							$lastSpan.children("div").children("div").children(
									"input").attr("key", "true");
						break;
					}
				}
				break;
			}
		}
		$container.append("<div class='row-fluid'></div>");
		var $lastRow = $container.children("div").filter(":last");
		$lastRow
				.append("<div style='text-align:right;padding-top:5px;padding-right:20px;' class='span"
						+ settings.columns + "'></div>");
		var $lastSpan = $lastRow.children("div").filter(":last");
		for ( var i in settings.buttons) {
			switch (settings.buttons[i]) {
			case "query":
				$lastSpan
						.append("<input type='button' value='查询' class='btn'>");
				$lastSpan.children("input").filter(":last").bind("click",
						function() {
							$.get(settings.url, function(data) {
								alert(data);
							})
						});
				break;
			case "save":
				$lastSpan
						.append("<input type='button' value='保存' class='btn'>");
				$lastSpan.children("input").filter(":last").bind("click",
						function() {
							$.get(settings.url, function(data) {
								alert(data);
							})
						});
				break;
			case "reset":
				$lastSpan.append("<input type='reset' value='重置' class='btn'>");
				break;
			default:
				$lastSpan.append("<input type='button' value='"
						+ settings.buttons[i].display + "' class='btn'>");
				$lastSpan.children("input").filter(":last").bind("click",
						settings.buttons[i].click);
				break;
			}
		}
	};
	$.fn.coolForm.defaults = {
		url : null,
		type : "GET",
		columns : 12,
		fields : null,
		buttons : null
	};
})(jQuery);