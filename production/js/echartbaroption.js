var eBar = echarts.init(document.getElementById('<?php echo $id; ?>'), theme);
              eBar.setOption({
                  title: {                    
                    subtext: ''
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  legend: {
                    data: [$('#valueform').val()]
                  },
                  toolbox: {
                        show: true,
                        feature: {
                          restore: {
                            show: false,
                            title: "Restore"
                          },dataView: {
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
                            show: true, type: ['line', 'bar'],
                            title: {
                              line: 'Line Chart',
                              bar: 'Bar Chart',
                              stack: 'Stacked Chart',
                              tiled: 'Tiled Chart',
                            }     
                          },saveAsImage: {
                            show: true,
                            title: "Save Image"
                          }
                        }
                      },
                  calculable: false,
                  dataZoom: {
                      show : true,
                      realtime : true,
                      start : 0,
                      end : 1000
                  },
                  xAxis: [{
                    type: 'category',
                    data: ['102','232','123','14','52','102','232','123','14','52','102','232','123','14','52'],
                    axisLabel: {
                        interval: 1,
                        rotate: 0,
                        textStyle: {
                          fontSize : 12
                        }
                    },
                    splitLine: {
                        show: true
                    }                    
                  }],
                  yAxis: [{                    
                    type: 'value'
                  }],
                  series: [
                    {
                      name: $('#valueform').val(),
                      type: 'line',                      
                      data: ['102','232','123','14','52','102','232','123','14','52','102','232','123','14','52'],
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
                      barGap: '5%',
                      barCategoryGap: '5%',                      
                      barMinHeight : 100,                      
                      legendHoverLink: true,            
                      markPoint: {                        
                        clickable: true,
                        symbol: 'pin',
                        symbolSize: 80,
                        symbolRotate: null,
                        large: false,
                        data: [{
                          type: 'max',
                          name: 'MAX'
                        }, {
                          type: 'min',
                          name: 'MIN'
                        }]
                      },
                      markLine: {
                        data: [{
                          type: 'average',
                          name: 'AVERAGE'
                        }]
                      }                    
                    }
                  ],
                }); 