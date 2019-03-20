/**
 * Created by xiabingwu on 2016/11/21.
 */
export default function(canvasConfig, labels, data) {
    var chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(231,233,237)'
    };
    // var randomScalingFactor = function () {
    //     return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    // }
    var lineChartData = {
        labels: labels,
        datasets: [{
            label: "冷藏温度    ",
            borderColor: chartColors.red,
            backgroundColor: chartColors.red,
            borderWidth: 1,
            fill: false,
            pointBackgroundColor: '#ffffff',
            pointHitRadius: 10,
            pointRadius: 0,
            data: data[0],
            yAxisID: "y-axis-1",
        }, {
            label: "冷藏温度上限       ",
            borderColor: chartColors.yellow,
            backgroundColor: chartColors.yellow,
            borderWidth: 1,
            fill: false,
            pointBackgroundColor: '#ffffff',
            pointHitRadius: 10,
            pointRadius: 0,
            data: data[2],
            yAxisID: "y-axis-1"
        }, {
            label: "冷藏温度下限",
            borderColor: chartColors.purple,
            backgroundColor: chartColors.purple,
            borderWidth: 1,
            pointRadius: 0,
            fill: false,
            pointBackgroundColor: '#ffffff',
            pointHitRadius: 10,
            data: data[1],
            yAxisID: "y-axis-1"
        }]
    };
    var chartConfig = {
        type: 'line',
        data: lineChartData,
        options: {
            responsive: false,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: false,
                text: 'Chart.js Line Chart - Multi Axis'
            },
            layout: {
                padding: {
                    right: 40 //如果x轴最后一个坐标数字被部分隐藏的话 请把这个值调大
                }
            },
            scales: {
                yAxes: [{
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                }, {
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-axis-1",

                    // grid line settings
                    gridLines: {
                        drawOnChartArea: true, // only want the grid lines for one axis to show up
                    },
                }, {
                    type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                    display: true,
                    position: "left",
                    id: "y-axis-1",
                    // grid line settings
                    gridLines: {
                        drawOnChartArea: true, // only want the grid lines for one axis to show up
                    },
                }],
            }
        }
    };
    return {
        chartConfig: chartConfig,
        canvasConfig: canvasConfig,
        labels: labels,
        data: data
    }
}