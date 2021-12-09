import React from 'react';
import { render } from 'react-dom';
import _ from 'lodash';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/highcharts-more.js')(Highcharts);

const AntelopeScatterChart = (props) => {
    const antelopes = props.antelopes;

    const dataForChart = antelopes.reduce((acc, curr) => {
        if(_.some(acc, { 'name': curr.continent})){
            acc.forEach((e) => {
                if(e.name === curr.continent){
                    e.data.push([curr.height*2.54, curr.weight])
                }
            })
        } else {
            acc.push({
                name : curr.continent,
                data : [[curr.height*2.54, curr.weight]]
            });
        }
        return acc
    }, [])


  const options = {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Height Versus Weight of 25 antelopes species'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Height (cm)'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Weight (kg)'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} cm, {point.y} kg'
            }
        }
    },
    series: dataForChart

  };

    return (  <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    )

}

export default AntelopeScatterChart;

