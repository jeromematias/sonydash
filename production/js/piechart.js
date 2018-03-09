$(document).ready(function(){
        $('#submit').click(function(){          
          $.ajax({            
            url : "piecharttable.php",
            type : "POST",
            data: { 
                    ptype1: $('#ptype').val(),  
                    country1: $('#country').val(),
                    target1: $('#target').val(),
                    cbrand1: $('#cbrand').val(),  
                    dpart1: $('#dpart').val()  
                  },
            success : function(data){
                $("#piecharttable").html(data);        
            },error : function(errorHandler){
              alert(errorHandler);
            }            
          });   

          $.ajax({            
            url : "gauge1table.php",
            type : "POST",
            data: { 
                    ptype1: $('#ptype').val(),  
                    country1: $('#country').val(),
                    target1: $('#target').val(),
                    cbrand1: $('#cbrand').val(),  
                    dpart1: $('#dpart').val()  
                  },
            success : function(data){
                $("#gauge1table").html(data);        
            },error : function(errorHandler){
              alert(errorHandler);
            }            
          });   


        });
      });        