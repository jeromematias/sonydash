<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Graph Reports</title>
    <link rel="shortcut icon" href="icons/techEdge/db.ico" />
    <!-- Bootstrap -->
    <link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <!-- NProgress -->
    <link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
    <!-- iCheck -->
    <link href="../vendors/iCheck/skins/flat/green.css" rel="stylesheet">
    <!-- Custom Theme Style -->
    <link href="../build/css/custom.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script src="js/ng-radial-gauge-dir.js"></script>

    <!-- Jquery gauge -->
    <meta name="viewport" content="width=1024, maximum-scale=1">
    <link href="jquerygauge/jquery-gauge.css" type="text/css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script type="text/javascript" src="jquerygauge/jquery-gauge.min.js"></script>
    <!-- /Jquery gauge -->
    <!-- Datatables -->
    <link href="../vendors/datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet">
    <link href="../vendors/datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="docs/css/bootstrap-3.3.2.min.css" type="text/css">
    <!--<link rel="stylesheet" href="docs/css/bootstrap-example.css" type="text/css">-->
    <link rel="stylesheet" href="docs/css/prettify.css" type="text/css">
    <!--<link rel="stylesheet" href="css/DashBoardStyles.css" type="text/css"> -->

</head>
<style>
    /* styles For all browser */

    .input-sm {
        color: #555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }

    html,
    body {
        height: 100%;
    }

    body {
        background-color: rgb(247, 247, 247);
    }

    .main_container {
        background-color: rgb(247, 247, 247);
        padding-top: 0%;
    }

    .selectlbl {
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-variant: normal;
        font-weight: 500;
        line-height: 26.4px;
        text-align: center;
        padding: 0px 0px 0px 0px;
    }

    .radioselectlbl {
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-variant: normal;
        font-weight: 500;
        line-height: 26.4px;
        text-align: center;
        padding: 0px 0px 0px 0px;
    }

    .selectlbl2 {
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
        font-size: 14px;
        font-style: normal;
        font-variant: normal;
        font-weight: 500;

    }

    #topnav {
        padding: 0px 0px 0px 0px;
        height: 105px;

    }

    #radiobuttons {
        border: 1px solid #C0C0C0;
        border-radius: 5px;
        height: 30px;
        padding-left: 15px;
        padding-right: 15px;
        vertical-align: middle;
    }

    #dashboardForm select {
        display: block;
        height: 30px;
        padding: 0px 0px 0px 0px;
    }

    #dashboardForm #dpart {
        width: 80px;
    }

    #bargraph,
    #graphtable {
        height: 200px;
        padding-top: 8px;
    }

    #dashboardForm {
        margin: 0 auto;
        width: 1480px;
        padding: 0px 0px 0px 0px;
        height: 85px;
    }

    #dashboardForm #PeriodLastDate {
        display: block;
    }

    .alabel {
        display: block;
        text-decoration: none;
    }

    .table,
    #datatable-buttons {
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
        font-size: 12px;
        font-style: normal;
        font-variant: normal;
        font-weight: 500;
        line-height: 22.4px;
    }

    .table .bg-success {
        background-color: #C5E0B4;
        border: 1px solid #C5E0B4;
    }

    .table .bg-danger {
        background-color: #FFB3B3;
        border: 1px solid #FFB3B3;
    }

    .table .bg-warning {
        background-color: #F0AD4E;
        border: 1px solid #F0AD4E;
    }

    .table tr {}

    #target {
        width: 100px;
    }

    #refperiod {
        width: 80px;
    }

    #flag {
        width: 26px;
        height: 26px;
        border-right: none;
        margin-right: 10px;
    }

    #performancecontent,
    #topprogrammescontent {
        /*overflow-y: auto;*/
    }

    #performancecontent::-webkit-scrollbar-track,
    #topprogrammescontent::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #F5F5F5;
    }

    #performancecontent::-webkit-scrollbar,
    #topprogrammescontent::-webkit-scrollbar {
        width: 6px;
        background-color: #F5F5F5;
    }

    #performancecontent::-webkit-scrollbar-thumb,
    #topprogrammescontent::-webkit-scrollbar-thumb {
        background-color: #999;
    }

    #myTab1 a {
        display: block;
        color: #333;
        font-size: 12px;
    }

    .footer {
        font-size: 10px;
        padding-bottom: 10px;
        padding-right: 10px;
    }

    #datatable-buttons th {
        padding: 0px 0px 0px 0px;
    }

    #datatable-buttons td {
        font-size: 11px;
        cursor: pointer;
        vertical-align: middle;
    }

    #datatable-buttons td::first-child {
        width: 200px;
        text-align: left;
    }

    #datatable-buttons th img {
        margin: 0 auto;
    }

    #datatable-buttons td img {
        border: 1px solid #333;
        margin-right: 5px;
        margin-top: -7px;
        margin-bottom: -7px;
    }

    #topprogflag {
        width: 28px;
        height: 28px;
    }

    #topproglogo {
        margin: 0px auto;
        height: 24px;
        width: 35px;
    }

    .btn-topprogflag {
        padding-top: 0px;
        padding-bottom: 0px;
    }

    .btn-toplogo {
        padding-top: 2px;
        padding-bottom: 2px;
    }

    #globe {
        margin: 0 auto;
        height: 35px;
        width: 35px;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }

    #logo {
        margin: 0px auto;
        height: 40px;
        width: 100px;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }

    #ratingstitle {
        margin: 0 auto;
        font-size: 20px;
        width: 100%;
        font-weight: bolder;
        margin-bottom: 10px;
        padding-bottom: 0px;
        text-align: center;
    }

    #chartlogo {
        margin: 0 auto;
        height: 55px;
        width: 80px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    #areaflag {
        margin: 0 auto;
        height: 40px;
        width: 40px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
    }

    #bullets {
        height: 12px;
        width: 12px;
        margin-left: 60px;
        margin-right: 10px;
    }

    #dbullet1 {
        margin-top: 20px;
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    }

    #dbullet2 {
        margin-top: 10px;
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    }

    #flaglogo h3 {
        font-weight: bold;
        text-transform: capitalize;
        text-align: center;
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
        margin-top: 100px;
    }

    #xaxislabel {
        margin-top: 5px;
        text-align: center;
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    }

    #xaxislabel h3 {
        font-weight: bolder;
        font-size: 18px;
    }

    #channelbrand1 {
        font-size: 10px;
    }

    #globalTitle,
    #globaltotal {
        font-size: 12px;
        text-align: center;
        vertical-align: middle;
    }

    #globaltotal {
        text-align: right;
        font-weight: bolder;
        text-align: center;
        height: 30px;
    }

    .sidebar {
        margin: 0 auto;
        margin-top: 35px;
    }

    .sidebar small {
        margin: 0 auto;
        display: block;
        font-weight: bold;
        margin-top: 15px;
        text-align: center;
    }

    .x_panel {
        padding: 0px 0px 0px 0px;
        margin-top: 0px;
    }

    .col {
        margin-top: 0px;
    }

    #performancecontent,
    #topprogrammescontent {
        padding-top: 0px;
    }

    .valform {
        margin: 0px auto;
        width: 130px;
    }

    #RatingsTable td small {
        text-align: right;
        float: right;
        margin-top: 5px;
    }

    #RatingsTable th:first-child {
        width: 100px;
    }

    #RatingsTable td {
        text-align: center;
        cursor: pointer;
        border: 1px solid #ccc;
        border-width: 0 0 1px 1px;
        padding-top: 4px;
        padding-bottom: 4px;
        vertical-align: middle;
    }

    #RatingsTable td:first-child {
        text-align: left;
    }

    #RatingsTable td+td {
        width: 50px;
    }

    #TableTrending {
        height: 40px;
    }

    .flagArea {
        margin: 0px auto;
        height: 40px;
        width: 40px;
        margin-left: auto;
        margin-right: auto;
        display: block;
    }

    #TableTrending {
        margin-top: 27px;
    }

    #performancecontent {
        padding: 0px 0px 0px 0px;
        overflow-y: auto;
    }

    #RatingsTable .glyphicon-arrow-up,
    #RatingsTable .glyphicon-arrow-down {}

    #RatingsTable td {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    #RatingsTable {}

    #arrow_up,
    #arrow_down {
        height: 10px;
        width: 10px;
        margin-left: 5px;
        margin-right: 5px;
        margin-top: -1px;
    }

    #TableIndividual,
    #TableGroup,
    #TableMax {
        margin-top: 10px;
    }

    #TableIndividual thead td,
    #TableGroup thead td,
    #TableMax thead td {
        cursor: pointer;
    }

    .exportContent {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    .panel-default small {
        display: block;
        text-align: center;
        cursor: pointer;
    }

    .panel-default li a {
        font-size: 12px;
    }

    .panel-default small:hover {
        font-weight: bold;
    }

    .modal-content h5 {
        display: block;
        text-align: center;
    }

    #TableIndividual td,
    #TableGroup td,
    #TableMax td {
        padding-top: 7px;
        padding-bottom: 7px;
    }

    #unitcontrol {
        padding-top: 8px;
    }

    #hiddenTable {
        margin: 0 auto;
    }

    #hiddenTable td {
        border: 0px;
    }

    #hiddenTable td:first-child {
        min-width: 30px;
        max-width: 30px;
        text-align: right;
    }

    #hiddenTable td+td {
        max-width: 18px;
    }

    #hiddenTable td+td+td {
        min-width: 40px;
        max-width: 40px;
        text-align: left;
        text-indent: 3px;
    }

    #sorticon {
        height: 20px;
        width: 20px;
        float: right;
    }

    #PeriodInfo {
        float: left;
        margin-left: 500px;
    }

    #PeriodLastDate {
        margin-left: 500px;
    }

    #techedgeiconWrapper {
        float: left;
        width: 50px;
        padding-top: 10px;
    }

    #techedgeicon {
        margin-top: 0px;
        float: right;
        width: 100%;
    }

    #techedgelogoWrapper {
        float: left;
        width: 150px;
        padding-top: 15px;
        margin-right: 20px;
    }

    #techedgelogo {
        margin-top: 0px;
        float: right;
        width: 100%;
    }

    #scrippslogowrapper {
        float: right;
        width: 300px;
    }

    #scrripslogo {
        margin-top: 0px;
        float: right;
        width: 100%;
        margin-top: 10px;
    }

    #radiobuttons #programmes {}

    /* for IE ver. 11 */

    @media all and (-ms-high-contrast:none) {
        .selectlbl {
            float: left;
        }
        .selectlbl select {
            margin-right: 2px;
        }
        .selectlbl2 {
            padding-top: -1px;
        }
        #dashboardForm {
            margin: 0 auto;
            width: 1480px;
            padding: 0px 0px 0px 0px;
            height: 85px;
        }
        #topnav {
            padding: 0px 0px 0px 0px;
        }
        #radiobuttons {}
        .radioselectlbl {
            margin-left: 5px;
        }
    }

    /**
             * Tooltip Styles
             */

    [data-tooltip] {
        position: relative;
        z-index: 2;
        cursor: pointer;
    }

    [data-tooltip]:before,
    [data-tooltip]:after {
        visibility: hidden;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
        opacity: 0;
        pointer-events: none;
    }

    [data-tooltip]:before {
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-bottom: 5px;
        margin-left: -85px;
        padding: 7px;
        width: 170px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        background-color: #000;
        background-color: hsla(0, 0%, 20%, 0.9);
        color: #fff;
        content: attr(data-tooltip);
        text-align: center;
        font-size: 10px;
        line-height: 1.2;
    }

    [data-tooltip]:after {
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -5px;
        width: 0;
        border-top: 5px solid #000;
        border-top: 5px solid hsla(0, 0%, 20%, 0.9);
        border-right: 5px solid transparent;
        border-left: 5px solid transparent;
        content: " ";
        font-size: 0;
        line-height: 0;
    }

    [data-tooltip]:hover:before,
    [data-tooltip]:hover:after {
        visibility: visible;
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
        filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
        opacity: 1;
    }
