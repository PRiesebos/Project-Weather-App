<?php
session_start();
	if(!isset($_POST['stationnummber'])){
		
		var_dump($_GET);
		echo $_GET['stn'];
	}
?>