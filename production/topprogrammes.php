<?php
class topprogrammes{
	static function individualAirings(){
		mb_internal_encoding("UTF-8");
		mb_regex_encoding("UTF-8");
		include('db_connection.php');
			$tsql_callSP = "{call GetTopUnqiuePrograms( ?, ?, ?, ?, ? )}";		

			$AreaID = $_REQUEST['AreaID'];
            $DemographicID = $_REQUEST['DemographicID'];
            $ChannelBrandID = $_REQUEST['ChannelBrandID'];
            $AreaName = $_REQUEST['AreaName'];
            $UnitID = $_REQUEST['UnitID'];
            $PeriodTypeID = $_REQUEST['PeriodTypeID'];
            $PeriodNumber = $_REQUEST['PeriodNumber'];
            /*$AreaID = 4;
			$DemographicID = 28;
			$ChannelBrandID = 1;
			$UnitID = 1;
			$PeriodTypeID = 1;
			$PeriodNumber = 201720;*/
			$params = array( 
			array($DemographicID,SQLSRV_PARAM_IN), 
			array($ChannelBrandID,SQLSRV_PARAM_IN),  
			array($UnitID,SQLSRV_PARAM_IN), 
			array($PeriodTypeID,SQLSRV_PARAM_IN),
			array($PeriodNumber,SQLSRV_PARAM_IN)  
			);   

			/* Execute the query. */  
			$stmt3 = sqlsrv_query( $conn, $tsql_callSP , $params);   
			if( $stmt3 === false ) {       
			echo "Error in executing statement 3.\n";       
			die( print_r( sqlsrv_errors(), true)); }   
			//ProgrammeTitle,EpisodCount,Avg000,AvgShare,AvgTRP,AvgReach000,AvgReachPercent,AvgCover,AvgCover000,AvgATS,RatingShare,DurationShare
			$GetTopUnqiuePrograms = [];			
			while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {				
					$GetTopUnqiuePrograms[] = array('ProgTitle'=>$row[0],'ProgDate'=>$row[1],'Thousands000'=>$row[2],'Share'=>$row[3],'TRP'=>$row[4],'Cover'=>$row[5],'Cover000'=>$row[6],'ATS'=>$row[7]);	
			}

			header( 'Content-Type: application/json' );
			print json_encode($GetTopUnqiuePrograms);
	}
}
$clasname = 'topprogrammes';
$clasname::individualAirings();
?>