</style>
<style>
    .modal {
        display: none;
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
    }

    /* Modal Content */

    .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 20%;
    }

    #UpdateModal .modal-content {
        background-color: #fefefe;
        margin: 150px auto;
        padding: 20px;
        border: 1px solid #888;
        width: 50%;
        text-align: center;
    }

    /* The Close Button */

    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    #TopProgrogramUl a {
        color: #444;
        font-size: 13px;
        font-family: Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif;
    }

    #editflag {
        margin-top: 0px;
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 10px;
    }

    #editLogo {
        margin: 0px auto;
        height: 40px;
        width: 65px;
        margin-left: 5px;
        margin-right: 20px;
        display: block;
        margin-top: 0px;
    }

    .alert-warning {
        height: 25px;
        width: 100%;
        margin-top: 10px;
        margin-bottom: -5px;
        padding-top: 3px;
        padding-bottom: 5px;
        text-align: center;
    }

    .alert-warning small {
        vertical-align: middle;
    }

    .competitivePanel {
        min-height: 10px;
        height: auto;
        width: 100%;
    }

    #competitiveTable {
        table-layout: fixed;
        width: 100%;
        margin: 0 auto;
        padding-left: 0px;
    }

    #TAMsource {
        float: left;
        font-size: 10px;
        display: block;
    }

    #disclaimer {
        float: right;
        font-size: 10px;
    }

    #competitiveArea {
        height: 30px;
        margin-left: 10px;
    }

    #competitiveTable th,
    #competitiveTable td,
    #competitiveTable td+td {
        vertical-align: middle;
        text-align: center;
    }

    #competitiveTable td:first-child {
        width: 20px;
        text-align: center;
    }

    #competitiveTable td:first-child+td+td {
        width: 130px;
    }

    #competitiveTable th:first-child,
    #competitiveTable td:first-child+td {
        width: 200px;
        text-align: left;
    }

    #competitiveTable #hiddenTable {
        width: 110px;
        margin-left: auto;
        margin-right: auto;
    }

    #competitiveTable td:first-child+td+td #hiddenTable td:first-child {
        width: 150px;
        text-align: right;
    }

    #competitiveTable #hiddenTable td img {
        width: 10px;
    }

    #competitiveTable td:first-child+td+td #hiddenTable td:first-child+td {
        width: 5px;
    }

    #competitiveTable td:first-child+td+td #hiddenTable td:first-child+td #arrow_up {
        display: block;
        max-width: 10px;
        max-height: 10px;
        width: auto;
        height: auto;
    }
    #tbsection{
        height: 400px;
        padding: 0 15px 15px 15px;
    }
    #tbsection .x_panel{
        height: 100%;
    }
    #tbsection .x_panel .x_content .tabpanel{
        
    }
    #topProgContent .tab-pane{
        overflow-y: auto;
        overflow-x: hidden;
    }
    table#TableIndividual{
        z-index: 1000;
    }
    #tb-individual{
        overflow-y: scroll;
    }
