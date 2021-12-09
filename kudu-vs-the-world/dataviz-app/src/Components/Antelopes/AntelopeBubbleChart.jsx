import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
require('highcharts/highcharts-more.js')(Highcharts);


const AntelopeBubbleChart = (props) => {
    const antelopes = props.antelopes;

    const dataForChart = antelopes.map((antelope) =>{
        return {
            name : antelope.name,
            x : antelope.weight,
            y : antelope.height,
            continent : antelope.continent,
            horns : antelope.horns,
        }
    })

  const options = {
    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    legend: {
        enabled: false
    },

    title: {
        text: 'Representation of the antelopes using weight in xAxis & heigt on the yAxis'
    },

    accessibility: {
        point: {
            valueDescriptionFormat: '{index}. {point.name}, weight: {point.x} kg, height: {point.y} inches, horns: {point.horns}.'
        }
    },

    xAxis: {
        title: {
            text: 'Weight of the antelope in kilograms'
        },
        labels: {
            format: '{value} kg'
        },
    },

    yAxis: {
        title: {
            text: 'Height of the antelope in inches'
        },
        labels: {
            format: '{value} inches'
        }
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat:
            '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
            '<tr><th>Weight:</th><td>{point.x} kg</td></tr>' +
            '<tr><th>Height:</th><td>{point.y} inches</td></tr>' +
            '<tr><th>Horns:</th><td>{point.horns}</td></tr>' +
            '<tr><th>Continent:</th><td>{point.continent}</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },

    series: [{
        data: dataForChart
    }]

  };

    return (  <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    )

}

export default AntelopeBubbleChart;

