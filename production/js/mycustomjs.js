$(document).ready(function() {
    ratingsperformance();
    periodrange();    
    $('#channelbrand1').multiselect({                
        onChange: function(option, checked, select) {            
            ratingsperformance();
        }
    });
    $('select').on('change', function() {        
        ratingsperformance();        
    });
    $('#periodtype').on('change', function() {
        periodrange();
        ratingsperformance();        
    });
    $('#period').on('change', function() {        
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
                period : $('#period').val()
            }, 
            cache: false,
            success : function(data){            
                $("#performancecontent").html(data);            
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
                //alert(period);
                var selectBox = document.getElementById('period');
                for(var i = 0, l = period.length; i < l; i++){                  
                  selectBox.options.add( new Option(period[i], period[i], period.selected) );
                }

            },error : function(error){
                alert();
            }
        });
    }    
});