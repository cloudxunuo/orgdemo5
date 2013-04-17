/*
 * My Form Plugin
 */
;
(function($) {
	$.fn.myForm = function(options) {
		var settings = $.extend($.fn.myForm.defaults, options);
		var $this = $(this);
		if (settings.width != undefined) {
			$this.width(settings.width);
		}
		$this.append("<form action='" + settings.url + "' method='"
				+ settings.type + "'class='form-horizontal'></form>");
		var $form = $this.children("form");
		$form.append("<fieldset style='border:solid 1px #aaa;position:relative;'></filedset>");
		var $fieldset = $form.children("fieldset");
		if (settings.title != undefined) {
			$fieldset.append("<legend>" + settings.title + "</legend>");
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
			$lastRow.append("<div class='span" + settings.fields[i].span
					+ "'></div>");
			var $lastSpan = $lastRow.children("div").filter(":last");
			$lastSpan
					.append("<div class='control-group'><label class='control-label'>"
							+ settings.fields[i].display + "</label></div>");
			switch (settings.fields[i].type) {
			case "text":
				$lastSpan
						.children("div")
						.append(
								"<div class='controls'><input type='text' class='input-xlarge'></div>");
				if (settings.fields[i].validation != undefined) {
					if (settings.fields[i].validation.required == true) {
						$lastSpan
								.children("div")
								.children("div")
								.append(
										"<span style='color:red;margin-left:10px;font-size:30px;' class='help-inline'>*</span>");
					}
					if (settings.fields[i].validation.min != undefined
							|| settings.fields[i].validation.max != undefined) {
						var min = settings.fields[i].validation.min;
						var max = settings.fields[i].validation.max;
						$lastSpan.children("div").children("div").children(
								"input").blur(
								function() {
									$(this).parent().find(".help-inline")
											.remove();

									if (min != undefined
											&& this.value.length < min) {
										$(this).after(
												"<span class='help-inline'>长度至少为"
														+ min + "位</span>");
									}
									if (max != undefined
											&& this.value.length > max) {
										$(this).after(
												"<span class='help-inline'>长度至多为"
														+ max + "位</span>");
									}
								});
					}
				}
				break;
			case "password":
				$lastSpan
						.children("div")
						.append(
								"<div class='controls'><input type='password' class='input-xlarge'></div>");
				if (settings.fields[i].validation != undefined) {
					if (settings.fields[i].validation.required == true) {
						$lastSpan
								.children("div")
								.children("div")
								.append(
										"<span style='color:red;margin-left:10px;font-size:30px;' class='help-inline'>*</span>");
					}
					if (settings.fields[i].validation.min != undefined
							|| settings.fields[i].validation.max != undefined) {
						var min = settings.fields[i].validation.min;
						var max = settings.fields[i].validation.max;
						$lastSpan.children("div").children("div").children(
								"input").blur(
								function() {
									$(this).parent().find(".help-inline")
											.remove();

									if (min != undefined
											&& this.value.length < min) {
										$(this).after(
												"<span class='help-inline'>长度至少为"
														+ min + "位</span>");
									}
									if (max != undefined
											&& this.value.length > max) {
										$(this).after(
												"<span class='help-inline'>长度至多为"
														+ max + "位</span>");
									}
								});
					}
				}
				break;
			case "hidden":
				$lastSpan
						.children("div")
						.append(
								"<div class='controls'><input type='hidden' class='input-xlarge'></div>");
				break;
			case "textarea":
				$lastSpan.children("div").append(
						"<div class='controls'><textarea></textarea></div>");

				break;
			case "select":
				$lastSpan
						.children("div")
						.append(
								"<div class='controls'><select class='input-xlarge'></select></div>");
				for ( var j in settings.fields[i].values) {
					$lastSpan.children("div").children("div")
							.children("select").append(
									"<option>" + settings.fields[i].values[j]
											+ "</option>");
				}
				break;
			case "checkbox":
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
	$.fn.myForm.defaults = {
		url : null,
		type : "GET",
		columns : 12,
		fields : null,
		buttons : null
	};
})(jQuery);