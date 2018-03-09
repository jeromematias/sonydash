var WeeksPeriod = [], MonthsPeriod = [], QuartersPeriod = [], YearsPeriod = [], magicType = 'bar', GetWeekRanges = [], DaypartGroup = [];
var topprogUnits = document.getElementById('topprogUnits');
var TemporaryTabIndex = 0;
var lastDate = '';
$.ajaxSetup({
    cache : false
})
var GetLastDates = [];
$('#area').on('change', function() {
    initializedNavigation();
});
$('#periodtype').on('change', function() {
    InitPeriods();    
});
$('#channelbrand1').multiselect({         
        buttonWidth: '200px'
    });
$('#refperiod').on('change',function(){
    //alert($('#refperiod').val());
})
$('#topprogUnits').multiselect({         
    buttonWidth: '100px'
});
$('#period').on('change',function(){
    if($('#periodtype').val() == 4){
        var myElement = $('select[name="period"]');
        var latestPeriod = $(myElement).find("option:first-child").val();
        $('#refperiod').find('option').remove();
        if($('#period').val() == latestPeriod){                
            var selectBox = document.getElementById('refperiod');                
            selectBox.options.add(new Option(1+" Year", 1));
            selectBox.options.add(new Option("Same Avail. Dates Last Year", "-1")); 
        }else{                        
            var selectBox = document.getElementById('refperiod');                
            selectBox.options.add(new Option(1+" Year", 1));         
        }
    }
    initializedNavigation();    
})
$('#topprogUnits').on('change',function(){
    if (Number(localStorage["TopProgramTableIndex"])==2){
        GetTopPrograms(localStorage["TopProgramGroupUnitID"],2);
    }else if (Number(localStorage["TopProgramTableIndex"])==3){
        GetTopPrograms(localStorage["TopProgramGroupUnitID"],3);
    }else{
        GetTopUniquePrograms(localStorage["TopProgramIndividualUnitID"], 1);    
    }
});
function InitializeDashboardInpouts(){         
    $.ajax({
        url: "init_all.php",
        cache : false        
    })
    .done(function(data){                  
            $('#area').find('option').remove();            
            var selectBox = document.getElementById('area'); 
            for (var i in data.RegionID) {
                selectBox.options.add(new Option(data.RegionID[i].Regionname, data.RegionID[i].RegionIDs));
            }

            $('#target').find('option').remove();            
            selectBox = document.getElementById('target');           
            for (var i in data.TargetGroups) {
                selectBox.options.add(new Option(data.TargetGroups[i].GroupName, data.TargetGroups[i].GroupName));
            }                    
            for (var i in data.GetWeeks) {                
                WeeksPeriod.push([data.GetWeeks[i].Weeks]);
            }
            for (var i in data.GetMonths) {
                MonthsPeriod.push([data.GetMonths[i].Months]);
            }
            for (var i in data.GetQuarters) {
                QuartersPeriod.push([data.GetQuarters[i].Quarters]);
            }
            for (var i in data.GetYears) {
                YearsPeriod.push([data.GetYears[i].Years]);
            }
            $('#dpart').find('option').remove();            
            selectBox = document.getElementById('dpart');            
            for (var i in data.GetDaypartGroups) {
                selectBox.options.add(new Option(data.GetDaypartGroups[i].DaypartGroupName, data.GetDaypartGroups[i].DaypartGroupID));
            }

            for (var i in data.GetLastDates){
                GetLastDates.push({'RegionID':data.GetLastDates[i].RegionID, 'RegionLastDate':data.GetLastDates[i].RegionLastDate, 'AreaID':data.GetLastDates[i].AreaID, 'AreaLastDate':data.GetLastDates[i].AreaLastDate});
            }            

            var ChannelBrandIDs = [];
            $('#channelbrand1').find('option').remove();            
            for (var i in data.ChannelBrands) {                
                ChannelBrandIDs.push({label: data.ChannelBrands[i].ChannelBrandName,value: data.ChannelBrands[i].ChannelBrandID,selected:true});
            }        
          
            $("#channelbrand1").multiselect('dataprovider', ChannelBrandIDs);
            $('#channelbrand1').multiselect('rebuild');             
            
            //GetWeekRanges $GetWeekRanges[] = array('RegionIDs'=>$row[0],'AreaID'=>$row[1],'MinWeekNumber'=>$row[2],'MaxWeekNumber'=>$row[3]);

            for(var i in data.GetWeekRanges){
                GetWeekRanges.push({'RegionID':data.GetWeekRanges[i].RegionIDs,'AreaID':data.GetWeekRanges[i].AreaID,'MinWeekNumber':data.GetWeekRanges[i].MinWeekNumber,'MaxWeekNumber':data.GetWeekRanges[i].MaxWeekNumber});               
            }
            
            localStorage["TopProgramTableIndex"]=1;
            localStorage["TrendingTableIndex"]=1;
            localStorage["TopProgramGroupUnitID"] = 2;
            localStorage["TopProgramIndividualUnitID"] = 2;
            localStorage["TopProgramMaxUnitID"] = 2;
            localStorage["CompetitiveUnitID"] = 1;            
            InitPeriods();
                        
    })
    .fail(function() {
        alert("Ajax failed to fetch data");
    });      
}
function FormatDateLine(periodNum){
    var mystring = '';
    for(var i=6; i<8; i++){
        mystring = mystring + "" + periodNum.toString()[i];        
    }
    mystring = mystring + "-";
    if(periodNum.toString()[4] != '0'){
        mystring = mystring + "" + periodNum.toString()[4];
    }    
    mystring = mystring + "" + periodNum.toString()[5]; 
    mystring = mystring + "-";
    for(var i=0; i<4; i++){
        mystring = mystring + "" + periodNum.toString()[i];        
    }
    return mystring;
}
function AppendDateLine(RegionID){
    if($("#period")[0].selectedIndex == 0){
        var temp = GetLastDates[0].RegionLastDate;    
        for(var i in GetLastDates){
            if(GetLastDates[i].RegionID == RegionID){
                if(temp > GetLastDates[i].RegionID){
                    temp = GetLastDates[i].RegionID;
                    var date = FormatDateLine(GetLastDates[i].RegionLastDate);
                }                                   
            }
        }
        $('#PeriodLastDate').html("<br/>Last avail. date : "+ date);  
    }else{
        $('#PeriodLastDate').html("");  
    }    
}
function TrendingPeriodType(){
    var periodType = $('#periodtype').val();
    if(periodType == 1){
        return 'Week';
    }else if(periodType == 2){
        return 'Month';
    }else if(periodType == 3){
        return 'Quarter';
    }else if(periodType == 4){
        return 'Year';
    }
}
function SectionHeaders(){
    var AreaName = '';
    if(localStorage['AreaName'] == 'Holland'){
        AreaName = 'The Netherlands';
    }else{
        AreaName = localStorage['AreaName'];
    }
        
    var radioval = $('input[name=progValues]:checked', '#dashboardForm').val();
    
    if(localStorage["IsRegionRow"] == 0){
        if(radioval == 'P'){
            $('#topProgTitle').text("Top 10 Programmes in "+TrendingPeriodType()+", "+$('#target').val()+" in "+ AreaName);
        }else{
            var flagname = localStorage["AreaName"].split(' ').join('_');        
            $('#topProgTitle').html('Competitive Analysis in '+TrendingPeriodType()+", "+$('#target').val()+" in "+ AreaName + '<img id="competitiveArea" src="icons/Country flags/flag_' + flagname + '.png"/>');
        }
        $('#TrendingTitle').text("Trending by "+TrendingPeriodType()+", "+$('#target').val()+" in "+ AreaName);
    }else{
        $('#topProgTitle').text("");
        var TargetCodeName = $('#RatingsTable #GLOBALID' + localStorage["RegionID"] + "" + localStorage["ChannelBrandID"]).parent().find('td.1 small').html();
        $('#TrendingTitle').html("Trending by "+TrendingPeriodType()+", "+$('#target').val()+" in "+ TargetCodeName);
    }    
}
function TAMsource(){    
    if(localStorage["CountryCode"] == 'NL'){
        $('.x_content #TAMsource').text("Source: GfK Netherlands");
    }else if(localStorage["CountryCode"] == 'PL'){
        $('.x_content #TAMsource').text("Source: Nielsen Audience Measurement Poland");
    }else if(localStorage["CountryCode"] == 'UK'){
        $('.x_content #TAMsource').text("Source: BARB");
    }else if(localStorage["CountryCode"] == 'HU'){
        $('.x_content #TAMsource').text("Source: Nielsen Audience Measurement Hungary");
    }else if(localStorage["CountryCode"] == 'IT'){
        $('.x_content #TAMsource').text("Source: AGB Italia");
    }else if(localStorage["CountryCode"] == 'PH'){
        $('.x_content #TAMsource').text("Source: Kantar Media Philippines");
    }else if(localStorage["CountryCode"] == 'BG'){
        $('.x_content #TAMsource').text("Source: GARB Audience Measurement Bulgaria");
    }else if(localStorage["CountryCode"] == 'SA'){
        $('.x_content #TAMsource').text("Source: Kantar Media South Africa");
    }else if(localStorage["CountryCode"] == 'MY'){
        $('.x_content #TAMsource').text("Source: Kantar Media Malaysia");
    }else if(localStorage["CountryCode"] == 'SG'){
        $('.x_content #TAMsource').text("Source: GfK Singapore");
    }
}
function InitPeriods(){
    localStorage["RegionID"] = $('#area').val();    
    localStorage["PeriodTypeID"] = $('#periodtype').val();    
    $('#period').find('option').remove();            
    var selectBox = document.getElementById('period');                
    if(localStorage["PeriodTypeID"] == 1){
        for (var i in WeeksPeriod) {            
            selectBox.options.add(new Option(WeeksPeriod[i], WeeksPeriod[i]));                    
        }        
    }else if(localStorage["PeriodTypeID"] == 2){
        for (var i in MonthsPeriod) {
            selectBox.options.add(new Option(MonthsPeriod[i], MonthsPeriod[i]));                    
        }
    }else if(localStorage["PeriodTypeID"] == 3){
        for (var i in QuartersPeriod) {
            selectBox.options.add(new Option(QuartersPeriod[i], QuartersPeriod[i]));                    
        }
    }else if(localStorage["PeriodTypeID"] == 4){
        for (var i in YearsPeriod) {
            selectBox.options.add(new Option(YearsPeriod[i], YearsPeriod[i]));                    
        }
    }
    disableOptions(localStorage["PeriodTypeID"]);                
    initializedNavigation();    
}
function GetWeekNum(periodNum){
    //PeriodInfo
    var mystring = '';
    for(var i=4; i<6; i++){
        mystring = mystring + "" + periodNum.toString()[i];
        periodNum.toString()[1];
    }
    return mystring;
}
function GetYearNum(periodNum){
    var mystring = '';
    for(var i=0; i<4; i++){
        mystring = mystring + "" + periodNum.toString()[i];        
    }
    return mystring;
}
function GetYearDay(periodNum){
    var mystring = '';
    for(var i=6; i<8; i++){
        mystring = mystring + "" + periodNum.toString()[i];        
    }
    return mystring;
}
function getPeriodDate(p, y, periodtype) {
    //getPeriodDate(GetWeekNum($('#period').val()),GetYearNum($('#period').val()),periodtype);
    if($('#periodtype').val() == 1){        
        var periodStart = new Date(y, 0, 1 + (p - 1) * 7);
        var dow = periodStart.getDay();
        var ISOweekStart = periodStart;
        ISOweekStart.setDate(periodStart.getDate() - periodStart.getDay() + 1);
        
        var dd = ISOweekStart.getDate();
        var mm = ISOweekStart.getMonth()+1;
        var yy = ISOweekStart.getFullYear();
        
        var daystoAdd = Number(p) - Number(1);
        var periodEndDate = new Date(y, 0, 1 + (p * 7));
        dow = periodEndDate.getDay();
        ISOweekEND = periodEndDate;
        ISOweekEND.setDate(periodEndDate.getDate());

        
        var ddd = ISOweekEND.getDate();
        var mmm = ISOweekEND.getMonth()+1;
        var yyy = ISOweekEND.getFullYear();
        var timeDiff = Math.abs(ISOweekEND.getTime() - ISOweekStart.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        $('#PeriodInfo').text(Number(diffDays+1)+"Days, "+dd + "-" + mm + "-" + yy + " - " + ddd + "-" + mmm + "-" + yyy);        
                    

    }else if($('#periodtype').val() == 2){
        var number = parseInt(p, 10);        
        
        var periodDate = new Date(y, number-1,1);
        var dd = periodDate.getDate();
        var mm = periodDate.getMonth()+1;
        var yy = periodDate.getFullYear();        


        var periodEndDate = new Date(y, number,0);
         
        
        var ddd = periodEndDate.getDate();
        var mmm = periodEndDate.getMonth()+1;
        var yyy = periodEndDate.getFullYear();
        var timeDiff = Math.abs(periodEndDate.getTime() - periodDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        $('#PeriodInfo').text((diffDays+1)+"Days, "+dd + "-" + mm + "-" + yy + " - " + ddd + "-" + mmm + "-" + yyy);

    }else if($('#periodtype').val() == 3){
        var number = parseInt(p, 10);
        var quarterNum = 1;        
        for(var i = 1; i<number;i++){
            quarterNum = quarterNum + 3;
        }
        
        var periodDate = new Date(y, quarterNum-1,1);
        var dd = periodDate.getDate();
        var mm = periodDate.getMonth()+1;
        var yy = periodDate.getFullYear();        

        var periodEndDate = new Date(y, quarterNum+2,0);
        var ddd = periodEndDate.getDate();
        var mmm = periodEndDate.getMonth()+1;
        var yyy = periodEndDate.getFullYear(); 
        
        $('#PeriodInfo').text(dd + "-" + mm + "-" + yy + " - " + ddd + "-" + mmm + "-" + yyy);
        
        var ddd = periodEndDate.getDate();
        var mmm = periodEndDate.getMonth()+1;
        var yyy = periodEndDate.getFullYear();
        var timeDiff = Math.abs(periodEndDate.getTime() - periodDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        $('#PeriodInfo').text((diffDays + 1) + " Days, " + dd + "-" + mm + "-" + yy + " - " + ddd + "-" + mmm + "-" + yyy);   
        
    }else{
        //'AreaID':data.GetWeekRanges[i].AreadID, 'MinWeekNumber':data.GetWeekRanges[i].MinWeekNumber, 'MaxWeekNumber':data.GetWeekRanges[i].MaxWeekNumber
        var periodDate = new Date(y, 0,1);
        var dd = periodDate.getDate();
        var mm = periodDate.getMonth()+1;
        var yy = periodDate.getFullYear();

        var periodEndDate = new Date(y, 12, 0);
        var ddd = periodEndDate.getDate();
        var mmm = periodEndDate.getMonth()+1;
        var yyy = periodEndDate.getFullYear(); 

        var timeDiff = Math.abs(periodEndDate.getTime() - periodDate.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        $('#PeriodInfo').text((diffDays + 1) + " Days, " + dd + "-" + mm + "-" + yy + " - " + ddd + "-" + mmm + "-" + yyy);
    } 
}

function disableOptions(periodtype) {
    $('#refperiod').find('option').remove();
    if (periodtype == '4') {                    
        var selectBox = document.getElementById('refperiod');                
        selectBox.options.add(new Option(1+" Year", 1));
        selectBox.options.add(new Option("Same Avail. Dates Last Year", "-1"));                 
    }else if (periodtype == '3') {
             
        var selectBox = document.getElementById('refperiod');                
        selectBox.options.add(new Option(1+" Quarter", 1)); 
        selectBox.options.add(new Option(4+" Quarters", 4)); 
        selectBox.options.add(new Option(8+" Quarters", 8));

        document.getElementById("refperiod").options[0].selected = true;
    }else if (periodtype == '2') {       
                  
        var selectBox = document.getElementById('refperiod');                
        selectBox.options.add(new Option(1+" month", 1)); 
        selectBox.options.add(new Option(4+" months", 4)); 
        selectBox.options.add(new Option(8+" months", 8));
        selectBox.options.add(new Option(12+" months", 12));

        document.getElementById("refperiod").options[0].selected = true; 
    }else if (periodtype == '1') {
                    
        var selectBox = document.getElementById('refperiod');                
        selectBox.options.add(new Option(1+" Week", 1)); 
        selectBox.options.add(new Option(4+" Weeks", 4)); 
        selectBox.options.add(new Option(8+" Weeks", 8));
        selectBox.options.add(new Option(12+" Weeks", 12));

        document.getElementById("refperiod").options[1].selected = true;   
    }
    //getPeriodDate(GetWeekNum($('#period').val()),GetYearNum($('#period').val()),periodtype);
    var PeriodTypeObj = document.getElementById('periodtype');
    if(localStorage["PeriodTypeID"] != 4){
        selectBox = document.getElementById('refperiod');
        selectBox.options.add(new Option('Same ' + PeriodTypeObj.options[PeriodTypeObj.selectedIndex].text +' Last Year',-1));      
    }
}

function GetTopUniquePrograms(TopProgramIndividualUnitID, TableIndex) {
    localStorage["TopProgramIndividualUnitID"] = TopProgramIndividualUnitID;
    localStorage["TopProgramTableIndex"] = TableIndex;        
    $.ajax({
        url: "topprogrammes.php?AreaID=" + localStorage["AreaID"] + "&DemographicID=" + localStorage["DemographicID"] +
            "&ChannelBrandID=" + localStorage["ChannelBrandID"] + "&AreaName=" + localStorage["AreaName"] + "&UnitID=" + localStorage["TopProgramIndividualUnitID"] + "&PeriodTypeID=" + localStorage["PeriodTypeID"] + "&PeriodNumber=" + localStorage["PeriodNumber"] + "&tableIndex=" + TableIndex,
        type: "GET",
        cache : false,
        success: function(data) {
            var sortNUmber = 0;                       
            var output = '<thead><tr>' +
                '<td>#</td>' +
                '<td>Programme Title</td>' +
                '<td>Date</td>';                
                for (var i = 0; i < topprogUnits.length; i++) {
                    if (topprogUnits[i].selected) {
                        if(topprogUnits[i].text != 'Share of 000' && topprogUnits[i].text != 'DurationShare'){                          
                            if(topprogUnits[i].value == 'TRP'){
                                sortNUmber = 2;
                            }else if(topprogUnits[i].value == 'Thousands000'){
                                sortNUmber = 1;
                            }else if(topprogUnits[i].value == 'Share'){
                                sortNUmber = 3;
                            }else if(topprogUnits[i].value == 'Cover000'){
                                sortNUmber = 4;
                            }else if(topprogUnits[i].value == 'Cover'){
                                sortNUmber = 5;
                            }else if(topprogUnits[i].value == 'ATS'){
                                sortNUmber = 6;
                            }
                            if(sortNUmber == TopProgramIndividualUnitID){
                                output +='<td onclick="GetTopUniquePrograms('+sortNUmber+',' + TableIndex + ')">'+ topprogUnits[i].text +'<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';
                            }else{
                                output +='<td onclick="GetTopUniquePrograms('+sortNUmber+',' + TableIndex + ')">'+ topprogUnits[i].text +'</td>';
                            }                            
                                                                                   
                            $('.alert-warning').fadeOut("slow");
                        }else{
                            $('.alert-warning').fadeIn("slow");
                            $('#alert-content').text("RatingShare and DurationShare is not available on tables for Individual")
                        }                        
                    }
                }                
                
                '</tr></thead>';                
            for (var i in data) {
                output += '<tr><td>' + Number(Number(i) + Number(1)) + '</td>';
                output += '<td>' + data[i].ProgTitle + '</td>';
                output += '<td>' + data[i].ProgDate + '</td>';
                for (var j = 0; j < topprogUnits.length; j++) {                    
                    if (topprogUnits[j].selected) {                        
                        if(topprogUnits[j].text == 'TRP'){
                            output += '<td>' + data[i].TRP.toFixed(3) + '%</td>';
                        }else if(topprogUnits[j].text == '000'){
                            output += '<td>' + data[i].Thousands000.toFixed(3) + '</td>';                        
                        }else if(topprogUnits[j].text == 'Share'){
                            output += '<td>' + data[i].Share.toFixed(3) + '%</td>';
                        }else if(topprogUnits[j].text == 'Reach%'){
                            output += '<td>' + data[i].Cover.toFixed(3) + '</td>';    
                        }else if(topprogUnits[j].text == 'Reach000'){
                            output += '<td>' + data[i].Cover000.toFixed(0) + '</td>';    
                        }else if(topprogUnits[j].text == 'ATS'){
                            output += '<td>' + data[i].ATS.toFixed(3) + '</td>';        
                        }
                    }
                }                
                output += '</tr>';                
            }            
            $("#TableIndividual").html(output);            
        }
    });
}

function GetTopPrograms(TopProgramGroupUnitID,TableIndex) {
    localStorage["TopProgramGroupUnitID"] = TopProgramGroupUnitID;
    localStorage["TopProgramMaxUnitID"] = TopProgramGroupUnitID;
    localStorage["TopProgramTableIndex"] = TableIndex;        
    //alert("topprogrammes2.php?AreaID=" + localStorage["AreaID"] + "&DemographicID=" + localStorage["DemographicID"] +
            //"&ChannelBrandID=" + localStorage["ChannelBrandID"] + "&AreaName=" + localStorage["AreaName"] + "&UnitID=" + localStorage["TopProgramGroupUnitID"] + "&PeriodTypeID=" + localStorage["PeriodTypeID"] + "&PeriodNumber=" + localStorage["PeriodNumber"] + "&tableIndex=" + localStorage["TopProgramTableIndex"]);
    $.ajax({
        url: "topprogrammes2.php?AreaID=" + localStorage["AreaID"] + "&DemographicID=" + localStorage["DemographicID"] +
            "&ChannelBrandID=" + localStorage["ChannelBrandID"] + "&AreaName=" + localStorage["AreaName"] + "&UnitID=" + localStorage["TopProgramGroupUnitID"] + "&PeriodTypeID=" + localStorage["PeriodTypeID"] + "&PeriodNumber=" + localStorage["PeriodNumber"] + "&tableIndex=" + localStorage["TopProgramTableIndex"],
        type: "GET",
        cache : false,
        success: function(data) {
            var sortNUmber = 0;
            var output = '<thead><tr>' +
                '<td>#</td>' +
                '<td>Programme Title</td>' +
                '<td>EPs Count</td>';
                if(localStorage["TopProgramTableIndex"] == 3){
                    output += '<td>Date (Highest Ep)</td>';   
                }
                for (var i = 0; i < topprogUnits.length; i++) {
                    if (topprogUnits[i].selected) {                        
                            if(topprogUnits[i].text == 'TRP'){
                                sortNUmber = 2;
                            }else if(topprogUnits[i].text == '000'){
                                sortNUmber = 1;
                            }else if(topprogUnits[i].text == 'Share'){
                                sortNUmber = 3;
                            }else if(topprogUnits[i].text == 'Reach000'){
                                sortNUmber = 4;
                            }else if(topprogUnits[i].text == 'Reach%'){
                                sortNUmber = 5;
                            }else if(topprogUnits[i].text == 'ATS'){
                                sortNUmber = 6;
                            }else if(topprogUnits[i].text == 'Share of 000'){
                                sortNUmber = -1;
                            }else if(topprogUnits[i].text == 'DurationShare'){
                                sortNUmber = -2;
                            }
                            if(sortNUmber == localStorage["TopProgramGroupUnitID"]){                                
                                output +='<td onclick="GetTopPrograms('+sortNUmber+',' + TableIndex + ')">'+ topprogUnits[i].text + '<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';  
                            }else{                                
                                output +='<td onclick="GetTopPrograms('+sortNUmber+',' + TableIndex + ')">'+ topprogUnits[i].text + '</td>';                                                                  
                            }                                                                                                                            
                    }
                } 
                output += '</tr></thead>';                        
                for (var i in data) {
                output += '<tr><td>' + Number(Number(i) + Number(1)) + '</td>';
                output += '<td>' + data[i].ProgTitle + '</td>';
                output += '<td>' + data[i].EpisodCount + '</td>';
                if(localStorage["TopProgramTableIndex"] == 3){
                    output += '<td>' + data[i].ProgDate + '</td>';                            
                }            
                                              
                for (var j = 0; j < topprogUnits.length; j++) {                    
                    if (topprogUnits[j].selected) {                                                                                                
                        if(topprogUnits[j].text == 'TRP'){
                            output += '<td>' + data[i].TRP.toFixed(3) + '%</td>';
                        }else if(topprogUnits[j].text == '000'){
                            output += '<td>' + data[i].Thousands000.toFixed(3) + '</td>';                        
                        }else if(topprogUnits[j].text == 'Share'){
                            output += '<td>' + data[i].Share.toFixed(3) + '%</td>';
                        }else if(topprogUnits[j].text == 'Reach000'){
                            output += '<td>' + data[i].Cover000.toFixed(0) + '</td>';    
                        }else if(topprogUnits[j].text == 'Reach%'){
                            output += '<td>' + data[i].Cover.toFixed(3) + '</td>';    
                        }else if(topprogUnits[j].text == 'ATS'){
                            output += '<td>' + data[i].ATS.toFixed(3) + '</td>';        
                        }else if(topprogUnits[j].text == 'Share of 000'){
                            output += '<td>' + data[i].RatingShare.toFixed(1) + '%</td>';        
                        }else if(topprogUnits[j].text == 'DurationShare'){
                            output += '<td>' + data[i].DurationShare.toFixed(1) + '%</td>';        
                        }
                    }
                }
                output += '</tr>';
            }
            if(TableIndex == 2){
                $("#TableGroup").html(output);
            }else{
                $("#TableMax").html(output);            
            }            
        }
    });
}
function ShareOf(sortNUmber){   
    if(sortNUmber == 1){
        return '000';
    }else if(sortNUmber == 2){
        return 'TRP';
    }else if(sortNUmber == 3){
        return 'Share';
    }else if(sortNUmber == 4){
        return 'Reach000';
    }else if(sortNUmber == 5){
        return 'Reach%';
    }else if(sortNUmber == 6){
        return 'ATS';
    }    
}
function PopulateSections()
{            
        var radioval = $('input[name=progValues]:checked', '#dashboardForm').val();

        if(localStorage["IsRegionRow"] == 0){
           
            if(radioval == 'P'){
                $('.competitivePanel').hide("slow");
                $('.tabpanel').show("slow");   
               if (Number(localStorage["TopProgramTableIndex"])==2)
                {
                    GetTopPrograms(localStorage["TopProgramGroupUnitID"],2);
                }
                else if (Number(localStorage["TopProgramTableIndex"])==3)
                {
                    GetTopPrograms(localStorage["TopProgramGroupUnitID"],3);
                }
                else
                {                   
                    GetTopUniquePrograms(localStorage["TopProgramIndividualUnitID"], 1);                                    
                }
            }else{
                $('.tabpanel').hide("slow");
                $('.competitivePanel').show("slow");
                //localStorage["ChannelID"]
                GetCompetitives(localStorage["CompetitiveUnitID"]);
            }
        }else{
            $('.tabpanel').hide("slow");
            $('.competitivePanel').hide("slow");           
        }
            
            
            if(Number(localStorage["TrendingTableIndex"]) ==2)
            {             
              TrendingTable(2); 
            }               
            else
            {
              TrendingGraph(1);
            }
            
            flaglogo(localStorage["DemographicID"], localStorage["ChannelBrandID"],localStorage["ChannelBrandName"]);
            SectionHeaders();
            TAMsource();              
}
function GetCompetitives(UnitID){
    localStorage["CompetitiveUnitID"] = UnitID;  
    $.ajax({
        url: "competitive.php?AreaID=" + localStorage["AreaID"] + "&DemographicID=" + localStorage["DemographicID"] +
            "&ChannelBrandID=" + localStorage["ChannelBrandID"] + "&UnitID=" + localStorage["CompetitiveUnitID"] + "&PeriodTypeID=" + localStorage["PeriodTypeID"] + "&PeriodNumber=" + localStorage["PeriodNumber"] + "&InputDaypartGroupID=" + localStorage["InputDaypartGroupID"]+ "&ReferencePeriods="+localStorage["ReferencePeriods"],
            type: "GET",
            cache : false    
    })
    .done(function(data){
        //c.ChannelName,c.ChannelID,Thousands000,TRP,Share,Reach000, ReachPercent,RelativeShare
        var competitiveValues = [];         
        var output = '<table id="competitiveTable" class="table table-bordered"><thead><tr><td>#</td><td>Channel Name</td>';
        if(localStorage["CompetitiveUnitID"] == 1){
            output += '<td onclick="GetCompetitives(1)">000<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';
        }else{
            output += '<td onclick="GetCompetitives(1)">000</td>';
        }
        
        if(localStorage["CompetitiveUnitID"] == 2){
            output += '<td onclick="GetCompetitives(2)">TRP<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';
        }else{
            output += '<td onclick="GetCompetitives(2)">TRP</td>';
        }                

        if(localStorage["CompetitiveUnitID"] == 3){
            output += '<td onclick="GetCompetitives(3)">Share<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';
        }else{
            output += '<td onclick="GetCompetitives(3)">Share</td>';
        }            

        if(localStorage["CompetitiveUnitID"] == 4){
            output += '<td onclick="GetCompetitives(4)">Reach000<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';
        }else{
            output += '<td onclick="GetCompetitives(4)">Reach000</td>';
        }                

        if(localStorage["CompetitiveUnitID"] == 5){
            output += '<td onclick="GetCompetitives(5)">Reach%<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';
        }else{
            output += '<td onclick="GetCompetitives(5)">Reach%</td>';
        }                

        if(localStorage["CompetitiveUnitID"] == -1){
            output += '<td onclick="GetCompetitives(-1)">RelativeShare of 000<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';
        }else{
            output += '<td onclick="GetCompetitives(-1)">RelativeShare of 000</td>';
        }                

        if(localStorage["CompetitiveUnitID"] == 6){
            output += '<td onclick="GetCompetitives(6)">ATS<img id="sorticon" src="icons/sorting/Descending sorting-64.png"></td>';
        }else{
            output += '<td onclick="GetCompetitives(6)">ATS</td>';
        }
                
        output += '</tr></thead>';
        for(var i in data){
            if(localStorage["ChannelID"] == data[i].ChannelID){
                output += '<tr id="cpttvid'+ localStorage["ChannelID"] +'">';
            }else{
                output += '<tr>'
            }   
                var radioval = $('input[name=trpvalue]:checked', '#dashboardForm').val();

                var TempRefValue = ((data[i].Thousands000 - data[i].ReferenceValue) / data[i].ReferenceValue) * 100;
                if(TempRefValue >= 0){
                    var arrowname = 'arrow_up';             
                }else{
                    var arrowname = 'arrow_down';
                }

                if(radioval == '%'){
                    var RefValue = ((data[i].Thousands000 - data[i].ReferenceValue) / data[i].ReferenceValue) * 100;
                    var decimaplace = 1;
                    if(data[i].ReferenceValue > 0){
                        var pctg = '%';
                    }else{
                        var pctg = '';
                    }                    
                }else{
                    var RefValue = data[i].ReferenceValue;
                    var decimaplace = 3;
                    var pctg = '';
                }
                
                
                competitiveValues.push(data[i].ChannelName);
                output += '<td>'+ (Number(i)+Number(1)) +'</td>';
                if(data[i].ChannelName == 'Domo+'){
                    output += '<td><img src="icons/CompetitiveChannels/domo.png" />'+ data[i].ChannelName +'</td>';
                }else{
                    output += '<td><img src="icons/CompetitiveChannels/'+ data[i].ChannelName +'.png" />'+ data[i].ChannelName +'</td>';
                }
                
                competitiveValues.push(data[i].Thousands000);
                if(data[i].ReferenceValue > 0){
                    output += '<td><table id="hiddenTable"><tr>'+
                    '<td>'+ data[i].Thousands000.toFixed(3) + '</td>'+
                    '<td><img id="arrow_up" src="icons/bullets/'+ arrowname +'.png"/></td>'+
                    '<td>' + RefValue.toFixed(decimaplace) + pctg + '</td></tr></table></td>';            
                }else{
                    output += '<td>'+ data[i].Thousands000.toFixed(3) + ' &nbsp;&nbsp;(N/A)*</td>';            
                }                
                competitiveValues.push(data[i].TRP);
                output += '<td>'+ data[i].TRP.toFixed(3) +'%</td>';            
                competitiveValues.push(data[i].Share);
                output += '<td>'+ data[i].Share.toFixed(3) +'%</td>';            
                competitiveValues.push(data[i].Reach000);
                output += '<td>'+ data[i].Reach000.toFixed(0) +'</td>';            
                competitiveValues.push(data[i].ReachPercent);
                output += '<td>'+ data[i].ReachPercent.toFixed(3) +'</td>';            
                competitiveValues.push(data[i].RelativeShare);
                output += '<td>'+ data[i].RelativeShare.toFixed(3) +'</td>';
                competitiveValues.push(data[i].ATS);
                output += '<td>'+ data[i].ATS.toFixed(3) +'</td>';            
                output += '</tr>';            
        }
        output += '</table><small id="disclaimer">(N/A)* = No Data for Comparison Period</small>';
        $(".competitivePanel").html(output);
        $(".competitivePanel").css("tableLayout","fixed");
        $(".competitivePanel").css("width","100%");
        $('#competitiveTable td:first-child+td img').css("width","18px");
        $('#competitiveTable td:first-child+td img').css("marginRight","2%");
        $("#cpttvid"+ localStorage["ChannelID"]).css("backgroundColor","#F7F7F7");          
    })
    .fail(function() {
        alert("Ajax failed to fetch data");
    });
}

function ratings(targetgroupname, channelbrandid, unitid, periodtypeid, periodnumber, refperiods, InputDaypartGroupID,RegionID) {
        AppendDateLine(RegionID);            
        //alert("RatingPerformance.php?version="+ $.now() +"&targetgroupname=" + targetgroupname + "&channelbrandid=" + channelbrandid + "&unitid=" + unitid + "&periodtypeid=" + periodtypeid + "&periodnumber=" + periodnumber + "&refperiods=" + refperiods + "&InputDaypartGroupID=" + localStorage["InputDaypartGroupID"] + "&RegionID=" + RegionID)
        $.ajax({
            url: "RatingPerformance.php?version="+ $.now() +"&targetgroupname=" + targetgroupname + "&channelbrandid=" + channelbrandid + "&unitid=" + unitid + "&periodtypeid=" + periodtypeid + "&periodnumber=" + periodnumber + "&refperiods=" + refperiods + "&InputDaypartGroupID=" + localStorage["InputDaypartGroupID"] + "&RegionID=" + RegionID,
            type: "GET",
            cache : false
        })
        .done(function(data) {            
            var expotRows = [];
            for (var i in data) {
                expotRows.push([data[i].areaid, data[i].AreaName, data[i].CountryCode, data[i].ChannelBrandID, data[i].ChannelBrandName, data[i].DemographicID, data[i].TargetCode, data[i].CurrentValue, data[i].ReferenceValue]);
            }
            var output = '';
            var C = {},
                A = {},
                R = {},
                ChannelBrandIDs = [],
                ChannelBrandNames = [],
                AreaIDs = [],
                RegionIDs = [];
            for (var k = 0; k < data.length; k++) {                
                if(data[k].areaid == -1){
                    if (!R[data[k].RegionID]) {
                        R[data[k].RegionID] = true;
                        RegionIDs.push(data[k].RegionID);                  
                    }
                }else{
                    if (!A[data[k].areaid]) {
                        A[data[k].areaid] = true;
                        AreaIDs.push(data[k].areaid);
                    }
                }                
            }

            var ChannelBrandObj = document.getElementById('channelbrand1');
            for (var i = 0; i < ChannelBrandObj.length; i++) {
                if (ChannelBrandObj[i].selected) {
                    ChannelBrandIDs.push(ChannelBrandObj[i].value);
                    ChannelBrandNames.push(ChannelBrandObj[i].text);
                }                
            }

            if (data.length > 0) {
                k = 0;
                var found = false;
                for (var i = 0; i < AreaIDs.length; i++)
                    for (var j = 0; j < ChannelBrandIDs.length; j++)
                        if ((localStorage["AreaID"] == AreaIDs[i]) && (localStorage["ChannelBrandID"] == ChannelBrandIDs[j])) {
                            found = true;
                            break;
                        }
                if (!found) {
                    localStorage["AreaID"] = data[k].areaid;
                    localStorage["AreaName"] = data[k].AreaName;
                    localStorage["ChannelID"] = data[k].ChannelID;
                    localStorage["DemographicID"] = data[k].DemographicID;
                    localStorage["ChannelBrandID"] = data[k].ChannelBrandID;
                    localStorage["TargetCode"] = data[k].TargetCode;
                    localStorage["ChannelBrandName"] = data[k].ChannelBrandName;
                    localStorage["CountryCode"] = data[k].CountryCode;
                    localStorage["IsRegionRow"] = data[k].IsRegionRow;
                    localStorage["RegionID"] = data[k].RegionID;                                       
                }
            }

            output += '<table id="RatingsTable" class="table table-bordered"><tr><th><img id="globe" src="icons/globe/globe-icon.png"></th>';
            var ExportRows = [];
            for (var j = 0; j < ChannelBrandNames.length; j++) {
                if (ChannelBrandNames[j] == 'HGTV/*FL') {
                    output += '<th><img id="logo" src="icons/Channel logos/HGTV.png" /></th>';
                } else {
                    output += '<th><img id="logo" src="icons/Channel logos/' + ChannelBrandNames[j].split(' ').join('_') + '.png" /></th>';
                }
            }
            output += '</tr>';
            
            var PercentTag = '';
            if($('#periodtype').val() == 4){
                var stringstart = refperiods.length - 4;
                var maxrefperiods = refperiods.substring(0,4);
            }else{
                var stringstart = refperiods.length - 6;
                var maxrefperiods = refperiods.substring(0,6);
            }
            
            if($('#periodtype').val() != 3){
                var minrefperiods = refperiods.substring(stringstart, refperiods.length);
            }else{
                maxrefperiods = quarterEnd(refperiods.substring(0,6));
                var minrefperiods = quarterStart(refperiods.substring(stringstart, refperiods.length));
            }
            //alert(maxrefperiods);                    
            var MinDateNumber = '', MaxDateNumber = '';            
            if (localStorage["UnitID"]==2 || localStorage["UnitID"]==3 )
              PercentTag = '%';                     
            var DeductCurrentRefValue = [];
 
            var GlobalFlags = [];
            for(var i in ChannelBrandIDs){
                GlobalFlags.push({channelBrandID:ChannelBrandIDs[i],RowCount:AreaIDs.length});
            }                    
            for (var i = 0; i < AreaIDs.length; i++) {
                var EachRow = '';
                for (var j = 0; j < ChannelBrandIDs.length; j++) {
                    var EachChannel = '';
                    for (var k = 0; k < data.length; k++) {
                        var AreaID = AreaIDs[i];
                        var ChannelBrandID = ChannelBrandIDs[j];
                        if ((EachRow.length === 0) && (data[k].areaid == AreaID)) {
                            var flagname = data[k].AreaName.split(' ').join('_');
                            if(data[k].IsRegionRow == 0){
                                EachRow += '<td class="1"><img id="flag" src="icons/Country flags/flag_' + flagname + '.png"/>' + data[k].CountryCode + '<small>' + data[k].TargetCode + '</small></td>';
                            }                                                            
                        }

                        if ((data[k].areaid == AreaID) && (data[k].ChannelBrandID == ChannelBrandID)){
                            EachChannel = 'found';
                            if(data[k].IsRegionRow == 0){
                                if (localStorage["ValueFormatPercent"] == 1) {
                                var Percent = '';

                                for(var g in GetWeekRanges){
                                    if(data[k].areaid == GetWeekRanges[g].AreaID && data[k].RegionID == GetWeekRanges[g].RegionID){                                        
                                        if($('#periodtype').val() == 1){
                                            MinDateNumber = GetWeekRanges[g].MinWeekNumber;
                                            MaxDateNumber = GetWeekRanges[g].MaxWeekNumber;
                                        }else{                                            
                                            MaxDateNumber = GetWeekRanges[g].MaxWeekNumber;
                                            MinDateNumber = GetMaxMinDate(GetYearNum(GetWeekRanges[g].MinWeekNumber),GetWeekNum(GetWeekRanges[g].MinWeekNumber),$('#periodtype').val(),'min');
                                            MaxDateNumber = GetMaxMinDate(GetYearNum(GetWeekRanges[g].MaxWeekNumber),GetWeekNum(GetWeekRanges[g].MaxWeekNumber),$('#periodtype').val(),'max');                                                                                   
                                        } 
                                    }
                                }
                                if($('#periodType').val() != 4 && $('#refperiod').val() != -1){
                                    classifyMin = (MinDateNumber > minrefperiods) ? "yes" : "no";
                                    classifyMax = (maxrefperiods > MaxDateNumber) ? "yes" : "no";
                                }else{
                                    classifyMin = 'no';
                                    classifyMax = 'no';
                                }                                
                                
                                //alert(minrefperiods + "/" + MinDateNumber + "/" + maxrefperiods + "/" + MaxDateNumber);                                
                                if (data[k].ReferenceValue == 0 || (classifyMin == "yes" || classifyMax == "yes")){
                                    if(data[k].CurrentValue == 0){
                                        Percent = '-';                                        
                                    }else{
                                        if($('#unittype').val() == 4){
                                            var unitDecimal = 0;
                                        }else{
                                            var unitDecimal = 3;
                                        }
                                        var dataCurrent = parseFloat(data[k].CurrentValue.replace(/,/g, ''));
                                        Percent = dataCurrent.toFixed(unitDecimal) +PercentTag+ ' (N/A)*';
                                    }                                    
                                } else {
                                    var percentvalue = ((parseFloat(data[k].CurrentValue.replace(/,/g, '')) - parseFloat(data[k].ReferenceValue.replace(/,/g, ''))) / parseFloat(data[k].ReferenceValue.replace(/,/g, ''))) * 100;                                    
                                    var dataCurrent = parseFloat(data[k].CurrentValue.replace(/,/g, ''));
                                    var dataReference = parseFloat(data[k].ReferenceValue.replace(/,/g, ''));
                                    var decimalNum = 1;
                                    var unitDecimal = 3;
                                    if($('#unittype').val() == 4){
                                        unitDecimal = 0;
                                    }
                                    //alert($('#period').val() > MaxDateNumber ? "yes" : "no");
                                    if( $('#periodType').val() != 4 && $('#refperiod').val() != -1 ){
                                        classifyMin = (MinDateNumber > minrefperiods) ? "yes" : "no";                                    
                                        if($('#periodtype').val() != 1){
                                            classifyNA = GetMaxMinDate(GetYearNum($('#period').val()),GetWeekNum($('#period').val()),$('#periodtype').val(),'max') > MaxDateNumber ? "yes" : "no";
                                            //alert(GetMaxMinDate(GetYearNum($('#period').val()),GetWeekNum($('#period').val()),$('#periodtype').val(),'max') + "/" + MaxDateNumber + "/" + classifyNA);                                        
                                        }else{
                                            classifyNA = $('#period').val() > MaxDateNumber ? "yes" : "no";
                                            //alert($('#period').val() + "/" + MaxDateNumber + "/" + classifyNA);
                                        }
                                    }else{
                                        classifyMin = 'no';
                                        classifyNA = 'no';
                                    }                                    
                                    //alert(classifyMin)
                                    if(classifyMin == "yes" || classifyNA == "yes"){
                                        Percent = '(N/A)!';
                                        DeductCurrentRefValue.push({id:data[k].ChannelBrandID,CurrentValue:data[k].CurrentValue,ReferenceValue:data[k].ReferenceValue});

                                    }else{
                                        if (percentvalue > 0) {
                                            Percent = '<table id="hiddenTable"><tr><td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ '</td><td>&#09;<img id="arrow_up" src="icons/bullets/arrow_up.png"/></td><td>' + percentvalue.toFixed(decimalNum) + '%</td></tr></table>';
                                        } else {
                                            Percent = '<table id="hiddenTable"><tr><td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ '</td><td>&#09;<img id="arrow_down" src="icons/bullets/arrow_down.png"/></td><td>' + percentvalue.toFixed(decimalNum) + '%</td></tr></table>';
                                        }
                                        for(var globalid in GlobalFlags){
                                            //GlobalFlags.push({channelBrandID:ChannelBrandIDs[i],RowCount:AreaIDs.length});
                                            if(GlobalFlags[globalid].channelBrandID == data[k].ChannelBrandID){
                                                var tempRowCout = GlobalFlags[globalid].RowCount;
                                                GlobalFlags[globalid].RowCount = tempRowCout - 1;                                                
                                            }
                                        }
                                    }                                                                                                            

                                }
                                //GetWeekRanges $GetWeekRanges[] = array('RegionIDs'=>$row[0],'AreaID'=>$row[1],'MinWeekNumber'=>$row[2],'MaxWeekNumber'=>$row[3]);                                                                
                                //alert(minrefperiods+"/"+MinDateNumber+"-----"+$('#period').val()+"/"+MaxDateNumber);
                                if(Percent == '-'){
                                    EachRow += '<td><table id="hiddenTable"><tr><td></td><td>-</td><td></td></tr></table></td>';
                                }else{
                                    EachRow += '<td data-id="' + data[k].RegionID + '" data-name="'+ data[k].areaid +'" id="CELLID' + data[k].areaid + "" + data[k].ChannelBrandID + '" onClick="passIDs(' + data[k].areaid + ',' + data[k].DemographicID + ',' + data[k].ChannelBrandID + ',\'' + data[k].AreaName + '\',\'' + data[k].TargetCode + '\',\''+ data[k].ChannelBrandName +'\',\''+ data[k].ChannelID +'\',\'' + data[k].CountryCode + '\',\'' + data[k].IsRegionRow + '\',\'' + data[k].RegionID + '\')">&#09;' + Percent + '</td>';
                                }                                                                                        
                                                                                                                                    
                            }else{
                                var percentvalue = ((parseFloat(data[k].CurrentValue.replace(/,/g, '')) - parseFloat(data[k].ReferenceValue.replace(/,/g, ''))) / parseFloat(data[k].ReferenceValue.replace(/,/g, ''))) * 100;
                                var dataCurrent = parseFloat(data[k].CurrentValue.replace(/,/g, ''));
                                var dataReference = parseFloat(data[k].ReferenceValue.replace(/,/g, ''));
                                var unitDecimal = 3;
                                
                                if($('#unittype').val() == 4){
                                    unitDecimal = 0;
                                }                                

                                for(var g in GetWeekRanges){
                                    if(data[k].areaid == GetWeekRanges[g].AreaID && data[k].RegionID == GetWeekRanges[g].RegionID){                                        
                                        if($('#periodtype').val() == 1){
                                            MinDateNumber = GetWeekRanges[g].MinWeekNumber;
                                            MaxDateNumber = GetWeekRanges[g].MaxWeekNumber;
                                        }else{                                            
                                            MaxDateNumber = GetWeekRanges[g].MaxWeekNumber;
                                            MinDateNumber = GetMaxMinDate(GetYearNum(GetWeekRanges[g].MinWeekNumber),GetWeekNum(GetWeekRanges[g].MinWeekNumber),$('#periodtype').val());
                                            MaxDateNumber = GetMaxMinDate(GetYearNum(GetWeekRanges[g].MaxWeekNumber),GetWeekNum(GetWeekRanges[g].MaxWeekNumber),$('#periodtype').val());                                                                                   
                                        } 
                                    }
                                }
                                if($('#periodType').val() != 4 && $('#refperiod').val() != -1){
                                    classifyMin = (MinDateNumber > minrefperiods) ? "yes" : "no";
                                    classifyMax = (maxrefperiods > MaxDateNumber) ? "yes" : "no";
                                }else{
                                    classifyMin = 'no';
                                    classifyMax = 'no';
                                }                                


                                if (data[k].ReferenceValue == 0 || (classifyMin == "yes" && classifyMax == "yes")) {
                                    if(data[k].CurrentValue == 0){
                                        EachRow += '<td><table id="hiddenTable"><tr><td></td><td>-</td><td></td></tr></table></td>'
                                    }else{
                                        if($('#unittype').val() == 4){
                                            var unitDecimal = 0;
                                        }else{
                                            var unitDecimal = 3;
                                        }
                                        var dataCurrent = parseFloat(data[k].CurrentValue.replace(/,/g, ''));                                       
                                        EachRow += '<td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ ' (N/A)*' +'</td>';
                                    }                                    
                                }else{
                                    //alert($('#period').val() > MaxDateNumber ? "yes" : "no");
                                    if( $('#periodType').val() != 4 && $('#refperiod').val() != -1 ){
                                        classifyMin = (MinDateNumber > minrefperiods) ? "yes" : "no";                                    
                                        if($('#periodtype').val() != 1){
                                            classifyNA = GetMaxMinDate(GetYearNum($('#period').val()),GetWeekNum($('#period').val()),$('#periodtype').val(),'max') > MaxDateNumber ? "yes" : "no";
                                            //alert(GetMaxMinDate(GetYearNum($('#period').val()),GetWeekNum($('#period').val()),$('#periodtype').val(),'max') + "/" + MaxDateNumber + "/" + classifyNA);                                        
                                        }else{
                                            classifyNA = $('#period').val() > MaxDateNumber ? "yes" : "no";
                                            //alert($('#period').val() + "/" + MaxDateNumber + "/" + classifyNA);
                                        }
                                    }else{
                                        classifyMin = 'no';
                                        classifyNA = 'no';
                                    }
                                    
                                    if(classifyMin == "yes" || classifyNA == "yes"){
                                        EachRow += '<td data-id="' + data[k].RegionID + '" data-name="'+ data[k].areaid +'" id="CELLID' + data[k].areaid + "" + data[k].ChannelBrandID + '" onClick="passIDs(' + data[k].areaid + ',' + data[k].DemographicID + ',' + data[k].ChannelBrandID + ',\'' + data[k].AreaName + '\',\'' + data[k].TargetCode + '\',\''+ data[k].ChannelBrandName +'\',\''+ data[k].ChannelID +'\',\'' + data[k].CountryCode + '\',\'' + data[k].IsRegionRow + '\',\'' + data[k].RegionID + '\')">(N/A)!</td>';
                                        DeductCurrentRefValue.push({id:data[k].ChannelBrandID,CurrentValue:data[k].CurrentValue,ReferenceValue:data[k].ReferenceValue});                                                                                                    
                                    }else{
                                        if (percentvalue > 0) {
                                        EachRow += '<td data-id="' + data[k].RegionID + '" data-name="'+ data[k].areaid +'" id="CELLID' + data[k].areaid + "" + data[k].ChannelBrandID + '" onClick="passIDs(' + data[k].areaid + ',' + data[k].DemographicID + ',' + data[k].ChannelBrandID + ',\'' + data[k].AreaName + '\',\'' + data[k].TargetCode + '\',\''+ data[k].ChannelBrandName +'\',\''+ data[k].ChannelID +'\',\'' + data[k].CountryCode + '\',\'' + data[k].IsRegionRow + '\',\'' + data[k].RegionID + '\')"><table id="hiddenTable"><tr><td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ '</td><td>&#09;<img id="arrow_up" src="icons/bullets/arrow_up.png"/></td><td>' + dataReference.toFixed(unitDecimal) + '</td></tr></table></td>';
                                        } else {
                                            EachRow += '<td data-id="' + data[k].RegionID + '" data-name="'+ data[k].areaid +'" id="CELLID' + data[k].areaid + "" + data[k].ChannelBrandID + '" onClick="passIDs(' + data[k].areaid + ',' + data[k].DemographicID + ',' + data[k].ChannelBrandID + ',\'' + data[k].AreaName + '\',\'' + data[k].TargetCode + '\',\''+ data[k].ChannelBrandName +'\',\''+ data[k].ChannelID +'\',\'' + data[k].CountryCode + '\',\'' + data[k].IsRegionRow + '\',\'' + data[k].RegionID + '\')"><table id="hiddenTable"><tr><td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ '</td><td>&#09;<img id="arrow_down" src="icons/bullets/arrow_down.png"/></td><td>' + dataReference.toFixed(unitDecimal) + '</td></tr></table></td>';
                                        }
                                        for(var globalid in GlobalFlags){
                                            //GlobalFlags.push({channelBrandID:ChannelBrandIDs[i],RowCount:AreaIDs.length});
                                            if(GlobalFlags[globalid].channelBrandID == data[k].ChannelBrandID){
                                                var tempRowCout = GlobalFlags[globalid].RowCount;
                                                GlobalFlags[globalid].RowCount = tempRowCout - 1;                                                
                                            }
                                        }    
                                    }                                                                    
                                }                                                                                        

                                }
                            }                            
                            break;
                        }
                    }


                    if (EachChannel.length === 0) {
                        EachRow += '<td>-</td>';
                    }


                }
                output += '<tr>' + EachRow + '</tr>';                
            }            
            var MinWeek = GetWeekRanges[0].MinWeekNumber, MaxWeek = GetWeekRanges[0].MaxWeekNumber;            
            for(var i in AreaIDs){
                for(var g in GetWeekRanges){
                    if(AreaIDs[i] == GetWeekRanges[g].AreaID){
                        if($('#periodtype').val() == 1){
                            if(MinWeek < GetWeekRanges[g].MinWeekNumber){
                                MinWeek = GetWeekRanges[g].MinWeekNumber;
                            }
                            if(MaxWeek > GetWeekRanges[g].MaxWeekNumber){
                                MaxWeek = GetWeekRanges[g].MaxWeekNumber;
                            }                            
                        }else{
                            if(MinWeek < GetWeekRanges[g].MinWeekNumber){
                                MinWeek = GetMaxMinDate(GetYearNum(GetWeekRanges[g].MinWeekNumber),GetWeekNum(GetWeekRanges[g].MinWeekNumber),$('#periodtype').val());
                            }
                            if(MaxWeek > GetWeekRanges[g].MaxWeekNumber){
                                MaxWeek = GetMaxMinDate(GetYearNum(GetWeekRanges[g].MaxWeekNumber),GetWeekNum(GetWeekRanges[g].MaxWeekNumber),$('#periodtype').val());     
                            }                                                                                                    
                        } 
                    }                    
                }
            }                        
            //alert(MinWeek + "/" + MaxWeek + "/" + AreaIDs);
            for (var x = 0; x < RegionIDs.length; x++) {
                        var EachRow = '';                        
                        for (var n = 0; n < ChannelBrandIDs.length; n++) {
                            var EachChannel = '';                            
                            for (var m = 0; m < data.length; m++) {
                                var RegionIDnum = RegionIDs[x];                            
                                var ChannelBrandID = ChannelBrandIDs[n];                                                                
                                if ((EachRow.length === 0) && (data[m].RegionID == RegionIDnum)) {                                    
                                    EachRow += '<td class="1"><img id="regionRow" src="icons/Area Icons/'+ data[m].Regionname +'.png"/><small>'+ data[m].Regionname +'</small></td>';                                                                                           
                                }

                                if( data[m].RegionID == RegionIDnum && data[m].ChannelBrandID == ChannelBrandID && data[m].IsRegionRow == 1){
                                    EachChannel = 'found';
                                    var DeductCurrent = 0, DeductReference = 0;                                    
                                    if (localStorage["ValueFormatPercent"] == 1) {
                                        //DeductCurrentRefValue.push({id:data[k].ChannelBrandID,CurrentValue:data[k].CurrentValue,ReferenceValue:data[k].ReferenceValue});                                        
                                        for(var deductid in DeductCurrentRefValue){
                                            if(data[m].ChannelBrandID == DeductCurrentRefValue[deductid].id){
                                                DeductCurrent = Number(DeductCurrent) + Number(DeductCurrentRefValue[deductid].CurrentValue);
                                                DeductReference = Number(DeductReference) + Number(DeductCurrentRefValue[deductid].ReferenceValue);
                                            }                                                    
                                        }
                                        //alert(Number(DeductCurrent) + "/" + Number(DeductReference));

                                        if (data[m].ReferenceValue == 0) {
                                            if(data[m].CurrentValue == 0){
                                                Percent = '-';
                                            }else{
                                                Percent = ( Number(data[m].CurrentValue) - Number(DeductCurrent) ) +PercentTag+ ' (N/A)*';
                                            }                                    
                                        } else {
                                            //var percentvalue = ((parseFloat(data[m].CurrentValue.replace(/,/g, '')) - parseFloat(data[m].ReferenceValue.replace(/,/g, ''))) / parseFloat(data[m].ReferenceValue.replace(/,/g, ''))) * 100;                                    
                                            var dataCurrent = parseFloat(data[m].CurrentValue.replace(/,/g, '')) - Number(DeductCurrent);
                                            var dataReference = parseFloat(data[m].ReferenceValue.replace(/,/g, '')) - Number(DeductReference);
                                            var percentvalue = ((parseFloat(data[m].CurrentValue.replace(/,/g, '')) - parseFloat(data[m].ReferenceValue.replace(/,/g, ''))) / parseFloat(data[m].ReferenceValue.replace(/,/g, ''))) * 100;
                                            var decimalNum = 1;
                                            var unitDecimal = 3;
                                                                                    
                                            if($('#unittype').val() == 4){
                                                unitDecimal = 0;
                                            }
                                            for(var globalFlagid in GlobalFlags){                                                
                                                if(GlobalFlags[globalFlagid].channelBrandID == data[m].ChannelBrandID){                                                                                                    
                                                    if(GlobalFlags[globalFlagid].RowCount == AreaIDs.length){
                                                        Percent = '<table id="hiddenTable"><tr><td></td><td>-</td><td></td></tr></table>';
                                                    }else{
                                                        if (percentvalue > 0) {
                                                            Percent = '<table id="hiddenTable"><tr><td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ '</td><td>&#09;<img id="arrow_up" src="icons/bullets/arrow_up.png"/></td><td>' + percentvalue.toFixed(decimalNum) + '%</td></tr></table>';
                                                        } else {
                                                            Percent = '<table id="hiddenTable"><tr><td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ '</td><td>&#09;<img id="arrow_down" src="icons/bullets/arrow_down.png"/></td><td>' + percentvalue.toFixed(decimalNum) + '%</td></tr></table>';
                                                        }
                                                    }
                                                }
                                            }                                                                                                                        
                                        }
                 
                                        if(Percent == '-'){
                                            EachRow += '<td><table id="hiddenTable"><tr><td></td><td>-</td><td></td></tr></table></td>';
                                        }else{
                                            if(localStorage["UnitID"] != 3){                                                
                                                EachRow += '<td id="GLOBALID' + data[m].RegionID + "" + data[m].ChannelBrandID + '" onClick="passIDs(' + data[m].areaid + ',' + data[m].DemographicID + ',' + data[m].ChannelBrandID + ',\'' + data[m].AreaName + '\',\'' + data[m].TargetCode + '\',\''+ data[m].ChannelBrandName +'\',\''+ data[m].ChannelID +'\',\'' + data[m].CountryCode + '\',\'' + data[m].IsRegionRow + '\',\'' + data[m].RegionID + '\')">&#09;' + Percent + '</td>';
                                            }else{
                                                EachRow += '<td>-</td>';
                                            }                                            
                                        }
                                                                                
                                    }else{                                        
                                        for(var deductid in DeductCurrentRefValue){
                                            if(data[m].ChannelBrandID == DeductCurrentRefValue[deductid].id){
                                                DeductCurrent = Number(DeductCurrent) + parseFloat(DeductCurrentRefValue[deductid].CurrentValue.replace(/,/g, ''));
                                                DeductReference = Number(DeductReference) + parseFloat(DeductCurrentRefValue[deductid].ReferenceValue.replace(/,/g, ''));
                                            }                                                    
                                        }
                                        
                                        //alert(Number(DeductCurrent) + "/" + Number(DeductReference));

                                        var percentvalue = ((parseFloat(data[m].CurrentValue.replace(/,/g, '')) - parseFloat(data[m].ReferenceValue.replace(/,/g, ''))) / parseFloat(data[m].ReferenceValue.replace(/,/g, ''))) * 100;
                                        var dataCurrent = Number(parseFloat(data[m].CurrentValue.replace(/,/g, ''))) - Number(DeductCurrent);
                                        var dataReference = Number(parseFloat(data[m].ReferenceValue.replace(/,/g, ''))) - Number(DeductReference);
                                        var unitDecimal = 3;
                                        
                                        if($('#unittype').val() == 4){
                                            unitDecimal = 0;
                                        }                                

                                        if (data[m].ReferenceValue == 0) {
                                            if(localStorage["UnitID"] != 3){
                                                if(data[m].CurrentValue == 0){
                                                EachRow += '<td><table id="hiddenTable"><tr><td></td><td>-</td><td></td></tr></table></td>'
                                                }else{
                                                    EachRow += '<td>'+ (Number(data[m].CurrentValue) - Number(DeductCurrent)) +PercentTag+ ' (N/A)*' +'</td>';
                                                }
                                            }else{
                                                EachRow += '<td>-</td>';
                                            }                                                                                
                                        }else{
                                            if(localStorage["UnitID"] != 3){
                                                for(var globalFlagid in GlobalFlags){                                                
                                                    if(GlobalFlags[globalFlagid].channelBrandID == data[m].ChannelBrandID){                                                                                                        
                                                        if(GlobalFlags[globalFlagid].RowCount == AreaIDs.length){
                                                            EachRow += '<td><table id="hiddenTable"><tr><td></td><td>-</td><td></td></tr></table></td>';
                                                        }else{
                                                            if (percentvalue > 0) {
                                                                EachRow += '<td id="GLOBALID' + data[m].RegionID + "" + data[m].ChannelBrandID + '" class="GTAMsource" onClick="passIDs(' + data[m].areaid + ',' + data[m].DemographicID + ',' + data[m].ChannelBrandID + ',\'' + data[m].AreaName + '\',\'' + data[m].TargetCode + '\',\''+ data[m].ChannelBrandName +'\',\''+ data[m].ChannelID +'\',\'' + data[m].CountryCode + '\',\'' + data[m].IsRegionRow + '\',\'' + data[m].RegionID + '\')"><table id="hiddenTable"><tr><td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ '</td><td>&#09;<img id="arrow_up" src="icons/bullets/arrow_up.png"/></td><td>' + dataReference.toFixed(unitDecimal) + '</td></tr></table></td>';
                                                            } else {
                                                                EachRow += '<td id="GLOBALID' + data[m].RegionID + "" + data[m].ChannelBrandID + '" class="GTAMsource" onClick="passIDs(' + data[m].areaid + ',' + data[m].DemographicID + ',' + data[m].ChannelBrandID + ',\'' + data[m].AreaName + '\',\'' + data[m].TargetCode + '\',\''+ data[m].ChannelBrandName +'\',\''+ data[m].ChannelID +'\',\'' + data[m].CountryCode + '\',\'' + data[m].IsRegionRow + '\',\'' + data[m].RegionID + '\')"><table id="hiddenTable"><tr><td>'+ dataCurrent.toFixed(unitDecimal) +PercentTag+ '</td><td>&#09;<img id="arrow_down" src="icons/bullets/arrow_down.png"/></td><td>' + dataReference.toFixed(unitDecimal) + '</td></tr></table></td>';
                                                            }
                                                        }
                                                    }
                                                }                                                 
                                            }else{
                                                EachRow += '<td>-</td>';
                                            }                                                                                       
                                        }   
                                    }
                                    break;
                                }                                
                            }
                            if (EachChannel.length === 0) {
                                EachRow += '<td>-</td>';
                            }
                        }
                        output += '<tr onclick="GTAMsource()">' + EachRow + '</tr>';
                    }
            output += '</table><small id="TAMsource"></small><small id="disclaimer">(N/A)* = No data/Insufficent data for comparison period<br/>(N/A)! = Selected period'+"'"+'s data not in yet</small>';                    
            $('#performancecontent').html(output);        

            var cellid = "CELLID" + localStorage["AreaID"] + "" + localStorage["ChannelBrandID"];
            if(localStorage["IsRegionRow"] ==0){
                $("#" + cellid).css("fontWeight", "bolder");
                $("#" + cellid).css("border", "2px solid #000");
                $("#" + cellid).css("backgroundColor", "#F7F7F7");
            }                    

            localStorage['CELLIDs'] = cellid;

            var cellid2 = "GLOBALID" + localStorage["RegionID"] + "" + localStorage["ChannelBrandID"];
            if(localStorage["IsRegionRow"] ==1){
                $("#" + cellid2).css("fontWeight", "bolder");
                $("#" + cellid2).css("border", "2px solid #000");
                $("#" + cellid2).css("backgroundColor", "#F7F7F7");            
            }            

            localStorage['GLOBALIDs'] = cellid2;
            //Dateline for Reach                    
             
            PopulateSections();            
            ratingsWidth = document.getElementById("performancecontent").offsetWidth;
            $('#RatingsTable').css("width",'100%');
            $('#RatingsTable th img').css("width",'100px');
            $('#RatingsTable th img').css("height","40px");
            //var imageWidth = document.getElementById("logo").offsetWidth;            
            //$('#RatingsTable th img').css("height",((imageWidth / 10) * 4) + "px");
            $('#RatingsTable th:first-child img').css("width",'35px');
            $('#RatingsTable th:first-child img').css("height",'35px');
            $('#RatingsTable th,#RatingsTable td').css("padding",'1px 1px 1px 1px');
            $('#RatingsTable td').css("padding",'0.5% 1px 0.5% 1px');
            $('#RatingsTable td:first-child img').css("width","30px"); 


            $("#RatingsTable tr td").each(function() {                
                if($(this).data("id") != undefined && $(this).data("name") != undefined && $("#period")[0].selectedIndex == 0 && ($('#unittype').val() == 4 || $('#unittype').val() == 5)){
                    var RegionID = $(this).data("id");
                    var AreaID = $(this).data("name");
                    var date = AppendAreaDateline(RegionID,AreaID)
                    $(this).attr('data-tooltip',date);  
                }    
            });                       
        })
        .fail(function() {
            alert("Ajax failed to fetch data");
        });        
}
function dashtooltip(){
    return 'dashtooltip';
}
function AppendAreaDateline(RegionID,AreaID){    
    for(var i in GetLastDates){
        if(RegionID == GetLastDates[i].RegionID && AreaID == GetLastDates[i].AreaID){
            var date = FormatDateLine(GetLastDates[i].AreaLastDate);
        }        
    }
    if($('#unittype').val() == 4){
        return "Reach000 Last avail. date : " + date;
    }else{
        return "Reach% Last avail. date : " + date;
    }
}
function GTAMsource(){
    if( $('#area').val() == 1 ){
        $('.x_content #TAMsource').html('Source:</small><small style="text-align: justify;text-justify: inter-word;">BARB,<br/><span style="margin-left: 35px;">Kantar Media South Africa</span>,<br/><span style="margin-left: 35px;">AGB Italia</span>,<br/><span style="margin-left: 35px;">Nielsen Audience Measurement Poland</span>');
    }else if( $('#area').val() == 2 ){
        $('.x_content #TAMsource').html('Source:</small><small>GfK Netherlands, <br/><span style="margin-left: 35px;">Nielsen Audience Measurement Hungary</span>, <br/><span style="margin-left: 35px;">GARB Audience Measurement Bulgaria</span>');
    }else if( $('#area').val() == 4 ){
        $('.x_content #TAMsource').html('Source:</small><small>GfK Singapore, <br/><span style="margin-left: 35px;">Kantar Media Malaysia</span>, <br/><span style="margin-left: 35px;">Kantar Media Philippines</span>');
    }
}
function quarterEnd(quarter){
    var y = quarter.substring(0,4);
    var m = quarter.substring(4,6);
    var periodEndDate = new Date(y, (m*3),0);
    var ddd = periodEndDate.getDate();
    var mmm = periodEndDate.getMonth()+1;
    var yyy = periodEndDate.getFullYear();
    return  yyy + "" + ((mmm-1 < 10 ? '0' : '') + (mmm)) + "" + ddd;   
}
function quarterStart(quarter){
    var y = quarter.substring(0,4);
    var m = quarter.substring(4,6);
    if(m == 1){
        return  y + "" + "0101";
    }else if(m==2){
        return  y + "" + "0401";
    }else if(m==3){
        return  y + "" + "0701";
    }else if(m==4){
        return  y + "" + "0901";
    }
}
function GetMaxMinDate(y,w,type,cat){
    var periodStart = new Date(y, 0, 1 + w * 7);
    var dow = periodStart.getDay();
    var ISOweekStart = periodStart;
    ISOweekStart.setDate(periodStart.getDate() - periodStart.getDay() + 1);
                                                
    var dd = ISOweekStart.getDate();
    var mm = ISOweekStart.getMonth()+1;
    var yy = ISOweekStart.getFullYear();
    if(type == 2){                
        return yy+""+ ((mm-1 < 9 ? '0' : '') + (mm));
    }else if(type == 3){      
            if(cat == 'min'){
            if(mm>= 1 && mm <= 3){
                return yy+"0101"; 
            }else if(mm>= 4 && mm <= 6){
                return yy+"0401"; 
            }else if(mm>= 7 && mm <= 9){
                return yy+"0701"; 
            }else if(mm>= 10 && mm <= 12){
                return yy+"0901"; 
            }
        }else{
            var m = (w / 4)
            var periodEndDate = new Date(y, m.toFixed(0),0);
            var ddd = periodEndDate.getDate();
            var mmm = periodEndDate.getMonth()+1;
            var yyy = periodEndDate.getFullYear();
            return  yyy + "" + ((mmm-1 < 9 ? '0' : '') + (mmm)) + "" + ddd;
        }  
    }else if(type == 4){
        return yy;
    }    
}
function returnPercentVal(returnPctgVal){
    if(returnPctgVal = -100){
        return returnPctgVal + '.0';
    }else{
        return returnPctgVal;
    }
    
}

function passIDs(areaid, demoid, channelbrandid, areaname, TargetCode, ChannelBrandName,ChannelID,CountryCode,IsRegionRow,RegionID) {
    
    $("#" + "CELLID" + localStorage["AreaID"] + "" + localStorage["ChannelBrandID"]).css("backgroundColor", "#fff");
    $("#" + "CELLID" + localStorage["AreaID"] + "" + localStorage["ChannelBrandID"]).css("fontWeight", "normal");
    $("#" + "CELLID" + localStorage["AreaID"] + "" + localStorage["ChannelBrandID"]).css("border", "1px solid #ccc");

    $("#" + "GLOBALID" + localStorage["RegionID"] + "" + localStorage["ChannelBrandID"]).css("backgroundColor", "#fff");
    $("#" + "GLOBALID" + localStorage["RegionID"] + "" + localStorage["ChannelBrandID"]).css("fontWeight", "normal");
    $("#" + "GLOBALID" + localStorage["RegionID"] + "" + localStorage["ChannelBrandID"]).css("border", "1px solid #ccc");

    localStorage["AreaID"] = areaid;
    localStorage["AreaName"] = areaname;
    localStorage["DemographicID"] = demoid;
    localStorage["ChannelID"] = ChannelID;
    localStorage["ChannelBrandID"] = channelbrandid;
    localStorage["TargetCode"] = TargetCode;
    localStorage["ChannelBrandName"] = ChannelBrandName;
    localStorage["CountryCode"] = CountryCode;
    localStorage["IsRegionRow"] = IsRegionRow;
    localStorage["RegionID"] = RegionID;        
    if(IsRegionRow == 0){
        var cellid1 = "CELLID" + localStorage["AreaID"] + "" + localStorage["ChannelBrandID"];
    }else{
        var cellid1 = "GLOBALID" + localStorage["RegionID"] + "" + localStorage["ChannelBrandID"];
    }
    $("#" + cellid1).css("fontWeight", "bolder");
    $("#" + cellid1).css("border", "2px solid #000");
    $("#" + cellid1).css("backgroundColor", "#F7F7F7");  
      
    PopulateSections();    
}



function transpose(original) {
    var copy = [];            
    for (var i = 0; i < original.length; ++i) {
        for (var j = 0; j < original[i].length; ++j) {
            // skip undefined values to preserve sparse array
            if (original[i][j] === undefined) continue;
            // create row if it doesn't exist yet
            if (copy[j] === undefined) copy[j] = [];
            // swap the x and y coords for the copy
            copy[j][i] = original[i][j];
        }
    }
    return copy;
}

function getISOWeeks(y) {
    var d, isLeap;
    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
}

function GetPeriods(Period, Periods) {
    var Y = Period.substring(0, 4);
    if (localStorage["PeriodTypeID"] == 1) //week
    {
        var maxweek = getISOWeeks(Y);
        var StartPeriod = Y + maxweek;
        Periods.push(StartPeriod);
        for (var i = 1; i < maxweek; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }

        var LastYear = Number(Y) - Number(1);
        maxweek = getISOWeeks(LastYear);
        StartPeriod = LastYear.toString() + maxweek;
        Periods.push(StartPeriod);
        for (var i = 1; i < maxweek; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }
        
        LastYear = Number(Y) - Number(2);
        maxweek = getISOWeeks(LastYear);
        StartPeriod = LastYear.toString() + maxweek;
        Periods.push(StartPeriod);
        for (var i = 1; i < maxweek; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }
        
    } else if (localStorage["PeriodTypeID"] == 2) //month
    {
        var maxmonth = 12;
        var StartPeriod = Y + maxmonth;
        Periods.push(StartPeriod);
        for (var i = 1; i < maxmonth; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }
        var LastYear = Number(Y) - Number(1);
        StartPeriod = LastYear.toString() + maxmonth;
        Periods.push(StartPeriod);
        for (var i = 1; i < maxmonth; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }
        
        LastYear = Number(Y) - Number(2);
        StartPeriod = LastYear.toString() + maxmonth;
        Periods.push(StartPeriod);
        for (var i = 1; i < maxmonth; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }
        
    } else if (localStorage["PeriodTypeID"] == 3) //quarter
    {
        var maxquarter = 4;
        var StartPeriod = Y + '04';
        Periods.push(StartPeriod);
        for (var i = 1; i < maxquarter; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }

        var LastYear = Number(Y) - Number(1);
        StartPeriod = LastYear + '04';
        Periods.push(StartPeriod);
        for (var i = 1; i < maxquarter; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }
        
        LastYear = Number(Y) - Number(2);
        StartPeriod = LastYear + '04';
        Periods.push(StartPeriod);
        for (var i = 1; i < maxquarter; i++) {
            Periods.push(Number(StartPeriod) - Number(i));
        }            
        
    } else if (localStorage["PeriodTypeID"] == 4) //year
    {
        Periods.push(Y);
        Periods.push(Number(Y) - Number(1));
        Periods.push(Number(Y) - Number(2));
    }
}

function GetSamePeriodLastYear(PeriodNumber,RefPeriods){
    var currentYear = PeriodNumber.substring(0, 4) + "" + PeriodNumber.substring(4, PeriodNumber.length);
    var prevYear = (PeriodNumber.substring(0, 4)-1) + "" + PeriodNumber.substring(4, PeriodNumber.length);

    var currentMaxWeek = PeriodNumber.substring(0, 4) + "" + getISOWeeks(PeriodNumber.substring(0, 4));
    var prevMaxWeek = (PeriodNumber.substring(0, 4) -1) + "" + getISOWeeks((PeriodNumber.substring(0, 4)-1));
    if($('#periodType').val() == 1){
        if(currentYear == currentMaxWeek){
            if(currentMaxWeek<=prevMaxWeek){
                return RefPeriods.push((PeriodNumber.substring(0, 4) - 1) + PeriodNumber.substring(4, PeriodNumber.length));
            }else{
                alert('Sorry! Current Year has '+ getISOWeeks(PeriodNumber.substring(0, 4)) + ' Weeks ' + 'and Previous Year has Only ' + getISOWeeks((PeriodNumber.substring(0, 4)-1)) + ' Weeks');
            }
        }else{
            return RefPeriods.push((PeriodNumber.substring(0, 4) - 1) + PeriodNumber.substring(4, PeriodNumber.length));
        }
    }else{
        return RefPeriods.push((PeriodNumber.substring(0, 4) - 1) + PeriodNumber.substring(4, PeriodNumber.length));
    }
}
function initializedNavigation() {
    getPeriodDate(GetWeekNum($('#period').val()),GetYearNum($('#period').val()),$('#periodtype').val());
    localStorage['cellid'] = '';
    var PeriodTypeObj = document.getElementById('periodtype');
    localStorage["PeriodTypeID"] = PeriodTypeObj[PeriodTypeObj.selectedIndex].value;

    var PeriodNumberObj = document.getElementById('period');
    localStorage["PeriodNumber"] = PeriodNumberObj[PeriodNumberObj.selectedIndex].value;
    var Periods = [];
    GetPeriods(localStorage["PeriodNumber"], Periods);
    
    var selectedIndex = Periods.indexOf(Number(localStorage["PeriodNumber"]));     
    if(selectedIndex == -1){
        selectedIndex = 0;
    }
    var ReeferencePeriodObj = document.getElementById('refperiod');
    if($('#refperiod').val() != -1){
        var PeriodStartIndex = Number(selectedIndex) + Number(1);
        var PeriodEndIndex = Number(selectedIndex) + Number(ReeferencePeriodObj[ReeferencePeriodObj.selectedIndex].value) + Number(1);        
        var Minvalue = Math.min(Periods.length, PeriodEndIndex);
        var ReferencePeriods = '';
        for (var i = PeriodStartIndex; i < Minvalue; i++) {
            if (ReferencePeriods.length === 0) {
                ReferencePeriods += Periods[i];
            } else {
                ReferencePeriods += ',' + Periods[i];
            }
        }
        localStorage["ReferencePeriods"] = ReferencePeriods;
    }else{
        if($('#periodtype').val() != 4){
            var RefPeriods = [];        
            GetSamePeriodLastYear(localStorage['PeriodNumber'],RefPeriods);
            localStorage["ReferencePeriods"] = RefPeriods;
        }else{
            localStorage["ReferencePeriods"] = '-1';
        }
    }        
    
    PeriodStartIndex = Number(selectedIndex);
    if (localStorage["PeriodTypeID"] == 1) //week
    {
        PeriodEndIndex = Number(selectedIndex) + Number(12);
    } else if (localStorage["PeriodTypeID"] == 2) //month
    {
        PeriodEndIndex = Number(selectedIndex) + Number(12);
    } else if (localStorage["PeriodTypeID"] == 3) //quarter
    {
        PeriodEndIndex = Number(selectedIndex) + Number(4);
    } else if (localStorage["PeriodTypeID"] == 4) //year
    {
        PeriodEndIndex = Number(selectedIndex) + Number(1);
    }
    Minvalue = Math.min(Periods.length, PeriodEndIndex);
    var TrendingCurrentPeriods = '';
    for (var i = PeriodStartIndex; i < Minvalue; i++) {
        if (TrendingCurrentPeriods.length === 0) {
            TrendingCurrentPeriods += Periods[i];
        } else {
            TrendingCurrentPeriods += ',' + Periods[i];
        }
    }
    localStorage["TrendingCurrentPeriods"] = TrendingCurrentPeriods;


    if (localStorage["PeriodTypeID"] == 1) //week
    {
        PeriodStartIndex = Number(selectedIndex) + Number(52);
        PeriodEndIndex = Number(PeriodStartIndex) + Number(12);
    } else if (localStorage["PeriodTypeID"] == 2) //month
    {
        PeriodStartIndex = Number(selectedIndex) + Number(12);
        PeriodEndIndex = Number(PeriodStartIndex) + Number(12);
    } else if (localStorage["PeriodTypeID"] == 3) //quarter
    {
        PeriodStartIndex = Number(selectedIndex) + Number(4);
        PeriodEndIndex = Number(PeriodStartIndex) + Number(4);
    } else if (localStorage["PeriodTypeID"] == 4) //year
    {
        PeriodStartIndex = Number(selectedIndex) + Number(1);
        PeriodEndIndex = Number(PeriodStartIndex) + Number(1);
    }
    Minvalue = Math.min(Periods.length, PeriodEndIndex);
    var TrendingPreviousPeriods = '';
    for (var i = PeriodStartIndex; i < Minvalue; i++) {
        if (TrendingPreviousPeriods.length === 0) {
            TrendingPreviousPeriods += Periods[i];
        } else {
            TrendingPreviousPeriods += ',' + Periods[i];
        }
    }
    localStorage["TrendingPreviousPeriods"] = TrendingPreviousPeriods;

    var TargetGroupObj = document.getElementById('target');
    localStorage["TargetGroupName"] = TargetGroupObj[TargetGroupObj.selectedIndex].value;

    var ChannelBrandIDs = ''
    var ChannelBrandObj = document.getElementById('channelbrand1');
    for (var i = 0; i < ChannelBrandObj.length; i++) {
        if (ChannelBrandObj[i].selected) {
            if (ChannelBrandIDs.length === 0) {
                ChannelBrandIDs += ChannelBrandObj[i].value;
            } else {
                ChannelBrandIDs += ',' + ChannelBrandObj[i].value;
            }
        }
    }

    localStorage["ChannelBrandIDs"] = ChannelBrandIDs;

    var UnitTypeObj = document.getElementById('unittype');
    localStorage["UnitID"] = UnitTypeObj[UnitTypeObj.selectedIndex].value;
    localStorage["UnitText"] = UnitTypeObj[UnitTypeObj.selectedIndex].text;

    

    localStorage["ValueFormatPercent"] = 0;
    var ValueFormatPercentObj = document.getElementById('ValueFormatPercent');
    if (ValueFormatPercentObj.checked) {
        localStorage["ValueFormatPercent"] = 1;
    }


    var dpartIDObj = document.getElementById('dpart');
    localStorage["isPrimeTime"] = dpartIDObj[dpartIDObj.selectedIndex].value;
    localStorage["InputDaypartGroupID"] = $('#dpart').val();
    ratings(localStorage["TargetGroupName"], localStorage["ChannelBrandIDs"], localStorage["UnitID"], localStorage["PeriodTypeID"], localStorage["PeriodNumber"], localStorage["ReferencePeriods"], localStorage["InputDaypartGroupID"],$('#area').val());    
}


function TrendingGraph(TableIndex) {
    localStorage["TrendingTableIndex"] = TableIndex;      
    $.ajax({
        url: "TrendingGraph.php?AreaID=" + localStorage["AreaID"] +
            "&DemographicID="+ localStorage["DemographicID"] +
            "&ChannelBrandID=" + localStorage["ChannelBrandID"] +
            "&UnitID=" + localStorage["UnitID"] +
            "&PeriodTypeID=" + localStorage["PeriodTypeID"] +
            "&CurrentPeriods=" + localStorage["TrendingCurrentPeriods"] +
            "&PrevPeriods=" + localStorage["TrendingPreviousPeriods"] +
            "&InputDaypartGroupID=" + localStorage["InputDaypartGroupID"] +
            "&RegionID=" + localStorage["RegionID"] +
            "&IsRegionRow=" + localStorage["IsRegionRow"] +
            "&TargetGroupName="+ localStorage["TargetGroupName"],                       
        type: "GET",
        cache : false,
        success: function(data) {            
            var temp = $('#periodtype').val();
            if (temp == 1) {
                temp = 'Week';
            } else if (temp == 2) {
                temp = 'Month';
            } else if (temp == 3) {
                temp = 'Quarter';
            } else if (temp == 4) {
                temp = 'Year';
            }

            $('#xAxisname').text(temp);
            var Periods = [];
            for (var i in data.Periods) {
                Periods.push(data.Periods[i].Period);
            }
            Periods.reverse();
            var CurrentValues = [];
            for (var i in data.CurrentValues) {
                if($('#unittype').val() == 4){
                    CurrentValues.push(parseFloat(data.CurrentValues[i].CurrentValue.replace(/,/g, '')).toFixed(0));
                }else{
                    CurrentValues.push(parseFloat(data.CurrentValues[i].CurrentValue.replace(/,/g, '')));
                }
            }
            CurrentValues.reverse();
            var PrevValues = [];
            for (var i in data.PrevValues) {
                if($('#unittype').val() == 4){
                    PrevValues.push(parseFloat(data.PrevValues[i].PrevValue.replace(/,/g, '')).toFixed(0));
                }else{
                    PrevValues.push(parseFloat(data.PrevValues[i].PrevValue.replace(/,/g, '')));
                }
            }
            PrevValues.reverse();            
            if (localStorage["ValueFormatPercent"] == 1) {
                var sum = CurrentValues.map(function(num, idx) {
                    if (num == 0 || PrevValues[idx] == 0) {
                        pctg = '';
                        return pctg;
                    } else {
                        var pctg = ((num - PrevValues[idx]) / PrevValues[idx]) * 100;                                            
                        
                        if($('#unittype').val() == 4){
                            if(pctg >= 0){
                            return {value:pctg.toFixed(0)+'%',textStyle:{color:'green'}};
                            }else{
                                return {value:pctg.toFixed(0)+'%',textStyle:{color:'red'}};
                            }
                        }else{
                            if(pctg >= 0){
                            return {value:pctg.toFixed(1)+'%',textStyle:{color:'green'}};
                            }else{
                                return {value:pctg.toFixed(1)+'%',textStyle:{color:'red'}};
                            }
                        }                        
                    }
                });
            } else {
                var sum = CurrentValues.map(function(num, idx) {
                    if (num == 0 || PrevValues[idx] == 0) {
                        pctg = '';
                        return pctg;
                    } else {
                        var pctg = num - PrevValues[idx];
                        if($('#unittype').val() == 4){
                            if(pctg >= 0){
                                return {value:pctg.toFixed(0),textStyle:{color:'green'}};
                            }else{
                                return {value:pctg.toFixed(0),textStyle:{color:'red'}};
                            }
                        }else{
                            if(pctg >= 0){
                                return {value:pctg.toFixed(3),textStyle:{color:'green'}};
                            }else{
                                return {value:pctg.toFixed(3),textStyle:{color:'red'}};
                            }
                        }                                                
                    }
                });
            }
            if(browserIsIE == true){
                $('#bargraph').css("width",GraphDefaultWidth);
            }
            var echartBar = echarts.init(document.getElementById('bargraph'));
            var currentFlag = 1, prevviousFlag = 1;                    
            function ShowSelected(){
                    if(prevviousFlag == 0 && currentFlag == 1){
                        return {'Prev. Year':false,'Current':true};
                    }else if(prevviousFlag == 1 && currentFlag == 0){
                        return {'Prev. Year':true,'Current':false};
                    }else{
                        currentFlag = 1;
                        prevviousFlag = 1;
                        return {'Prev. Year':true,'Current':true};                        
                    }                
                }
            function PutPctg(){
                if(currentFlag == 1 || prevviousFlag == 1){
                    if(localStorage["ValueFormatPercent"] == 1){
                    return '%';
                    }else{
                        return '';
                    }                
                }else{
                    return '';
                }                
            }    
            function hideTopAxis(){
                if(currentFlag == 0 || prevviousFlag == 0){
                    return false;
                }else{
                    return true;
                }
            }
            function GetTopAxis(){                
                if(currentFlag == 1 && prevviousFlag == 0){
                    return GetValues('current');
                }else if(currentFlag == 0 && prevviousFlag == 1){
                    return GetValues('previous');
                }else if(currentFlag == 1 && prevviousFlag == 1){
                    return sum;
                }
            }
            function GetValues(status){                
                var temp = [];
                if(status == 'current'){
                    for(var i in data.CurrentValues){
                        if(data.CurrentValues[i].CurrentValue>0){
                            temp.push({value:data.CurrentValues[i].CurrentValue,textStyle:{color:'green'}}).toFixed(3);
                        }else{
                            temp.push({value:data.CurrentValues[i].CurrentValue,textStyle:{color:'red'}}).toFixed(3);
                        }            
                    }
                }else{
                    for(var i in data.PrevValues){
                        if(data.PrevValues[i].PrevValue>0){
                            temp.push({value:data.PrevValues[i].PrevValue,textStyle:{color:'green'}}).toFixed(3);
                        }else{
                            temp.push({value:data.PrevValues[i].PrevValue,textStyle:{color:'red'}}).toFixed(3);
                        }            
                    } 
                }
                
                return temp.reverse();
            }        
            echartBar.on('magictypechanged', function(params) {
                magicType = params.currentType;
            });
            echartBar.on('legendselectchanged', function(params) {                
                var isSelected = params.selected[params.name];                
                var SelectUnselect = (isSelected ? 'select' : 'unselect');
                
                if(SelectUnselect == 'select'){
                    if(params.name == 'Current'){
                        currentFlag = 1;
                    }else{
                        prevviousFlag = 1;
                    }
                }else{                    
                    if(params.name == 'Current' && prevviousFlag == 1){                        
                        currentFlag = 0;                        
                    }else if(params.name != 'Current' && currentFlag == 1){                        
                        prevviousFlag = 0;                        
                    }
                }

                echartBar.setOption({
                    title: {
                        text:localStorage["UnitText"],
                        textStyle: {
                            fontSize: 20,
                            fontFamily: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
                            fontWeight: 'bolder',
                            extraCssText: 'left: -20px'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        textStyle: {
                            color: '#000'
                        },
                        position: function(pos, params, el, elRect, size) {
                           var obj = {top: 10};
                            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                            return obj;
                        },
                        extraCssText: 'width: 170px'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark : {show: true},  
                            dataView: {
                                show: false,
                                title: "Text View",
                                lang: [
                                    "Text View",
                                    "Close",
                                    "Refresh",
                                ],
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar'],
                                title: {
                                    line: 'Line Chart',
                                    bar: 'Bar Chart',
                                    stack: 'Stacked Chart',
                                    tiled: 'Tiled Chart',
                                }                               
                            },
                            restore: {
                                show: false,
                                title: "Restore"
                            },
                            saveAsImage: {
                                show: true,
                                title: "Save Image"
                            },

                        }
                    },
                    legend: {
                        data: ['Prev. Year','Current'],
                        selected: ShowSelected()
                    },
                    grid: {
                        left: '1%',
                        right: '0%',
                        bottom: '0%',
                        top: '20%',
                        containLabel: true
                    },
                    yAxis: {                    
                            type: 'value',
                            //boundaryGap: [0, 0],
                            label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                }
                        },
                    xAxis: [{
                            type: 'category',
                            data: Periods,
                            inverse: true
                        },
                        {
                            type: 'category',
                            position: 'top',
                            onZero: true,
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            zAxisIndex: 1,
                            scale: true,
                            inverse: true,                            
                            axisLabel: {
                                show: true,
                                /*formatter: '{value}' + PutPctg(),
                                textStyle: {
                                    color: function(v) {
                                        if (v >= 0) {
                                            return 'green'
                                        } else {
                                            return 'red'
                                        }
                                    }
                                },*/                                
                            },
                            data: GetTopAxis()
                        }
                    ],
                   calculable : true,
                        series: [                    
                            {
                                name: 'Prev. Year',
                                type: magicType,
                                data: PrevValues,
                                stack: 'Current',
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'top'
                                    }
                                },
                                
                                itemStyle : {  
                                      normal: {
                                          barBorderWidth: 0,
                                          barBorderColor: '#D9D9D9',
                                          color: '#D9D9D9'
                                      },
                                    emphasis: {
                                        barBorderColor: '#D9D9D9',
                                        color: '#D9D9D9'
                                      }
                                  },
                                  barGap : '10%',            
                                  barCategoryGap : '20%',
                                  barMinHeight : 0 ,                      
                                  legendHoverLink: true,
                                  markPoint: {
                                  clickable: true,
                                  symbol: 'pin',
                                  symbolSize: 80,
                                  symbolRotate: null,
                                  large: false                          
                                  }                           
                            },
                            {
                              name: "Current",
                                type: magicType,
                                data: CurrentValues,
                                label: {
                                    normal: {
                                        show: false,
                                        position: 'top'
                                    }
                                },
                                itemStyle : {  
                                      normal: {
                                          barBorderWidth: 0,
                                          barBorderColor: '#00345A',
                                          color: '#00345A'
                                      },
                                    emphasis: {
                                        barBorderColor: '#073d64',
                                        color: '#073d64'
                                      }
                                  },
                            markPoint: {
                                clickable: true,
                                symbol: 'pin',
                                symbolSize: 80,
                                symbolRotate: null,
                                large: false
                            }
                        }
                    ]
                });
            });            
            echartBar.setOption({
                title: {
                    text: localStorage["UnitText"],
                    textStyle: {
                        fontSize: 20,
                        fontFamily: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial, sans-serif',
                        fontWeight: 'bolder',
                        extraCssText: 'left: -20px'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'rgba(245, 245, 245, 0.8)',
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    },
                    position: function(pos, params, el, elRect, size) {
                       var obj = {top: 10};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    },
                    extraCssText: 'width: 170px'
                },
                toolbox: {
                    show: true,
                    feature: {
                         mark : {show: true},  
                        dataView: {
                            show: false,
                            title: "Text View",
                            lang: [
                                "Text View",
                                "Close",
                                "Refresh",
                            ],
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar'],
                            title: {
                                line: 'Line Chart',
                                bar: 'Bar Chart',
                                stack: 'Stacked Chart',
                                tiled: 'Tiled Chart',
                            }
                        },
                        restore: {
                            show: false,
                            title: "Restore"
                        },
                        saveAsImage: {
                            show: true,
                            title: "Save Image"
                        }
                    }
                },
                legend: {
                    data: ['Prev. Year','Current'],
                    events: {

                    }
                },
                grid: {
                    left: '1%',
                    right: '0%',
                    bottom: '0%',
                    top: '20%',
                    containLabel: true
                },
                yAxis: {                    
                        type: 'value',
                        //boundaryGap: [0,0],
                        scale: 3,
                        label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                    },
                xAxis: [{
                        type: 'category',
                        data: Periods,
                        inverse: true
                    },
                    {
                        type: 'category',
                        position: 'top',
                        onZero: true,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        zAxisIndex: 1,
                        scale: true,
                        inverse: true,
                        axisLabel: {
                            show: true,
                            /*formatter: '{value}' + PutPctg(),
                            textStyle: {
                                color: function(v) {
                                    if (v >= 0) {
                                        return 'green'
                                    }else{
                                        return 'red'
                                    }
                                },
                            }*/
                        },
                        data: sum
                    }
                ],
               calculable : true,
                    series: [                    
                        {
                            name: 'Prev. Year',
                            type: magicType,
                            data: PrevValues,
                            stack: 'Current',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            
                            itemStyle : {  
                                  normal: {
                                      barBorderWidth: 0,
                                      barBorderColor: '#D9D9D9',
                                      color: '#D9D9D9'
                                  },
                                emphasis: {
                                    barBorderColor: '#D9D9D9',
                                    color: '#D9D9D9'
                                  }
                              },
                              barGap : '10%',            
                              barCategoryGap : '20%',
                              barMinHeight : 0 ,                      
                              legendHoverLink: true,
                              markPoint: {
                              clickable: true,
                              symbol: 'pin',
                              symbolSize: 80,
                              symbolRotate: null,
                              large: false                          
                              }                           
                        },
                        {
                          name: "Current",
                            type: magicType,
                            data: CurrentValues,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'top'
                                }
                            },
                            itemStyle : {  
                                  normal: {
                                      barBorderWidth: 0,
                                      barBorderColor: '#00345A',
                                      color: '#00345A'
                                  },
                                emphasis: {
                                    barBorderColor: '#073d64',
                                    color: '#073d64'
                                  }
                              },
                        markPoint: {
                            clickable: true,
                            symbol: 'pin',
                            symbolSize: 80,
                            symbolRotate: null,
                            large: false
                        }
                    }
                ]
            });
        }
    });
}