</style>

<body>
    <div class="main_container">
        <div class="x_panel" id="topnav">
            <div class="x_content">
                <form id="dashboardForm">
                    <div id="techedgeiconWrapper"><img id="techedgeicon" src="icons/techEdge/db.ico"></div>
                    <div id="techedgelogoWrapper"><img id="techedgelogo" src="icons/techEdge/Techedge_Black_small.png"></div>
                    <label class="selectlbl"> Area
                            <select id="area" name="area" class="input-sm">
                                
                            </select>
                        </label>
                    <label class="selectlbl"> Period Type
                            <select id="periodtype" name="periodtype" class="input-sm">
                                <option value="1" selected="selected">Week</option>
                                <option value="2">Month</option>
                                <option value="3">Quarter</option>
                                <option value="4">Year</option>
                            </select>
                        </label>
                    <label class="selectlbl"> Target
                            <select id="target" name="target" class="input-sm" onchange="initializedNavigation()">                    
                                
                            </select>
                        </label>
                    <label class="selectlbl"> Reference
                        <select id="refperiod" name="refperiod" class="input-sm" onchange="initializedNavigation()">                             
                                
                        </select>
                        </label>
                    <label class="selectlbl" id="periodrange"> Period
                            <select id="period" name="period" class="input-sm" onchange="">
                            </select>                                                       
                        </label>
                    <label class="selectlbl"> Day Part
                            <select id="dpart" name="dpart" class="input-sm" onchange="initializedNavigation()">
                                <option value="0">All day</option>
                                <option value="1">Primetime</option>                                        
                            </select>
                        </label>
                    <label class="selectlbl"> Unit type
                            <select id="unittype" name="unittype" class="form-control input-sm" onchange="initializedNavigation()">
                                <option value="1">000</option>
                                <option value="2">TRP</option>
                                <option value="3">Share</option>
                                <option value="4">Reach000</option>
                                <option value="5">Reach%</option>
                            </select>
                        </label>
                    <label class="radioselectlbl">Ref. Format
                            <div id="radiobuttons">
                                <input type="radio" name="trpvalue" id="ValueFormatPercent" checked="checked" value="%" onclick="initializedNavigation()">%
                                <input type="radio" name="trpvalue" id="number" value="123" onclick="initializedNavigation()">123
                            </div>                            
                        </label>
                    <label class="selectlbl2"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Channel Brand<br/>  
                            <select id="channelbrand1" multiple="multiple" onchange="initializedNavigation()">
                                
                            </select>                            
                        </label>
                    <label class="radioselectlbl">
                            <div id="radiobuttons">
                                <input type="radio" name="progValues" id="programmes" checked="checked" value="P" onclick="initializedNavigation()">P &nbsp;&nbsp;
                                <input type="radio" name="progValues" id="competitive" value="C" onclick="initializedNavigation()">C
                            </div>                            
                        </label>
                    <button type="button" id="submit" class="hidden" class="btn btn-primary" onclick="validateform()">Show Report</button>
                    <div id="scrippslogowrapper"><img id="scrripslogo" src="icons/ClientLogo.png"></div>
                    <small id="PeriodInfo"></small><br/><small id="PeriodLastDate"></small>
                </form>

                <!---->
            </div>
        </div>
    </div>
    <div class="col-md-6" id="tbsection">
        <div class="x_panel">
            <div id="ratingstitle"><small id="">Ratings Performance</small></div>
            <div class="x_content">
                <div id="performancecontent table-responsive"></div>
            </div>
        </div>
    </div>
    <div class="col-md-6" id="tbsection">
        <div class="x_panel">
            <div id="ratingstitle"><small id="topProgTitle">Top 10 Programmes</small></div>
            <div class="x_content">
                <div class="tabpanel topProgrammeActive" role="tabpanel" data-example-id="togglable-tabs">
                    <ul id="TopProgrogramUl" class="nav nav-tabs">
                        <li><img id="editflag" class="flagArea" src="" /></li>
                        <li><img id="editLogo" src="" /></li>
                        <li class="active"><a href="#TabIndividual" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true" onclick="GetTopUniquePrograms(1,1)">Individual</a></li>
                        <li><a href="#TabGrouped" id="profile-tab" role="tab" data-toggle="tab" aria-expanded="true" onclick="GetTopPrograms(1,2)">Grouped</a></li>
                        <li><a href="#TabMax" id="max-tab" role="tab" data-toggle="tab" aria-expanded="true" onclick="GetTopPrograms(1,3)">Max Eps.</a></li>
                        <li class="pull-right" id="unitcontrol">
                            <select id="topprogUnits" class="btn-sm" multiple="multiple">
                            <option value="TRP" selected>TRP</option>
                            <option value="Thousands000" selected>000</option>
                            <option value="Share" selected>Share</option> 
                            <option value="Cover000" selected>Reach000</option>                           
                            <option value="Cover" selected>Reach%</option>                            
                            <option value="ATS" selected>ATS</option>
                            <option value="RatingShare">Share of 000</option>
                            <option value="DurationShare">DurationShare</option>                            
                          </select>
                        </li>
                    </ul>
                    <div class="tab-content" id="topProgContent">
                        <div role="tabpanel" class="tab-pane fade active in" id="TabIndividual" aria-labelledby="home-tab">
                            <div class="alert alert-warning">
                                <strong>Note : </strong><small id="alert-content"></small>
                            </div>
                            <div class="table-responsive" id="tb-individual">
                                
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="TabGrouped" aria-labelledby="profile-tab">
                            <table class="table table-bordered table-striped" id="TableGroup"></table>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="TabMax" aria-labelledby="max-tab">
                            <table class="table table-bordered table-striped" id="TableMax"></table>
                        </div>                        
                    </div>
                </div>
                <div id="RegionalRow"></div>
                <div class="competitivePanel"></div>
                <small id="TAMsource"></small>
            </div>
        </div>
    </div>

    <div class="col-md-12">
        <div class="x_panel">
            <div class="x_content">
                <div id="ratingstitle"><small id="TrendingTitle">Trending</small></div>
                <div class="" role="tabpanel" data-example-id="togglable-tabs">
                    <ul id="myTab1" class="nav nav-tabs">
                        <li class="active"><a href="#TabTrendingGraph" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true" onclick="TrendingGraph(1)">Graph</a></li>
                        <li class=""><a href="#TabTrendingTable" id="profile-tab" role="tab" data-toggle="tab" aria-expanded="true" onclick="TrendingTable(2)">Table</a></li>
                    </ul>
                    <div class="tab-content">
                        <div id="flaglogo" class="col-md-1"></div>
                        <div role="tabpanel" class="tab-pane fade active in" id="TabTrendingGraph" aria-labelledby="home-tab">
                            <div id="bargraph" class="col-md-11"></div>
                            <div class="col-md-11 pull-right" id="xaxislabel">
                                <h3 id="xAxisname"></h3>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="TabTrendingTable" aria-labelledby="profile-tab">
                            <div id="graphtable" class="col-md-11"></div>
                        </div>
                        <button id="myBtn" class="pull-right"><i class="fa fa-file-excel-o" aria-hidden="true"></i> Open Export Module</button>
                    </div>
                </div>
                <small id="TAMsource"></small>
            </div>
        </div>

    </div>
    <div class="col-md-12">
        <div class="pull-right">
            <div class="footer">Powered by - Bootstrap & Echarts</div>
            <!-- The Modal -->
            <div id="UpdateModal" class="modal">
                <div class="modal-content" id="UpdateModalContent">Data Updating! Please refresh in a few minutes<img src="icons/gif/loading.gif" height="20"></div>
            </div>
            <div id="myModal" class="modal">

                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h5>Export Current Set-up</h5>
                    <div class="panel panel-default">
                        <div class="exportContent">
                            <small type="button" id="btn-sm" onclick="ExportAll()">Export All</small>
                        </div>
                    </div>
                    <h5>Ratings Performance</h5>
                    <div class="panel panel-default">
                        <div class="exportContent">
                            <small type="button" id="btn-sm" onclick="RatingsExportToXlsx()">Export to XLSX</small>
                        </div>
                    </div>
                    <h5>Top 10 Programmes (Individual)</h5>
                    <div class="panel panel-default">
                        <div class="exportContent">
                            <small type="button" id="btn-sm" onclick="exportTopProgrammes(1,'xlsx','000')">Export to XLSX</small>
                        </div>
                    </div>
                    <h5>Top 10 Programmes (Grouped)</h5>
                    <div class="panel panel-default">
                        <div class="exportContent">
                            <small type="button" id="btn-sm" onclick="exportTopUniqueProgrammes(2,'xlsx','000')">Export to XLSX</small>
                        </div>
                    </div>
                    <h5>Top 10 Programmes (Max Eps.)</h5>
                    <div class="panel panel-default">
                        <div class="exportContent">
                            <small type="button" id="btn-sm" onclick="exportTopUniqueProgrammes(3,'xlsx','000')">Export to XLSX</small>
                        </div>
                    </div>
                    <h5>Competitive</h5>
                    <div class="panel panel-default">
                        <div class="exportContent">
                            <small type="button" id="btn-sm" onclick="exportCompetitive()">Export to XLSX</small>
                        </div>
                    </div>
                    <h5>Trending</h5>
                    <div class="panel panel-default">
                        <div class="exportContent">
                            <small type="button" id="btn-sm" onclick="ExportTrending('xlsx')">Export to XLSX</small>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    </div>
