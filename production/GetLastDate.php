<?php
class init{
	public static function init_inputs(){				
		include('db_connection.php');				
		
		$Call_LastDate = "{call [GetLastDate]( ? )}";  				
		$InputRegionID = $_REQUEST['RegionID'];			

		$params = array( 
		array($InputRegionID,SQLSRV_PARAM_IN)		
		);		
		$stmt3 = sqlsrv_query( $conn, $Call_LastDate , $params); 

		$GetLastDate = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetLastDate[] = array('GetLastDate'=>$row[0]);
		}

		header( 'Content-Type: application/json' );
		print json_encode($GetLastDate);
	}

}
init::init_inputs();
?>