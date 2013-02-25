<%@ page contentType="text/html;charset=utf-8" language="java"%>
<html>
<head>
<link rel="stylesheet" type="text/css" href="css/demo.css" />
<script type="text/javascript" src="js/input.js"></script>
</head>
<body>
	<div class="bd">
		<div class="inner">
			<div class="banner"></div>
			<div id="login" class="main">
				<div id="normal_login">
					<form action="mylogin.action" method="post">
						<div id="web_login">
							<input type="text" class="login" name="user.username" value="请输入账号"
								onFocus="onFocus(this)" onBlur="onBlur(this)"> <input
								type="text" class="login" name="user.password" value="请输入密码"
								onFocus="onFocus(this)" onBlur="onBlur(this)">
							<button class="btn-login"></button>
						</div>
					</form>
				</div>
				<div class="login-nav">
                <a href="#"><i class="i-info"></i>(C)哈尔滨工业大学软件学院</a>
                <span class="split">|</span>
                <a href="#">联系我们</a>
            </div>
			</div>
		</div>
	</div>
</body>
</html>