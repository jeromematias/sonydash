<?php
$serverName = "HOST-US-DATAF-1\DATAFACTORY"; //serverName\instanceName
//$connectionInfo = array( "Database"=>"DashBoardExtractor","UID"=>"DashBoardExtractorUser","PWD"=>"5AaprPan");
$connectionInfo = array( "Database"=>"DashBoardExtractor","UID"=>"DashBoardExtractorUser","PWD"=>"5AaprPan", "CharacterSet" => "UTF-8");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
	
}else{
     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>