<?php
class GetGraph{
	public static function Graph(){
		include('db_connection.php');				
		$tsql_callSP = "{call [GetTrending]( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )}";  

			$AreaID = $_REQUEST['AreaID'];
			$DemographicID = $_REQUEST['DemographicID'];
			$ChannelBrandID = $_REQUEST['ChannelBrandID'];
			$UnitID = $_REQUEST['UnitID'];
			$InputDaypartGroupID = $_REQUEST['InputDaypartGroupID'];
			$PeriodTypeID = $_REQUEST['PeriodTypeID'];
			$CurrentPeriods = $_REQUEST['CurrentPeriods'];
			$PrevPeriods = $_REQUEST['PrevPeriods'];
			$RegionID = $_REQUEST['RegionID'];
			$IsRegionRow = $_REQUEST['IsRegionRow'];
			$TargetGroupName = $_REQUEST['TargetGroupName'];

			$CurrentParams = array( 
			array($AreaID,SQLSRV_PARAM_IN), 
			array($DemographicID,SQLSRV_PARAM_IN),
			array($ChannelBrandID,SQLSRV_PARAM_IN),  
			array($UnitID,SQLSRV_PARAM_IN),
			array($InputDaypartGroupID,SQLSRV_PARAM_IN), 
			array($PeriodTypeID,SQLSRV_PARAM_IN),
			array($CurrentPeriods,SQLSRV_PARAM_IN),
			array($RegionID,SQLSRV_PARAM_IN),
			array($IsRegionRow,SQLSRV_PARAM_IN),
			array($TargetGroupName,SQLSRV_PARAM_IN) 
			);

			$ReferenceParms = array( 
			array($AreaID,SQLSRV_PARAM_IN),
			array($DemographicID,SQLSRV_PARAM_IN), 
			array($ChannelBrandID,SQLSRV_PARAM_IN),  
			array($UnitID,SQLSRV_PARAM_IN),
			array($InputDaypartGroupID,SQLSRV_PARAM_IN),  
			array($PeriodTypeID,SQLSRV_PARAM_IN),
			array($PrevPeriods,SQLSRV_PARAM_IN),
			array($RegionID,SQLSRV_PARAM_IN),
			array($IsRegionRow,SQLSRV_PARAM_IN),
			array($TargetGroupName,SQLSRV_PARAM_IN)    
			);   

			

			$stmt3 = sqlsrv_query( $conn, $tsql_callSP , $CurrentParams);   
			if( $stmt3 === false ) {       
			echo "Error in executing statement 3.\n";       
			die( print_r( sqlsrv_errors(), true)); }   
			
			$Periods = [];
			while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {
			      $Periods[] = array('Period'=>$row[0]);
			}

			$stmt3 = sqlsrv_query( $conn, $tsql_callSP , $CurrentParams);   

			$CurrentValues = [];
			while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {
			      $CurrentValues[] = array('CurrentValue'=>number_format($row[1],3));
			}

			$stmt3 = sqlsrv_query( $conn, $tsql_callSP , $ReferenceParms);   			
			
			$PrevValues = [];
			while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {
			      $PrevValues[] = array('PrevValue'=>number_format($row[1],3));
			}

			header( 'Content-Type: application/json' );
			print json_encode(array('Periods'=>$Periods,'CurrentValues'=>$CurrentValues,'PrevValues'=>$PrevValues));
	}
}
$classname = 'GetGraph';
$classname::Graph();
?>