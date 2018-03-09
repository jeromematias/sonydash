<?php
	include('db_connection.php');
	$Call_GetCompetitives = "{call GetCompetitives( ?, ?, ?, ?, ?, ?, ?, ? )}";   

	$ChannelBrandID = $_REQUEST['ChannelBrandID'];
	$DemographicID = $_REQUEST['DemographicID'];
	$AreaID = $_REQUEST['AreaID'];
	$UnitID = $_REQUEST['UnitID'];
	$InputDaypartGroupID = $_REQUEST['InputDaypartGroupID'];
	$PeriodTypeID = $_REQUEST['PeriodTypeID'];
	$PeriodNumber = $_REQUEST['PeriodNumber'];
    $ReferencePeriods = $_REQUEST['ReferencePeriods'];
    /*$ChannelBrandID = 2;
	$DemographicID = 39;
	$AreaID = 8;
	$UnitID = 1;
	$IsPrimeTime = 0;
	$PeriodTypeID = 1;
	$PeriodNumber = 201715;*/

	$params = array( 
	array($ChannelBrandID,SQLSRV_PARAM_IN), 
	array($DemographicID,SQLSRV_PARAM_IN),  
	array($AreaID,SQLSRV_PARAM_IN), 
	array($UnitID,SQLSRV_PARAM_IN), 
	array($InputDaypartGroupID,SQLSRV_PARAM_IN),
	array($PeriodTypeID,SQLSRV_PARAM_IN),
	array($PeriodNumber,SQLSRV_PARAM_IN),
	array($ReferencePeriods,SQLSRV_PARAM_IN)  
	);   

	/* Execute the query. */  
	$stmt3 = sqlsrv_query( $conn, $Call_GetCompetitives , $params);   
	
	//c.ChannelName,c.ChannelID,Thousands000,TRP,Share,Reach000, ReachPercent,RelativeShare

	$GetCompetitives = array();
	while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {	
		$GetCompetitives[] = array('ChannelName'=>$row[0],'ChannelID'=>$row[1],'Thousands000'=>$row[2],'TRP'=>$row[3],'Share'=>$row[4],'Reach000'=>$row[5],'ReachPercent'=>$row[6],'ATS'=>$row[7],'RelativeShare'=>$row[8],'ReferenceValue'=>$row[9]);	
	}	
	header('Content-Type: application/json');
	echo json_encode($GetCompetitives);
?>