function TrendingTable(TableIndex) {
    localStorage["TrendingTableIndex"] = TableIndex; 
    $.ajax({
        url: "TrendingGraph.php?AreaID=" + localStorage["AreaID"] +
            "&DemographicID="+ localStorage["DemographicID"] +
            "&ChannelBrandID=" + localStorage["ChannelBrandID"] +
            "&UnitID=" + localStorage["UnitID"] +
            "&PeriodTypeID=" + localStorage["PeriodTypeID"] +
            "&CurrentPeriods=" + localStorage["TrendingCurrentPeriods"] +
            "&PrevPeriods=" + localStorage["TrendingPreviousPeriods"] +
            "&InputDaypartGroupID=" + localStorage["InputDaypartGroupID"] +
            "&RegionID=" + localStorage["RegionID"] +
            "&IsRegionRow=" + localStorage["IsRegionRow"] +
            "&TargetGroupName="+ localStorage["TargetGroupName"],
        type: "GET",
        cache : false,
        success: function(data) {
           
            var temp = localStorage["PeriodTypeID"];
            if (temp == 1) {
                temp = 'Week';
            } else if (temp == 2) {
                temp = 'Month';
            } else if (temp == 3) {
                temp = 'Quarter';
            } else if (temp == 4) {
                temp = 'Year';
            }

            var Periods = [];
            var output = '<table class="table table-striped table-bordered" id="TableTrending"><thead><tr><th>Period (' + temp + ')</th>';
            for (var i in data.Periods) {
                output += '<th>' + data.Periods[i].Period + '</th>';
            }
            output += '</tr><thead>';
            
            var PercentTag = '';
            if (localStorage["UnitID"]==2 || localStorage["UnitID"]==3 )
              PercentTag = '%';   
            
            //Current
            var current = [];
            output += '<tbody><tr><td>Current (' + localStorage["UnitText"] + ')</td>';
            for (var i in data.CurrentValues) {
                if($('#unittype').val() == 4){
                    var Reach = parseFloat(data.CurrentValues[i].CurrentValue.replace(/,/g, '')).toFixed(0);
                    output += '<td>' + Reach +PercentTag+ '</td>';                    
                }else{
                    output += '<td>' + data.CurrentValues[i].CurrentValue +PercentTag+ '</td>';                    
                }
                current.push(data.CurrentValues[i].CurrentValue);
            }
            output += '</tr>';

            //previous
            var previous = []
            output += '<tr><td>Previous (' + localStorage["UnitText"] + ')</td>';
            for (var i in data.PrevValues) {                 
                if($('#unittype').val() == 4){
                    var Reach = parseFloat(data.PrevValues[i].PrevValue.replace(/,/g, '')).toFixed(0);
                    output += '<td>' + Reach +PercentTag+ '</td>';                          
                }else{
                    output += '<td>' + data.PrevValues[i].PrevValue +PercentTag+ '</td>';                          
                }                   
                previous.push(data.PrevValues[i].PrevValue);
            }
            output += '</tr>';
           
            if (localStorage["ValueFormatPercent"] == 1) {
                var sum = current.map(function(num, idx) {
                    if (num == 0 || previous[idx] == 0) {
                        pctg = '';
                        return pctg;
                    } else {
                        var pctg = ((parseFloat(num.replace(/,/g, '')) - parseFloat(previous[idx].replace(/,/g, ''))) / parseFloat(previous[idx].replace(/,/g, ''))) * 100;
                        if($('#unittype').val() == 4){
                            return pctg.toFixed(0);
                        }else{
                            return pctg.toFixed(1);
                        }                        
                    }
                });
            } else {
                var sum = current.map(function(num, idx) {
                    if (num == 0 || previous[idx] == 0) {
                        pctg = '';
                        return pctg;
                    } else {
                        var pctg = parseFloat(num.replace(/,/g, '')) - parseFloat(previous[idx].replace(/,/g, ''));
                        if($('#unittype').val() == 4){
                            return pctg.toFixed(0);
                        }else{
                            return pctg.toFixed(3);
                        }                        
                    }
                });
            }

            output += '<tr><td>Difference</td>';

            for (var i = 0; i < current.length; i++) 
             if (sum[i] > 0) {
                if (localStorage["ValueFormatPercent"] == 1) 
                {
                  output += '<td>' + sum[i]+'%' + '<img id="arrow_up" src="icons/bullets/arrow_up.png"/></td>';
                } 
                else 
                  output += '<td>' + sum[i]+PercentTag+ '<img id="arrow_up" src="icons/bullets/arrow_up.png"/></td>';
              } 
              else if (sum[i] < 0) {
                if (localStorage["ValueFormatPercent"] == 1) 
                {
                  output += '<td>' + sum[i] +'%' + '<img id="arrow_down" src="icons/bullets/arrow_down.png"/></td>';   
                }
                else 
                  output += '<td>' + sum[i] +PercentTag+ '<img id="arrow_down" src="icons/bullets/arrow_down.png"/></td>';             
              } else {
                output += '<td>-</td>';
             }
      
            output += '</tr></tbody></table>';

            $('#graphtable').html(output);
            
        }
    });
}

