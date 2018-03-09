<?php
class init{
	public static function init_inputs(){				
		include('db_connection.php');				
		
		$Call_RegionIDs = "{call GetRegions()}";   
		$stmt3 = sqlsrv_query( $conn, $Call_RegionIDs);   
				
		$GetRegions = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetRegions[] = array('RegionIDs'=>$row[0],'Regionname'=>$row[1]);
		}

		$Call_Weeks = "{call GetWeeks()}";   
		$stmt3 = sqlsrv_query( $conn, $Call_Weeks);   
				
		$GetWeeks = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetWeeks[] = array('Weeks'=>$row[0]);
		}	

		$Call_Months = "{call GetMonths()}";   
		$stmt3 = sqlsrv_query( $conn, $Call_Months);   
				
		$GetMonths = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetMonths[] = array('Months'=>$row[0]);
		}	

		$Call_Quarters = "{call GetQuarters()}";   
		$stmt3 = sqlsrv_query( $conn, $Call_Quarters);   
				
		$GetQuarters = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetQuarters[] = array('Quarters'=>$row[0]);
		}	

		$Call_Years = "{call GetYears()}";   
		$stmt3 = sqlsrv_query( $conn, $Call_Years);   
				
		$GetYears = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetYears[] = array('Years'=>$row[0]);
		}

		$Call_TargetGroups = "{call GetTargetGroups()}";   
		$stmt3 = sqlsrv_query( $conn, $Call_TargetGroups);   
				
		$GetTargetGroups = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetTargetGroups[] = array("GroupName"=>$row[0]);
		}

		$Call_ChannelIDS = "{call GetChannelBrandIDs()}";
		$stmt3 = sqlsrv_query( $conn, $Call_ChannelIDS);   
				
		$GetChannelIDs = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetChannelIDs[] = array('ChannelBrandID'=>$row[0],'ChannelBrandName'=>$row[1]);
		}

		$Call_WeekRanges = "{call GetWeekRanges()}";
		$stmt3 = sqlsrv_query( $conn, $Call_WeekRanges);   
				
		$GetWeekRanges = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetWeekRanges[] = array('RegionIDs'=>$row[0],'AreaID'=>$row[1],'MinWeekNumber'=>$row[2],'MaxWeekNumber'=>$row[3]);
		}

		$Call_GetDaypartGroups = "{call GetDaypartGroups()}";
		$stmt3 = sqlsrv_query( $conn, $Call_GetDaypartGroups);   
				
		$GetDaypartGroups = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetDaypartGroups[] = array('DaypartGroupID'=>$row[0],'DaypartGroupName'=>$row[1]);
		}

		$Call_LastDates = "{call GetLastDates()}";   
		$stmt3 = sqlsrv_query( $conn, $Call_LastDates);   					

		$GetLastDates = array();
		while( $row = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_NUMERIC) ) {		
			$GetLastDates[] = array('RegionID'=>$row[0],'RegionLastDate'=>$row[1],'AreaID'=>$row[2],'AreaLastDate'=>$row[3]);
		}

		header( 'Content-Type: application/json' );
		print json_encode(array("RegionID"=>$GetRegions,"GetWeeks"=>$GetWeeks,"GetMonths"=>$GetMonths,"GetQuarters"=>$GetQuarters,"GetYears"=>$GetYears,"ChannelBrands"=>$GetChannelIDs,"TargetGroups"=>$GetTargetGroups,"GetWeekRanges"=>$GetWeekRanges,'GetDaypartGroups'=>$GetDaypartGroups,'GetLastDates'=>$GetLastDates));
	}

}
init::init_inputs();
?>