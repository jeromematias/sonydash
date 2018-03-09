<?php 
$file="//tecitrix.com/datastore/fileserver/Apps/ScrippsDashBoardExtractor/setup.ini";
$linecount = 0;
$handle = fopen($file, "r");
while(!feof($handle)){
  $line = fgets($handle);
  if(strpos( $line, 'DatabaseUpdateTimes' ) !== false){  	
  	print json_encode($line);
  	break;  	
  }
}
fclose($handle);
?>