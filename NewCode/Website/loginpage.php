<!DOCTYPE html>

<?php
session_start();
if(isset($_SESSION['email']))
{
    header("Location:index.php");
}

// Define variables and set to empty values.
$email = $password = $pass = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = test_input($_POST["email"]);
  $password = test_input($_POST["password"]);
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
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
                <form name="myForm" id="ajax-login" onsubmit="return do_login();" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                    <div class="form-group">
                        <input class="form-control" type="text" id="email" name="email" placeholder="Username" required>
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="password" id="password" name="password" placeholder="Password" required>
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