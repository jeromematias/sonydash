$(document).ready(function(){
      $.ajax({
        url : "http://localhost/gentelella-master/production/chartdata.php",
        type : "GET",
        success : function(data){
          console.log(data);
          var period = [];
          var share = [];         
          for(var i in data) {
            period.push("Month of :"+data[i].period);
            share.push(data[i].share);
          }
          var chartdata = {
            labels: period,
            datasets: [
                  {
                    label: "Mock up",
                    backgroundColor: "rgba(38, 185, 154, 0.31)",
                    borderColor: "rgba(38, 185, 154, 0.7)",
                    pointBorderColor: "rgba(38, 185, 154, 0.7)",
                    pointBackgroundColor: "rgba(38, 185, 154, 0.7)",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointBorderWidth: 1,
                    data:  share
                  }
              ]
          };
          var ctx = $("#lineChart");
          var LineGraph = new Chart(ctx, {
            type: 'line',
            data: chartdata
          });
        },
        error : function(data) {
        }
      });
    });