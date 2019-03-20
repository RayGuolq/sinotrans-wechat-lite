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

    var randomScalingFactor = function() {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    }
    var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var lineChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "冷藏温度",
            borderColor: chartColors.red,
            backgroundColor: chartColors.red,
            fill: false,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ],
            yAxisID: "y-axis-1",
        }, {
            label: "冷藏温度上限",
            borderColor: chartColors.yellow,
            backgroundColor: chartColors.yellow,
            fill: false,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                30
            ],
            yAxisID: "aaa"
        }, {
            label: "冷藏温度下限",
            borderColor: chartColors.grey,
            backgroundColor: chartColors.grey,
            fill: false,
            data: [
                10,
                10,
                10,
                10,
                10,
                10,
                10
            ],
            yAxisID: "y-axis-3"
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
            scales: {
                yAxes: [

                    {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: false,
                        position: "left",
                        id: "y-axis-1",
                    }, {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: false,
                        position: "left",
                        id: "aaa",

                        // grid line settings
                        gridLines: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    }, {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: false,
                        position: "left",
                        id: "y-axis-3",

                        // grid line settings
                        gridLines: {
                            drawOnChartArea: true, // only want the grid lines for one axis to show up
                        },
                    }
                ],
            }
        }
    };
    return {
        chartConfig: chartConfig,
        canvasConfig: canvasConfig
    }
}