import echarts from 'echarts'
import { getColorFromScheme } from '../modules/colors';

function echartsFunnelVis(slice, payload) {
  const div = d3.select(slice.selector);
  const sliceId = "echarts_slice_"+slice.formData.slice_id;
  const html = '<div id='+sliceId+' style="width: '+slice.width() +'' + 
  'px;height:'+slice.height()+'px;"></div>';
  div.html(html); // reset

  let myChart = echarts.init(document.getElementById(sliceId));
  let option = {
    tooltip : {
        trigger: 'axis'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    legend: {
        data:['蒸发量','降水量','平均温度']
    },
    xAxis : [
        {
            type : 'category',
            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        }
    ],
    yAxis : [
        {
            type : 'value',
            name : '水量',
            axisLabel : {
                formatter: '{value} ml'
            }
        },
        {
            type : 'value',
            name : '温度',
            axisLabel : {
                formatter: '{value} °C'
            }
        }
    ],
    series : [

        {
            name:'蒸发量',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name:'降水量',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'平均温度',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
};

  const fd = slice.formData;
  const json = payload.data;

  let colors = getColorFromScheme(fd.color_scheme);
  console.log(colors);
  let dataName = [];  // echarts需要的是两个数组
  let maxValue = 0;
  const data = json;
  data.forEach(function (item, index, array) {
    dataName.push(item.name);
    if (item.value > maxValue) {
        maxValue = item.value;
    }
  });

  // const option2 = {
  //   legend: {data: dataName},
  //   series: [{
  //           color: colors,
  //           max: maxValue
  //       }]
  // };
  myChart.setOption(option)
  // myChart.setOption(option2)
};

module.exports = echartsFunnelVis;
