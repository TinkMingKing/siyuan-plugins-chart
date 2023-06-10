import { Plugin, openTab } from "siyuan";
import * as echarts from "echarts";

//tab类型
const TAB_TYPE = "custom_tab";

export default class ChartPlugin extends Plugin {

    onload() {
        console.log("loading plugin-sample");
        this.initTopbar();
    }

    initTopbar() {

        let div: HTMLDivElement = document.createElement('div');
        let el = document.createElement('div');
        el.style.width = "1000px";
        el.style.height = "500px";
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(el);
              var option;
              
              function getVirtualData(year) {
                const date = +echarts.time.parse(year + '-01-01');
                const end = +echarts.time.parse(+year + 1 + '-01-01');
                const dayTime = 3600 * 24 * 1000;
                const data = [];
                for (let time = date; time < end; time += dayTime) {
                  data.push([
                    echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
                    Math.floor(Math.random() * 10000)
                  ]);
                }
                return data;
              }
              option = {
                title: {
                  top: 30,
                  left: 'center',
                  text: 'Daily Step Count'
                },
                tooltip: {
                  formatter: function(params) {
                    return echarts.format.formatTime('yyyy-MM-dd', params.value);
                  }
                },
                visualMap: {
                  min: 0,
                  max: 10000,
                  type: 'piecewise',
                  orient: 'horizontal',
                  left: 'center',
                  top: 65
                },
                calendar: {
                  top: 120,
                  left: 30,
                  right: 30,
                  cellSize: ['auto', 13],
                  range: '2016',
                  itemStyle: {
                    borderWidth: 0.5
                  },
                  yearLabel: { show: false }
                },
                series: {
                  type: 'heatmap',
                  coordinateSystem: 'calendar',
                  data: getVirtualData('2016')
                }
              };
              myChart.setOption(option);
      div.appendChild(el);

        // openTab方法的fn参数
        let customTab = this.addTab({
            type: TAB_TYPE,
            async init() {
                this.element.appendChild(div);
            },
            destroy() {
            }
        });

        //添加顶栏按钮
        this.addTopBar({
            icon: "iconSparkles",
            title: "test",
            position: "right",
            callback: async () => {
                openTab({
                    app: this.app,
                    custom: {
                        icon: "iconSparkles",
                        title: "test",
                        fn: customTab
                    },
                })
            }
        });

    }

}