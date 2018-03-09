<?php   
   date_default_timezone_set("Europe/Copenhagen");
   $currenttime = date("Y-m-d h:i:s A");
   return print json_encode($currenttime);
?>