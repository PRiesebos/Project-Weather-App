<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
function getData() {
	if(!empty($_GET['stationID'])) {
		$stationID = $_GET['stationID'];
		$filename = "http://127.0.0.1/study/2.2/legacywebsite/data/".$stationID.".dat";
		$handle = fopen($filename, "rb");
		$fsize = remote_filesize($filename);
		//$fsize = filesize($filename);
		$contents = fread($handle, $fsize);
		echo "FSIZE: ".$fsize."\n";
		fclose($handle);
		$offset = $fsize - 48;
		$timestamp = decodeLong($contents, 4);
		$temp = decodeFloat($contents, 12);
		$dewp = decodeFloat($contents, 16);
		$stp = decodeFloat($contents, 20);
		$slp = decodeFloat($contents, 24);
		$visib = decodeFloat($contents, 28);
		$wdsp = decodeShort($contents, 32);
		$prcp = decodeFloat($contents, 34);
		$sndp = decodeFloat($contents, 38);
		$frshtt = decodeByte($contents, 42);
		$cldc = decodeShort($contents, 43);
		$wnddir = decodeShort($contents, 45);
		echo "<table>\n";
		echo "	<tr><td>Current time (timestamp)</td><td>".$timestamp."</td></tr>\n";
		echo "	<tr><td>Current temperature (°C)</td><td>".round($temp, 1)."</td></tr>\n";
		echo "	<tr><td>Current dewpoint (°C)</td><td>".round($dewp, 1)."</td></tr>\n";
		echo "	<tr><td>Current pressure at station (millibar)</td><td>".round($stp, 1)."</td></tr>\n";
		echo "	<tr><td>Current sea level pressure (millibar)</td><td>".round($slp, 1)."</td></tr>\n";
		echo "	<tr><td>Current visibility in km</td><td>".round($visib, 1)."</td></tr>\n";
		echo "	<tr><td>Current wind speed in km/h</td><td>".round($wdsp / 10, 1)."</td></tr>\n";
		echo "	<tr><td>Precipitation in cm</td><td>".round($prcp, 1)."</td></tr>\n";
		echo "	<tr><td>Snow in cm</td><td>".round($sndp, 1)."</td></tr>\n";
		echo "	<tr><td>FRSHTT</td><td>".$frshtt."</td></tr>\n";
		echo "	<tr><td>Cloud cover (%)</td><td>".round($cldc / 10, 1)."</td></tr>\n";
		echo "	<tr><td>Wind direction (degrees)</td><td>".$wnddir."</td></tr>\n";
		echo "</table>\n";
		
		
		//generate random number for demonstration
		//$new_data = rand(0, 1000);
		//echo the new number
		//echo "data: New random number: $new_data\n\n";
		
	} else {
		echo "No data selected";
	}
}

/* Taken from this comment on fsize; http://php.net/manual/en/function.filesize.php#114952 */
function remote_filesize($url) {
    static $regex = '/^Content-Length: *+\K\d++$/im';
    if (!$fp = @fopen($url, 'rb')) {
        return false;
    }
    if (
        isset($http_response_header) &&
        preg_match($regex, implode("\n", $http_response_header), $matches)
    ) {
        return (int)$matches[0];
    }
    return strlen(stream_get_contents($fp));
}

function decodeLong($byteArr, $startIndex) {
	$arr = unpack("l", $byteArr, $startIndex);
	return $arr[1];
}

function decodeFloat($byteArr, $startIndex) {
	$arr = unpack("G", $byteArr, $startIndex);
	return $arr[1];
}

function decodeByte($byteArr, $startIndex) {
	$arr = unpack("c", $byteArr, $startIndex);
	return $arr[1];
}

function decodeShort($byteArr, $startIndex) {
	$arr = unpack("n", $byteArr, $startIndex);
	return $arr[1];
}

getData();

ob_flush();
?>