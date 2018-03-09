$body = $("body");
    $(document).ready(function() {
        periodrange();
        targetname();
        ChannelBrandName();
        disableOptions($('#periodtype').val());
     });
    $(document).on({
        ajaxStart: function() { $body.addClass("loading"); },
        ajaxStop: function() { $body.removeClass("loading"); }          
    });
    function disableOptions(periodtype){
      if(periodtype=='Quarter'){          
          document.getElementById("refperiod").options[0].selected=true;         
          
          document.getElementById("refperiod").options[2].disabled = true; 
          document.getElementById("refperiod").options[3].disabled = true; 
      }if(periodtype=='Year'){
          document.getElementById("refperiod").options[0].selected=true;

          document.getElementById("refperiod").options[1].disabled = true; 
          document.getElementById("refperiod").options[2].disabled = true; 
          document.getElementById("refperiod").options[3].disabled = true; 
      }if(periodtype=='Week' || periodtype=='Month'){
          document.getElementById("refperiod").options[0].selected=true;
          
          document.getElementById("refperiod").options[1].disabled = false; 
          document.getElementById("refperiod").options[2].disabled = false; 
          document.getElementById("refperiod").options[3].disabled = false; 
      }                
    }
      function putThis(AreaName,channelbrandname) {
        var period = $('#period').val();
        $.ajax({
            url : "topprogrammes.php",
            type : "POST",
            data : {
              countryname : AreaName,
              channelname : channelbrandname,
              currentperiod : period,
              periodtype: $('#periodtype').val(),
              refperiod : $('#refperiod').val()
            },            
            success : function(data){                     
              $("#topprogrammescontent").html(data);              
            }
          });         
        //$("#topprogrammescontent").html(control1 + control2);
      }
      function generateTable(period,AreaName,channelbrandname){
        $.ajax({
            url : "table.php",
            type : "POST",
            data : {
              periodNum : period,
              country : AreaName,
              channelname : channelbrandname,
              target: $('#target').val(),
              periodtype: $('#periodtype').val(),
              dpart: $('#dpart').val()
            },
            success : function(data){
                $("#graphtable").html(data);
            }
        });
      }
      function generateGraph(period,AreaName,channelbrandname){
        $.ajax({
            url : "trends.php",
            type : "POST",
            data : {
              periodNum : period,
              country : AreaName,
              channelname : channelbrandname,
              periodtype: $('#periodtype').val(),
              target: $('#target').val(),              
              dpart: $('#dpart').val()
            },
            success : function(data){
                var periodnumber = [];
                var trp = [];                
                for(var i in data.result1) {
                  periodnumber.push(data.result1[i].periodrange);
                  trp.push(data.result1[i].TRP1.toFixed(3));
                }
                var trp2 = [];
                for(var i in data.result2) {                  
                  trp2.push(data.result2[i].TRP2.toFixed(3));
                }
                
                var sum = trp.map(function (num, idx) {
                  var pctg = ((num -trp2[idx])/ num )* 100;
                  return pctg.toFixed(2);
                });

                //alert(sum);
                var echartBar = echarts.init(document.getElementById('bargraph'));
                echartBar.setOption({                 
                 title: {
                    text: AreaName,
                    subtext: channelbrandname
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
                        position: function (pos, params, el, elRect, size) {
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
                            show: true,
                            title: "Text View",
                            lang: [
                              "Text View",
                              "Close",
                              "Refresh",
                            ],                            
                            readOnly: false
                          },                          
                          magicType : {
                            show: true,                             
                            type: ['line', 'bar', 'stack', 'tiled'],
                            title: {
                              line: 'Line Chart',
                              bar: 'Bar Chart',
                              stack: 'Stacked Chart',
                              tiled: 'Tiled Chart',
                            }                                                      
                          },
                          restore: {
                            show: true,
                            title: "Restore"                            
                          },
                          saveAsImage: {
                            show: true,
                            title: "Save Image"
                          }
                        }
                      },
                legend: {
                    data: ['%','Current','Prev. Year']
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '0%',
                    top : '20%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: periodnumber,
                    inverse: true               
                },
                {
                type: 'category',
                position: 'top',
                onZero:true,
                xAxisIndex: 1,
                yAxisIndex: 1,
                zAxisIndex: 1,
                scale:true,
                inverse: true,
                axisLabel : {
                  show:true,
                  interval: 'auto', 
                  rotate: -0,
                  margin: 2,
                  formatter:'{value}%'
                },            
                data : sum
                }
                ],
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01],
                    label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        }
                },
                series: [                    
                    {
                        name: 'Current',
                        type: 'bar',
                        data: trp,
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
                                  barBorderColor: '#00345A',
                                  color: '#00345A'
                              },
                            emphasis: {
                                barBorderColor: '#073d64',
                                color: '#073d64'
                              }
                          },
                          barGap : '10%',            
                          barCategoryGap : '5%',
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
                      name: "Prev. Year",
                        type: 'bar',
                        data: trp2,
                        label: {
                            normal: {
                                show: false,
                                position: 'top'
                            }
                        },
                        itemStyle : {  
                              normal: {
                                  barBorderWidth: 0,
                                  barBorderColor: '#484E57',
                                  color: '#484E57'
                              },
                            emphasis: {
                                barBorderColor: '#485357',
                                color: '#485357'
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
    function ChannelBrandName(){        
        $.ajax({
            url : "ChannelBrandName.php",
            type : "POST",
            data : {                
                periodtype : $('#periodtype').val(),                
            },
            success : function(data){                                                
                $("#channelbrand1").multiselect('dataprovider', data);
                $('#channelbrand1').multiselect('rebuild');
                ratingsperformance();                
                putThis(AreaName='Denmark',channelbrandname='Discovery Channel');  
                generateTable($('#period').val(),AreaName='Denmark',channelbrandname='Discovery Channel');
                generateGraph($('#period').val(),AreaName='Denmark',channelbrandname='Discovery Channel');                
            }
        });
    }
    $('#channelbrand1').multiselect({                
        onChange: function() {            
            ratingsperformance();            
        }
    });
    $('#periodtype').on('change', function() {        
        periodrange();
        ChannelBrandName();
        disableOptions($('#periodtype').val());        
    });
    $('select').on('change', function() {        
        ratingsperformance();
    });    
    function ratingsperformance(){
        var selected = $('#channelbrand1').val();        
        $.ajax({
            url : "ratingsperformance.php",
            type : "POST",        
            data    : {
                result:JSON.stringify(selected),                
                target : $('#target').val(),
                periodtype : $('#periodtype').val(),
                dpart : $('#dpart').val(),
                period : $('#period').val(),
                refperiod : $('#refperiod').val()
            }, 
            cache: true,
            success : function(data){            
                $("#performancecontent").html(data);            
            }
        });
    }
    function targetname(){
        $.ajax({
            url : "targetname.php",
            type : "POST",
            data : {                
                periodtype : $('#periodtype').val()                
            },
            success : function(data){
                var target = [];
                for(var i in data) {                    
                    target.push(data[i].target);                 
                }                
                $('#target').find('option').remove();
                var selectBox = document.getElementById('target');
                for(var i = 0, l = target.length; i < l; i++){                  
                  selectBox.options.add( new Option(target[i], target[i], target.selected) );
                }                
            }
        });
    }   
    function periodrange(){
        $.ajax({
            url : "periodrange.php",
            type : "POST",
            data : {                
                periodtype : $('#periodtype').val()                
            },
            success : function(data){
                var period = [];
                for(var i in data) {                    
                    period.push(data[i].Period);                 
                }                
                $('#period').find('option').remove();
                var selectBox = document.getElementById('period');
                for(var i = 0, l = period.length; i < l; i++){                  
                    selectBox.options.add( new Option(period[i], period[i], period.selected) );
                }                
            }
        });        
    }   