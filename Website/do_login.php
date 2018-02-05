<?php
session_start();
$number = 1;
if(isset($_POST['do_login']))
	{
/*	
 * Possible file reading

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
*/

	$logins = array(
    'mp.boonstra@datacraft.nl' => 'longpassword',
	'jaron' => 'test'
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