function flaglogo(demoid, channelbrandid, ChannelBrandName) {
    if(localStorage["IsRegionRow"] == 0){
        var TargetCodeName = $('#RatingsTable #CELLID' + localStorage["AreaID"] + "" + localStorage["ChannelBrandID"]).parent().find('td.1 small').html();
    }else{
        var TargetCodeName = $('#RatingsTable #GLOBALID' + localStorage["RegionID"] + "" + localStorage["ChannelBrandID"]).parent().find('td.1 small').html();
        //alert(localStorage["RegionID"] + "" + localStorage["ChannelBrandID"]);        
    }        
    
    if(ChannelBrandName == 'HGTV/*FL'){
        var channelName = 'HGTV';
    }else{        
        var channelName = ChannelBrandName.split(' ').join('_')        
    }
    //Top Programme
    var flagname = localStorage["AreaName"].split(' ').join('_');
    var changeareasrc = document.getElementById("editflag");
    changeareasrc.src = 'icons/Country flags/flag_' + flagname + '.png';
    var changelogosrc = document.getElementById("editLogo");
    changelogosrc.src = 'icons/topproglogo/' + channelName + '.png';
    //Trending
    flagname = localStorage["AreaName"].split(' ').join('_');   
    if(localStorage['IsRegionRow'] == 0){        
        output = '<div class="sidebar"><img id="chartlogo" src="icons/topproglogo/' + channelName + '.png"/>' +
        '<img id="areaflag" src="icons/Country flags/flag_' + flagname + '.png"/>' +
        '<small>' + TargetCodeName + '</small></div>';
    }else{
        output = '<div class="sidebar"><img id="chartlogo" src="icons/topproglogo/' + channelName + '.png"/>' +
        '<img id="areaflag" src="icons/Area Icons/'+ TargetCodeName + '.png"/>' +
        '<small>' + TargetCodeName + '</small></div>';
    }
    $('#flaglogo').html(output);    
}


