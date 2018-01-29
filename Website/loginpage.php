<!DOCTYPE html>

<?php
session_start();
?>

<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <script src="project.js"></script>
    <link rel="stylesheet" href="project.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,400,700|Roboto:300,400,500,700" rel="stylesheet">
    <title>Login</title>
</head>

<body>
    <script type="text/javascript">
    window.onload = rememberUsername;
    </script>
    <div class="wrapper-login">
        <div class="login">
            <div id="login-header">
                <div id="title">Member login</div>
                <i id="login-icon"></i>
                <p>Universitas Indonesia Weather App</p>
            </div>
            <div id="login-body">
                <form name="myForm" id="ajax-login" onsubmit="return do_login();" method="post" action="do_login.php">
                    <div class="form-group">
                        <input class="form-control" type="text" id="email" name="email" placeholder="Username">
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="password" id="password" name="password" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <button class="submitbtn" onclick="setUsername();" type="submit" name="login" value="DO LOGIN">Submit</button>
                    </div>
                </form>
            </div>
            <div id="login-footer">
                <div class="checkbox-button">
                    <input type="checkbox" id="myCheckbox" name="username" onchange="checkboxChanged()">Remember Username
                </div>
            </div>
        </div>
    </div>
</body>

</html>