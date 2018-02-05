<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
$new_data = rand(0, 1000);
echo "data: New random number: $new_data\n\n";
ob_flush();
?>