</body>
<!-- jQuery -->
<script src="../vendors/jquery/dist/jquery.min.js"></script>
<script>
    window.tether = {}
</script>
<!-- Bootstrap -->
<script src="../vendors/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="js/bootbox.min.js"></script>
<!-- FastClick -->
<script src="../vendors/fastclick/lib/fastclick.js"></script>
<!-- Chart.js -->
<script src="../vendors/Chart.js/dist/Chart.min.js"></script>
<!-- Morris Js -->
<script src="../vendors/echarts/dist/echarts3.js"></script>
<script src="../vendors/echarts/map/js/world.js"></script>
<!-- Custom Theme Scripts -->
<script src="../build/js/custom.min.js"></script>
<script src="../build/js/jquery-3.1.1.min.js"></script>
<script src="js/jquery.validate.min.js"></script>
<!-- Datatables -->
<script src="../vendors/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="../vendors/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<script src="../vendors/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
<script src="../vendors/datatables.net-buttons-bs/js/buttons.bootstrap.min.js"></script>
<script src="../vendors/datatables.net-buttons/js/buttons.flash.min.js"></script>
<script src="../vendors/datatables.net-buttons/js/buttons.html5.min.js"></script>
<script src="../vendors/datatables.net-buttons/js/buttons.print.min.js"></script>
<script src="../vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js"></script>
<script src="../vendors/datatables.net-keytable/js/dataTables.keyTable.min.js"></script>
<script src="../vendors/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
<script src="../vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js"></script>
<script src="../vendors/datatables.net-scroller/js/datatables.scroller.min.js"></script>

