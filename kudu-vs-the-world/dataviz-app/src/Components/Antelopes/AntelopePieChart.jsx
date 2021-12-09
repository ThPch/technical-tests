import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import _ from 'lodash';

const AntelopePieChart = (props) => {
    const antelopes = props.antelopes;

    const continents = antelopes.reduce((acc, curr) => {
        if(!(acc.includes(curr.continent))){
            acc.push(curr.continent)
        }
        return acc;
    }, [])

    const dataForPie = continents.map(continent => {
        const numItems = antelopes.filter(antelope => antelope.continent === continent)
        return ({
            'name' : continent,
            'y'   : numItems.length
        })
    });

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Continental repartition of the antelopes'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name : 'Population',
        colorByPoint: true,
        data: dataForPie
    }]
  };

    return (  <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
    )

}

export default AntelopePieChart;

