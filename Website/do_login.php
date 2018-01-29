<?php
session_start();
if(isset($_POST['do_login']))
	{
	$lines = file('logindata.txt');
	$credentials = array();

	foreach($lines as $line) {
		if(empty($line)) continue;

		// whole line
		$line = trim(str_replace(": ", ':', $line));
		$lineArr = explode(' ', $line);

		// username only
		$username = explode(':', $lineArr[0]);
		$username = array_pop($username);

		// password
		$password = explode(':', $lineArr[1]);
		$password = array_pop($password);

		// putting them together
		$credentials[$username] = $password;
	}

	$user = isset($_POST['email']) ? ($_POST['email']) : '';
	$pass = isset($_POST['password']) ? $_POST['password'] : '';

	if (isset($credentials[$user]) || $credentials[$user] == $pass)
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