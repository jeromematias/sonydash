<?php
class init{
	public static function init_inputs(){				
		include('db_connection.php');				
		
		$Call_RegionIDs = "{call GetLastDates()}";   
		$stmt3 = sqlsrv_query( $conn, $Call_RegionIDs);   					

		$GetLastDate = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetLastDate[] = array('id'=>$row[0],'RegionLastDate'=>$row[1],'AreaID'=>$row[2],'AreaLastDate'=>$row[3]);
		}

		header( 'Content-Type: application/json' );
		print json_encode(array('GetLastDate'=>$GetLastDate));
	}

}
init::init_inputs();
?>