<?php
	include('db_connection.php');
	$tsql_callSP = "{call GetRatingPerformance( ?, ?, ?, ?, ?, ?, ?, ? )}";   
	$targetgroupname = $_REQUEST['targetgroupname'];
	$channelbrandids = $_REQUEST['channelbrandid'];
	$unitid = $_REQUEST['unitid'];
	$InputDaypartGroupID = $_REQUEST['InputDaypartGroupID'];
	$periodtypeid = $_REQUEST['periodtypeid'];
	$periodnumber = $_REQUEST['periodnumber'];
	$refperiods = $_REQUEST['refperiods'];
	$RegionID = $_REQUEST['RegionID'];
    
    /*$targetgroupname = 'Ad Sales Target';
	$channelbrandids = '0,1,2,3,4';
	$unitid = 1;
	$isPrimeTime = 0;
	$periodtypeid = 1;
	$periodnumber = 201722;
	$refperiods = '201721,201720,201719,201718';
	$RegionID = -1;*/

	$params = array( 
	array($targetgroupname,SQLSRV_PARAM_IN), 
	array($channelbrandids,SQLSRV_PARAM_IN),  
	array($unitid,SQLSRV_PARAM_IN), 
	array($InputDaypartGroupID,SQLSRV_PARAM_IN), 
	array($periodtypeid,SQLSRV_PARAM_IN),
	array($periodnumber,SQLSRV_PARAM_IN),  
	array($refperiods,SQLSRV_PARAM_IN),
	array($RegionID,SQLSRV_PARAM_IN)  
	);   

	/* Execute the query. */  
	$stmt3 = sqlsrv_query( $conn, $tsql_callSP , $params);   
			
	$ratings = array();
	while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {				
		$ratings[] = array('IsRegionRow'=>$row[0],'RegionID'=>$row[1],'Regionname'=>$row[2],'areaid'=>$row[3],'AreaName'=>$row[4],'CountryCode'=>$row[5],'ChannelID'=>$row[6],'ChannelBrandID'=>$row[7],'ChannelBrandName'=>$row[8],'DemographicID'=>$row[9],'TargetCode'=>$row[10],'CurrentValue'=>number_format(round($row[11],3),3),'ReferenceValue'=>number_format(round($row[12],3),3));	
	}	
	header('Content-Type: application/json');
	echo json_encode($ratings);
?>