//********************************************************************Exporting functions************************************************************************************************       
    //export
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var datetoday = dd + "-" + mm + "-" + yyyy    
    function RatingsExportToXlsx() {
        exportTable(localStorage["TargetGroupName"],localStorage["ChannelBrandIDs"],localStorage["UnitID"],localStorage["PeriodTypeID"],localStorage["PeriodNumber"],localStorage["ReferencePeriods"],localStorage["InputDaypartGroupID"],'xlsx');        
    }
    
    function getModal(){        
        var modal = document.getElementById('myModal');    
        var btn = document.getElementById("myBtn");    
        var span = document.getElementsByClassName("close")[0];    
        btn.onclick = function() {
            modal.style.display = "block";        
        }    
        span.onclick = function() {
            modal.style.display = "none";
        }    
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
    function setTabIndex(tabIndex){
        localStorage["TopProgramTableIndex"] = tabIndex;
    }
    function ExportAll(){
        RatingsExportToXlsx()
        exportTopUniqueProgrammes(1,'xlsx','000')
        exportTopUniqueProgrammes(2,'xlsx','000')
        exportTopProgrammes(1,'xlsx','000')
        exportCompetitive()
        ExportTrending('xlsx')
    }
    function exportHeadersGroupMax(TopProgramIndividualUnitID){ //export headers for group or max top 10
        var headers = [];
        headers.push(['#'])
        headers.push(['Programme Title'])
        headers.push(['Eps Count'])
        if(TopProgramIndividualUnitID == 3){
            headers.push(['Date (Highest EP)'])
        }  
        for (var i = 0; i < topprogUnits.length; i++) {
            if (topprogUnits[i].selected) {
                if(topprogUnits[i].value == 'TRP'){
                    headers.push(['TRP'])
                }else if(topprogUnits[i].value == 'Thousands000'){
                    headers.push(['000'])
                }else if(topprogUnits[i].value == 'Share'){
                    headers.push(['Share'])
                }else if(topprogUnits[i].value == 'Cover000'){
                    headers.push(['Reach000'])
                }else if(topprogUnits[i].value == 'Cover'){
                    headers.push(['Reach%'])
                }else if(topprogUnits[i].value == 'ATS'){
                    headers.push(['ATS'])
                }else if(topprogUnits[i].value == 'RatingShare'){
                    headers.push(['RatingShare'])
                }else if(topprogUnits[i].value == 'DurationShare'){
                    headers.push(['DurationShare'])
                }
            }            
        }
        return headers;
    }
    function exportDataGroupMax(TopProgramIndividualUnitID,number,ProgTitle,EpisodCount,ProgDate,TRP,Thousands000,Share,Cover000,Cover,ATS,RatingShare,DurationShare){
        var exportdata = [];
        exportdata.push([number])
        exportdata.push([ProgTitle])
        exportdata.push([EpisodCount])
        if(TopProgramIndividualUnitID == 3){
            exportdata.push([ProgDate])
        }
        for (var i = 0; i < topprogUnits.length; i++) {
            if (topprogUnits[i].selected) {
                if(topprogUnits[i].value == 'TRP'){
                    exportdata.push([TRP])
                }else if(topprogUnits[i].value == 'Thousands000'){
                    exportdata.push([Thousands000])
                }else if(topprogUnits[i].value == 'Share'){
                    exportdata.push([Share])
                }else if(topprogUnits[i].value == 'Cover000'){
                    exportdata.push([Cover000])
                }else if(topprogUnits[i].value == 'Cover'){
                    exportdata.push([Cover])
                }else if(topprogUnits[i].value == 'ATS'){
                    exportdata.push([ATS])
                }else if(topprogUnits[i].value == 'RatingShare'){
                    exportdata.push([RatingShare])
                }else if(topprogUnits[i].value == 'DurationShare'){
                    exportdata.push([DurationShare])
                }
            }            
        }                
        return exportdata;
    }
    function exportTopUniqueProgrammes(TopProgramIndividualUnitID,filetype,unittype) {        
        $.ajax({
            url: "topprogrammes2.php?AreaID=" + localStorage["AreaID"] + "&DemographicID=" + localStorage["DemographicID"] +
                "&ChannelBrandID=" + localStorage["ChannelBrandID"] + "&AreaName=" + localStorage["AreaName"] + "&UnitID=" + TopProgramIndividualUnitID + "&PeriodTypeID=" + localStorage["PeriodTypeID"] + "&PeriodNumber=" + localStorage["PeriodNumber"] + "&tableIndex=" + TopProgramIndividualUnitID,
            type: "GET",
            cache : false,
            success: function(data) {
                var uniquetopprogrammes = [];
                var filename = '';

                var period = $('#PeriodInfo').text()

                uniquetopprogrammes.push(['Country : '+localStorage["CountryCode"],'','','','','','','','','',''])
                uniquetopprogrammes.push(['Channel : '+localStorage["ChannelBrandName"],'','','','','','','',''])
                uniquetopprogrammes.push(['Period : '+ period.substring(7,period.length),'','','','','','','',''])
                uniquetopprogrammes.push(['Target : '+ $('#target').val()+"("+localStorage["TargetCode"]+")",'','','','','','',''])
                uniquetopprogrammes.push([$('#TAMsource').text(),'','','','','','',''])
                uniquetopprogrammes.push(['','','','','','','','',''])

                uniquetopprogrammes.push(exportHeadersGroupMax(TopProgramIndividualUnitID))              
                for (var i in data) {
                    var num = Number(Number(i) + Number(1)), 
                    ProgTitle = data[i].ProgTitle,  
                    EpisodCount = data[i].EpisodCount, 
                    ProgDate = data[i].ProgDate, 
                    TRP = data[i].TRP.toFixed(3)+"%", 
                    Thousands000 = data[i].Thousands000.toFixed(3), 
                    Share = data[i].Share.toFixed(3)+"%",
                    Cover000 = data[i].Cover000.toFixed(0),
                    Cover = data[i].Cover.toFixed(3),
                    ATS = data[i].ATS.toFixed(3),
                    RatingShare = data[i].RatingShare.toFixed(1)+"%", 
                    DurationShare = data[i].DurationShare.toFixed(1)+"%";                                    
                    uniquetopprogrammes.push(
                        exportDataGroupMax(TopProgramIndividualUnitID,num,ProgTitle,EpisodCount,ProgDate,TRP,Thousands000,Share,Cover000,Cover,ATS,RatingShare,DurationShare
                    ));
                }
                var getTimeToday = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds()   
                if(TopProgramIndividualUnitID == 2){
                    filename = 'Top 10 Programmes(Grouped)_'+localStorage["CountryCode"]+'_'+localStorage["ChannelBrandName"]+'_'+datetoday+'_'+getTimeToday;
                }else{
                    filename = 'Top 10 Programmes(Max Eps.)_'+localStorage["CountryCode"]+'_'+localStorage["ChannelBrandName"]+'_'+datetoday+'_'+getTimeToday;
                }
                alasql("SELECT * INTO " + filetype + "('"+ filename +"." + filetype + "',{headers:false}) FROM ? ", [uniquetopprogrammes]);
            }
        });
    }
    function exportHeaderIndividual(){        
        var headers = [];
        headers.push(['#'])
        headers.push(['Programme Title'])
        headers.push(['Date'])        
        for (var i = 0; i < topprogUnits.length; i++) {
            if (topprogUnits[i].selected) {
                if(topprogUnits[i].value == 'TRP'){
                    headers.push(['TRP'])
                }else if(topprogUnits[i].value == 'Thousands000'){
                    headers.push(['000'])
                }else if(topprogUnits[i].value == 'Share'){
                    headers.push(['Share'])
                }else if(topprogUnits[i].value == 'Cover000'){
                    headers.push(['Reach000'])
                }else if(topprogUnits[i].value == 'Cover'){
                    headers.push(['Reach%'])
                }else if(topprogUnits[i].value == 'ATS'){
                    headers.push(['ATS'])
                }
            }            
        }
        return headers;
    }
    function exportDataIndividual(num,ProgTitle,ProgDate,TRP,Thousands000,Share,Cover000,Cover,ATS){
        var exportdata = [];
        exportdata.push([num])
        exportdata.push([ProgTitle])
        exportdata.push([ProgDate])        
        for (var i = 0; i < topprogUnits.length; i++) {
            if (topprogUnits[i].selected) {
                if(topprogUnits[i].value == 'TRP'){
                    exportdata.push([TRP])
                }else if(topprogUnits[i].value == 'Thousands000'){
                    exportdata.push([Thousands000])
                }else if(topprogUnits[i].value == 'Share'){
                    exportdata.push([Share])
                }else if(topprogUnits[i].value == 'Cover000'){
                    exportdata.push([Cover000])
                }else if(topprogUnits[i].value == 'Cover'){
                    exportdata.push([Cover])
                }else if(topprogUnits[i].value == 'ATS'){
                    exportdata.push([ATS])
                }
            }            
        }
        return exportdata;
    }
    function exportTopProgrammes(TopProgramGroupUnitID, filetype, unittype) {       
        $.ajax({
                url: "topprogrammes.php?AreaID=" + localStorage["AreaID"] + "&DemographicID=" + localStorage["DemographicID"] +
                "&ChannelBrandID=" + localStorage["ChannelBrandID"] + "&AreaName=" + localStorage["AreaName"] + "&UnitID=" + localStorage["TopProgramGroupUnitID"] + "&PeriodTypeID=" + localStorage["PeriodTypeID"] + "&PeriodNumber=" + localStorage["PeriodNumber"] + "&tableIndex=" + localStorage["TopProgramTableIndex"],
                type: "GET",
                cache : false
            })
            .done(function(data) {

                var uniquetopprogrammes = [];
                var period = $('#PeriodInfo').text()    
                uniquetopprogrammes.push(['Country : '+localStorage["CountryCode"],'','','','','','','',''])
                uniquetopprogrammes.push(['Channel : '+localStorage["ChannelBrandName"],'','','','','','','',''])
                uniquetopprogrammes.push(['Period : '+ period.substring(7,period.length),'','','','','','','',''])
                uniquetopprogrammes.push(['Target : '+ $('#target').val()+"("+localStorage["TargetCode"]+")",'','','','','','',''])
                uniquetopprogrammes.push([$('#TAMsource').text(),'','','','','','',''])
                uniquetopprogrammes.push(['','','','','','','','',''])
                uniquetopprogrammes.push(exportHeaderIndividual())
                for (var i in data) {
                    var num = Number(Number(i) + Number(1)), 
                    ProgTitle = data[i].ProgTitle, 
                    ProgDate = data[i].ProgDate, 
                    TRP = data[i].TRP.toFixed(3)+"%", 
                    Thousands000= data[i].Thousands000.toFixed(3), 
                    Share= data[i].Share.toFixed(3)+"%",
                    Cover000 = data[i].Cover000.toFixed(0),
                    Cover = data[i].Cover.toFixed(3),
                    ATS = data[i].ATS.toFixed(3);
                    uniquetopprogrammes.push(exportDataIndividual(num,ProgTitle,ProgDate,TRP,Thousands000,Share,Cover000,Cover,ATS));
                }
                var getTimeToday = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds()
                var filename = 'Top 10 Programmes(Individual)_'+localStorage["CountryCode"]+'_'+localStorage["ChannelBrandName"]+'_'+datetoday+'_'+getTimeToday
                alasql("SELECT * INTO " + filetype + "('"+ filename +"." + filetype + "',{headers:false}) FROM ? ", [uniquetopprogrammes]);
            })
            .fail(function() {
                alert("Ajax failed to fetch data");
            });
    }
    function ExportTrending(filetype) {
    $.ajax({
            url: "TrendingGraph.php?AreaID=" + localStorage["AreaID"] +
            "&DemographicID="+ localStorage["DemographicID"] +
            "&ChannelBrandID=" + localStorage["ChannelBrandID"] +
            "&UnitID=" + localStorage["UnitID"] +
            "&PeriodTypeID=" + localStorage["PeriodTypeID"] +
            "&CurrentPeriods=" + localStorage["TrendingCurrentPeriods"] +
            "&PrevPeriods=" + localStorage["TrendingPreviousPeriods"] +
            "&InputDaypartGroupID=" + localStorage["InputDaypartGroupID"] +
            "&RegionID=" + localStorage["RegionID"] +
            "&IsRegionRow=" + localStorage["IsRegionRow"] +
            "&TargetGroupName="+ localStorage["TargetGroupName"],
            type: "GET",
            cache : false
        })
        .done(function(data) {

           
            var temp = $('#periodtype').val();
            if (temp == 1) {
                temp = 'Week';
            } else if (temp == 2) {
                temp = 'Month';
            } else if (temp == 3) {
                temp = 'Quarter';
            } else if (temp == 4) {
                temp = 'Year';
            }

            $('#xAxisname').text(temp);
            var Periods = [];
            for (var i in data.Periods) {
                Periods.push(data.Periods[i].Period);
            }
            Periods.reverse();
            var CurrentValues = [];
            for (var i in data.CurrentValues) {
                CurrentValues.push(data.CurrentValues[i].CurrentValue);
            }
            CurrentValues.reverse();
            var PrevValues = [];
            for (var i in data.PrevValues) {
                PrevValues.push(data.PrevValues[i].PrevValue);
            }
            
            PrevValues.reverse();
            var radioval = $('input[name=trpvalue]:checked', '#dashboardForm').val();
            if (radioval == '%') {
                var sum = CurrentValues.map(function(num, idx) {
                    if (num == 0.000 || PrevValues[idx] == 0.000) {
                        pctg = '-';
                        return pctg;
                    } else {
                        var pctg = ((num - PrevValues[idx]) / PrevValues[idx]) * 100;
                        return pctg.toFixed(1) + "%";
                    }
                });
            } else {
                var sum = CurrentValues.map(function(num, idx) {
                    if (num == 0.000 || PrevValues[idx] == 0.000) {
                        pctg = '-';
                        return pctg;
                    } else {
                        var pctg = num - PrevValues[idx];
                        return pctg.toFixed(3);
                    }
                });
            }
            sum.reverse();
            var trendingVal = [];
            var temp1 = '',
                temp2 = '',
                temp3 = '';
            var period = $('#PeriodInfo').text()            
            var emptyArray = []
            trendingVal.push(['Country : '+localStorage["CountryCode"], 'Channel : '+localStorage["ChannelBrandName"], 'Target : '+ $('#target').val()+"("+localStorage["TargetCode"]+")", $('#TAMsource').text(),"Period(" + temp + ")", "Current(" + localStorage["UnitText"] + ")", "Previous(" + localStorage["UnitText"] + ")","Difference"]);
            for (var i in Periods) {
                if (data.Periods[i].Period != null) {
                    temp1 = data.Periods[i].Period;
                } else {
                    temp1 = '-';
                }
                if (data.CurrentValues[i].CurrentValue != null) {
                    temp2 = data.CurrentValues[i].CurrentValue;
                } else {
                    temp3 = '-';
                }
                if (data.PrevValues[i].PrevValue != null) {                    
                    temp3 = data.PrevValues[i].PrevValue;
                } else {
                    temp3 = '-';
                }                            
                trendingVal.push([emptyArray,emptyArray,emptyArray,emptyArray,temp1, temp2, temp3, sum[i]]);
            }            
            var trendingExportVal = '';
            trendingExportVal = transpose(trendingVal);            
            var getTimeToday = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds()
            var filename = 'trending_'+localStorage["CountryCode"]+'_'+localStorage["ChannelBrandName"]+'_'+datetoday+'_'+getTimeToday;
            alasql("SELECT * INTO " + filetype + "('"+ filename +"." + filetype + "',{headers:false}) FROM ? ", [trendingExportVal]);
        })
        .fail(function() {
            alert("Ajax failed to fetch data");
        });
}
function exportCompetitive(){
        $.ajax({
            url: "competitive.php?AreaID=" + localStorage["AreaID"] + "&DemographicID=" + localStorage["DemographicID"] +
            "&ChannelBrandID=" + localStorage["ChannelBrandID"] + "&UnitID=" + localStorage["CompetitiveUnitID"] + "&PeriodTypeID=" + localStorage["PeriodTypeID"] + "&PeriodNumber=" + localStorage["PeriodNumber"] + "&InputDaypartGroupID=" + localStorage["InputDaypartGroupID"]+ "&ReferencePeriods="+localStorage["ReferencePeriods"],
            type: "GET",
            cache : false
        })
        .done(function(data) {
            var radioval = $('input[name=trpvalue]:checked', '#dashboardForm').val();         
            var expotRows = [];
            var period = $('#PeriodInfo').text()    
            expotRows.push(['Country : '+localStorage["CountryCode"],'','','','','','','','','',''])
            expotRows.push(['Channel : '+localStorage["ChannelBrandName"],'','','','','','','',''])
            expotRows.push(['Period : '+ period.substring(7,period.length),'','','','','','','',''])
            expotRows.push(['Target : '+ $('#target').val()+"("+localStorage["TargetCode"]+")",'','','','','','',''])
            expotRows.push([$('#TAMsource').text(),'','','','','','',''])
            expotRows.push([ 'channelName', '000', 'TRP', 'Share', 'Reach000', 'ReachPercent', 'RelativeShare','ATS']);
            for (var i in data) {
                if(radioval == '%'){                    
                    //var decimaplace = 1;
                    var pctg = '%';                 
                }else{   
                    //var decimaplace = 3;
                    var pctg = '';
                } 
                
                expotRows.push([ data[i].ChannelName, data[i].Thousands000.toFixed(3), data[i].TRP.toFixed(3)+pctg, data[i].Share.toFixed(3), data[i].Reach000.toFixed(0), data[i].ReachPercent.toFixed(3), data[i].RelativeShare.toFixed(3),data[i].ATS.toFixed(3)]);
            }
            var filename = 'Competitive Analysis_'+localStorage["CountryCode"]+"_"+datetoday
            alasql("SELECT * INTO XLSX('"+ filename +".xlsx',{headers:false}) FROM ? ", [expotRows]);
        })
        .fail(function() {
            alert("Ajax failed to fetch data");
        });
}
function exportTable(targetgroupname, channelbrandid, unitid, periodtypeid, periodnumber, refperiods, InputDaypartGroupID, filetype) {
    $.ajax({
            url: "RatingPerformance.php?version="+ $.now() +"&targetgroupname=" + targetgroupname + "&channelbrandid=" + channelbrandid + "&unitid=" + unitid + "&periodtypeid=" + periodtypeid + "&periodnumber=" + periodnumber + "&refperiods=" + refperiods + "&InputDaypartGroupID=" + localStorage["InputDaypartGroupID"] + "&RegionID=" + $('#area').val(),
            type: "GET",
            cache : false
        })
        .done(function(data) {
            var period = $('#PeriodInfo').text()                    
            var expotRows = [];
            expotRows.push(['Period : '+ period.substring(7,period.length),'','','','','',''])
            expotRows.push(['Target : '+ $('#target').val(),'','','','','',''])    
            expotRows.push(['','','','','','',''])
            expotRows.push(['Areaname','Region name','Country Code','Channel Brand Name','Target Code','Current Value','Reference Value'])
            for (var i in data) {
                expotRows.push([ data[i].AreaName, data[i].Regionname, data[i].CountryCode, data[i].ChannelBrandName, data[i].TargetCode, data[i].CurrentValue, data[i].ReferenceValue]);
            }
            var getTimeToday = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds()
            var filename = 'Ratings Performance_'+datetoday+'_'+getTimeToday            
            alasql("SELECT * INTO " + filetype + "('"+ filename +"." + filetype + "',{headers:false}) FROM ? ", [expotRows]);
        })
        .fail(function() {
            alert("Ajax failed to fetch data");
        });
}
