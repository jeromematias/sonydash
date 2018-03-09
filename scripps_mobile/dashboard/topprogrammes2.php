<?php
class topprogrammes{
	static function individualAirings(){
		include('db_connection.php');				
		if($_REQUEST['tableIndex'] == 2){
			$tsql_callSP = "{call [GetTopGroupedPrograms]( ?, ?, ?, ?, ? )}";   
		}else{
			$tsql_callSP = "{call [GetTopMaxPrograms]( ?, ?, ?, ?, ? )}";   
		}		

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
            $AreaName = 'holland';
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
			
			$GetTopGroupedPrograms = [];
			while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {				
				if($_REQUEST['tableIndex'] == 2){
					$GetTopGroupedPrograms[] = array('ProgTitle'=>$row[0],'EpisodCount'=>$row[1],'Thousands000'=>$row[2],'Share'=>$row[3],'TRP'=>$row[4],'Cover'=>$row[5],'Cover000'=>$row[6],'ATS'=>$row[7],'RatingShare'=>$row[8],'DurationShare'=>$row[9]);
				}else{								
					$GetTopGroupedPrograms[] = array('ProgTitle'=>$row[0],'EpisodCount'=>$row[1],'ProgDate'=>$row[2],'Thousands000'=>$row[3],'TRP'=>$row[4],'Share'=>$row[5],'Cover'=>$row[6],'Cover000'=>$row[7],'ATS'=>$row[8],'RatingShare'=>$row[9],'DurationShare'=>$row[10]);
				}
			}

			header( 'Content-Type: application/json' );
			print json_encode($GetTopGroupedPrograms);
	}
}
$clasname = 'topprogrammes';
$clasname::individualAirings();
?>