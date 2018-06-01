import echarts from 'echarts'
import { getColorsFromScheme } from '../javascripts/modules/colors';

function echartsFunnelVis(slice, payload) {
  const div = d3.select(slice.selector);
  const html = '<div id='+slice_id+' style="width: '+slice.width() +'' + 
  'px;height:'+slice.height()+'px;"></div>';
  div.html(html); // reset

  let myChart = echarts.init(document.getElementById(slice_id));
  let option = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}"
    },
    legend: {
        data: ['展现','点击','访问','咨询','订单']
    },
    calculable: true,
    series : [{
          name:'漏斗图',
          type:'funnel',
          x: '10%',
          y: 60,
          //x2: 80,
          y2: 60,
          width: '80%',
          // height: {totalHeight} - y - y2,
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort : 'descending', // 'ascending', 'descending'
          gap : 10,
          itemStyle: {
              normal: {
                  // color: 各异,
                  borderColor: '#fff',
                  borderWidth: 1,
                  label: {
                      show: true,
                      position: 'inside'
                      // textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
                  },
                  labelLine: {
                      show: false,
                      length: 10,
                      lineStyle: {
                          // color: 各异,
                          width: 1,
                          type: 'solid'
                      }
                  }
              },
              emphasis: {
                  // color: 各异,
                  borderColor: 'red',
                  borderWidth: 5,
                  label: {
                      show: true,
                      formatter: '{b}:{c}%',
                      textStyle:{
                          fontSize:20
                      }
                  },
                  labelLine: {
                      show: true
                  }
              }
          },
          data:[
              {value:60, name:'访问'},
              {value:40, name:'咨询'},
              {value:20, name:'订单'},
              {value:80, name:'点击'},
              {value:100, name:'展现'}
          ]
      }
    ]
  };

  const fd = slice.formData;
  const json = payload.data;

  let colors = getColorsFromScheme(fd.color_scheme);
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

  const option2 = {
    legend: {data: data_name},
    series: [{
            color: colors,
            max: max_value,
            data: data
        }]
  };

  myChart.setOption(option2)
};

module.exports = echartsFunnelVis;
