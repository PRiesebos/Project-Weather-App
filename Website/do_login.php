<?php
session_start();
if(isset($_POST['do_login']))
	{
	if (($_POST["email"] == "Peter") && ($_POST["password"] == "test"))
	 	{
			// $file = file_get_contents('logindata.txt', FILE_USE_INCLUDE_PATH);
			// var_dump($file);
			echo "success";
	 	}
	 	else
	 	{
	  		echo "fail";
	 	}
	 	exit();
	}
?>