<script src="../vendors/pdfmake/build/pdfmake.min.js"></script>
<script src="../vendors/pdfmake/build/vfs_fonts.js"></script>
<script src="js/mask.js"></script>
<!-- <script src="../vendors/Chart.js/dist/Chart.Line.js"></script> -->
<!-- Custom Theme Scripts -->
<script src="../build/js/custom.min.js"></script>
<script type="text/javascript" src="docs/js/prettify.js"></script>
<link rel="stylesheet" href="css/bootstrap-multiselect.css" type="text/css">
<script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
<!--<script src="js/mycustomjs.js"></script>-->
<div class="modal">
    <!-- Place at bottom of page -->
</div>
<script src="js/jquery.floatThead.js"></script>
<script type="text/javascript" src="js/DashBoardFunctions.js?v=5"></script>
<script src="js/alasql.min.js"></script>
<script src="js/xlsx.core.min.js"></script>
<script>
    var browserIsIE = !(window.ActiveXObject) && "ActiveXObject" in window;
    var ratingsDefaultHeight = document.getElementById("performancecontent").offsetHeight;
    var GraphDefaultWidth = document.getElementById("bargraph").offsetWidth;
    var ratingsWidth = 0;    
    $(document).ready(function() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.replace('../scripps_mobile/dashboard/index.php')
        }
        $('.alert-warning').css("display", "none");
        //getLastDate();
        InitializeDashboardInpouts();
        getModal();
        disableOptions(1);        
    });
    var UpdateWarning1 = false,
        UpdateWarning2 = false;

    var SecondsCounter1 = 0,
        SecondsCounter2 = 0;
    var limit = 180;
	var data1 = '', data2 = '';
    var	diff = 0;
    CheckDatabaseUpdateTIme();	
    function CheckDatabaseUpdateTIme() {            
        $.ajax({
            url: './setup.php',
            type: 'GET',
            success: function(data) {               
               data1 = data.substring(21, 25);
               data2 = data.substring(26, 30);			  
			   GetServerDate();
            }
        })
    }
    function GetServerDate(){
        $.ajax({
            url : './time.php',
            type : 'GET',
            success : function(data){                
                var servertime = new Date(data);
                var currentdate = new Date();                  
                diff = (currentdate - servertime); 
                window.setInterval(checkTime, 60000);
            }
        })
    }
    function checkTime() {
        var currentdate = new Date();   
        var datediff = new Date(currentdate - diff);     
        if (UpdateWarning1 == false) {
            if (data1 == formatAMPM(datediff)) {
                UpdateWarning1 = true;
                window.setInterval(UpdateModal1, 1000);
            }
        }

        if (UpdateWarning2 == false) {
            if (data2 == formatAMPM(datediff)) {
                UpdateWarning2 = true;
                window.setInterval(UpdateModal2, 1000);
            }
        }
    }

    function UpdateModal1() {
        if (UpdateWarning1 == true) {
            SecondsCounter1++;
            if (SecondsCounter1 != limit) {
                var UpdateModal = document.getElementById('UpdateModal');
                UpdateModal.style.display = "block";				
            } else {
                var UpdateModal = document.getElementById('UpdateModal');
                UpdateModal.style.display = "none";				
                UpdateWarning1 = false;
                SecondsCounter1 = 0;
            }
        }
    }

    function UpdateModal2() {
        if (UpdateWarning2 == true) {
            SecondsCounter2++;            
            if (SecondsCounter2 != limit) {
                var UpdateModal = document.getElementById('UpdateModal');
                UpdateModal.style.display = "block";
            } else {
                var UpdateModal = document.getElementById('UpdateModal');
                UpdateModal.style.display = "none";
                UpdateWarning2 = false;
                SecondsCounter2 = 0;
            }
        }
    }

    function formatAMPM(date) {
        date.toString();
        var hours = date.getHours();
        var pad1 = "00";
        var n1 = Number(hours);          
        var hours = (pad1+n1).slice(-pad1.length);

        var minutes = date.getMinutes();
        var pad2 = "00";
        var n2 = Number(minutes);          
        var minutes = (pad2+n2).slice(-pad2.length);

        var strTime = hours + '' + minutes;
		
        return strTime;
    }
</script>

</html>