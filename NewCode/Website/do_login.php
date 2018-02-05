<?php
session_start();
$number = 1;
if(isset($_POST['do_login']))
	{
	$logins = array(
   	'p.c.riesebos@st.hanze.nl' => 'test321',
   	'Mark' => 'test',
   	'Bart' => 'test',
    'Jaron' => 'test',
	);

	$user = isset($_POST['email']) ? ($_POST['email']) : '';
	$pass = isset($_POST['password']) ? $_POST['password'] : '';

	if (isset($logins[$user]) && $logins[$user] == $pass)
	 	{
			$_SESSION['email'] = $_POST['email'];
			echo "success";
	 	}
	 	else
	 	{
	  		echo "fail";
	 	}
	 	exit();
	}
?>