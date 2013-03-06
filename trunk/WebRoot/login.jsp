<%@ page contentType="text/html;charset=utf-8" language="java"%>
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
<script type="text/javascript" src="js/bootstrap.js"></script>
<script src="http://code.jquery.com/jquery.js"></script>
<style type="text/css">
body {
background-color: #eee;
overflow: visible;
}

input.login {
	height: 40px;
	line-height: 35px;
	width: 300px;
	margin-top: 20px;
}

button.login{
	height: 40px;
	width: 300px;
	margin-top: 20px;
}

a, a:visited {
color: #5b5b5b;
text-decoration: none;
font-size: 12px;
}

a:hover, a:focus {
color: #5b5b5b;
text-decoration: none;
}

</style>
</head>
<body>
	<div class="row">
		<div class="span7" style="margin-top:100px">
			<img src="img/gaara.png" class="img-rounded" style="margin-top:20px;margin-left:100px;">
		</div>
		<div class="span5" style="margin-top:100px">
			<form action="mylogin.action" method="post">
				<input type="text" class="login" name="user.username"
					placeholder="请输入用户名"> <input type="password" class="login"
					name="user.password" placeholder="请输入密码">
				<div><button class="btn btn-success login">登陆</button></div>
			</form>
			<div class="login-nav">
				<a href="#"><i class="icon-info-sign"></i>(C)哈尔滨工业大学软件学院</a> <span
					class="split">|</span> <a href="#">联系我们</a>
			</div>
		</div>
	</div>
</body>
</html>