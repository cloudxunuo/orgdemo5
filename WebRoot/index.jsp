<%@ page contentType="text/html; charset=utf-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <title>Bootstrap 101 Template</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="css/bootstrap.css" rel="stylesheet" media="screen">
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
    	$("#dateinput").change(function (){
    		console.log($("dateinput").serializeArray());
    	});
    	
    	$("#fat-btn").click(function () {
	        var btn = $(this);
	        btn.button("loading");
	        setTimeout(function () {
	          btn.button("reset");
	        }, 3000);
      	});
    });
    </script>
  </head>
  <body>
  <button id="fat-btn" type="button" class="btn btn-primary" data-loading-text="Loading...">Loading state</button>
	<!-- Button to trigger modal -->
	<a href="#myModal" role="button" class="btn" data-toggle="modal">Launch
		demo modal</a>

	<!-- Modal -->
	<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true" style="top: 100px">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3 id="myModalLabel">Modal header</h3>
		</div>
		<div class="modal-body">
			<p>One fine body…</p>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
			<button class="btn btn-primary">Save changes</button>
		</div>
	</div>
	<div class="alert">
		<button type="button" class="close" data-dismiss="alert">&times;</button>
		<strong>Warning!</strong> Best check yo self, you're not looking too
		good.
	</div>
	<div class="row">
		<div class="span3 offset3" style="background-color:#777;">cloud</div>
	</div>
	<div class="row">
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
		<div class="span1" style="background-color:#777;">哈哈哈</div>
	</div>
	<div class="row">
		<div class="span4" style="background-color:#777;">哈哈哈</div>
		<div class="span3 offset6" style="background-color:#777;">哈哈哈</div>
	</div>
	<div class="row">
		<div class="span9" style="background-color:#ddd;">
			Level 1 column
			<div class="row">
				<div class="span6" style="background-color:#777;">Level 2</div>
				<div class="span3" style="background-color:#777;">Level 2</div>
			</div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span4" style="background-color:#777;">...</div>
		<div class="span8" style="background-color:#777;">...</div>
	</div>
	<div class="container" style="background-color:#ddd;"></div>
	<div class="container-fluid" style="background-color:#eee;">
		<div class="row-fluid" style="background-color:#aaa;">
			<div class="span2" style="background-color:#777;">
				<!--Sidebar content-->
			</div>
			<div class="span10" style="background-color:#777;">
				<abbr title="HyperText Markup Language" class="initialism">HTML</abbr>
			</div>
		</div>
	</div>
	<pre class="pre-scrollable">
  		&lt;p&gt;Sample text here...&lt;/p&gt;
  		haha
  		section
  		&lt;section&gt;
  		lala
  		lala
  		lala
  		lala
  		lala
  		lala
  		lala
  		lala;
  		int i = 0;
  		lala
  		lala
  		lala
  		lala
  		lala
  		lala
  		lala
  		lala
	</pre>
	<code>哈哈哈</code>
	<table class="table table-striped table-bordered table-hover">
		<caption>test</caption>
		<tr><th>#</th><th>First Name</th><th>Last Name</th><th>Username</th></tr>
		<tr><td rowspan="2">1</td><td>哈哈哈</td><td>哈哈哈</td><td>哈哈哈</td></tr>
		<tr><td>哈哈哈</td><td>哈哈哈</td><td>哈哈哈</td></tr>
		<tr><td>2</td><td>哈哈哈</td><td>哈哈哈</td><td>哈哈哈</td></tr>
		<tr><td>3</td><td colspan="2">哈哈哈</td><td>哈哈哈</td></tr>
	</table>
	<form>
	  	<fieldset>
	    <legend>Legend</legend>
	    <label>Label name</label>
	    <input type="text" placeholder="Type something…">
	    <span class="help-block">Example block-level help text here.</span>
	    <label class="checkbox">
	      <input type="checkbox"> Check me out
	    </label>
	    <button type="submit" class="btn">Submit</button>
	  	</fieldset>
	</form>
	<form class="form-search">
		<input type="text" class="input-medium search-query" placeholder="哈哈">
		<button type="submit" class="btn">Search</button>
	</form>
	<div class="input-append">
  <input class="span2" id="appendedDropdownButton" type="text">
  <div class="btn-group">
    <button class="btn dropdown-toggle" data-toggle="dropdown">
      Action
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a href="#">Action</a></li>
      <li><a href="#">Action2</a></li>
      <li><a href="#">Action3</a></li>
    </ul>
  </div>
</div>
<input id="dateinput" type="date" required value="2012-03-12">
<div class="btn-toolbar">
  <div class="btn-group">
    <a class="btn" href="#"><i class="icon-align-left"></i></a>
    <a class="btn" href="#"><i class="icon-align-center"></i></a>
    <a class="btn" href="#"><i class="icon-align-right"></i></a>
    <a class="btn" href="#"><i class="icon-align-justify"></i></a>
  </div>
</div>
</body>
</html>