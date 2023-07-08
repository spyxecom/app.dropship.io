import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import {
  Chart as ChartJS,
  Filler,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  CategoryScale,
  TimeScale,
  TimeSeriesScale,
} from 'chart.js';
import { chartConfig } from './ChartsConfig';
import EmptyChart from './EmptyChart';

const pluginInteraction = {
  id: 'vertical-line-plugin', //typescript crashes without id
  beforeDraw: function(chart, easing, opt) {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const activePoint = chart.tooltip._active[0];
      const ctx = chart.ctx;
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 6;
      ctx.strokeStyle = opt.theme === 'light' ? '#F2F6FF' : '#000E58';
      ctx.stroke();
      ctx.restore();
    }
  },
};

ChartJS.register(pluginInteraction, Filler, LineElement, PointElement, LinearScale, Tooltip, CategoryScale, TimeScale, TimeSeriesScale);

const sortByDate = (a, b) => {
  a = new Date(a.date);
  b = new Date(b.date);
  return a > b ? 1 : a < b ? -1 : 0;
};

const chartBaseStyle = {
  borderColor: '#225AEA',
  borderWidth: 2,
  lineTension: 0.075,
  fill: true,
  pointBackgroundColor: '#225AEA',
  pointBorderColor: 'rgba(0, 0, 0, 0.0)',
  pointHoverRadius: 7,
  pointHoverBorderWidth: 2,
  pointHoverBackgroundColor: '#225AEA',
  pointHoverBorderColor: '#FFFFFF',
};

const getChartData = (data, type) => {
  const inputData = data;

  inputData && inputData.sort(sortByDate);

  const hasInvalid = inputData.some(el => el?.invalid);

  let datasets = [];
  const labels = [];

  const charts = [
    {
      label: type,
      xScale: 'date',
      yScale: 'value',
      progress: 'progress',
    },
  ];

  let width, height, gradient;

  function getGradient(ctx, chartArea) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
      gradient.addColorStop(0, 'rgba(35, 124, 251, 0)');
      gradient.addColorStop(1, 'rgba(35, 124, 251, 0.1)');
    }

    return gradient;
  }

  for (let i in charts) {
    const chart = charts[i];

    for (let j in inputData) {

      if (labels.indexOf(inputData[j][chart.xScale]) < 0) {
        labels.push(inputData[j][chart.xScale]);
      }
      if (!datasets[i]) {
        datasets[i] = {
          data: [
            {
              x: inputData[j]?.invalid ? NaN : inputData[j][chart.xScale],
              y: inputData[j]?.invalid ? NaN : inputData[j][chart.yScale] || 0,
              invalid: inputData[j]?.invalid,
            },
          ],
          ...chartBaseStyle,
          backgroundColor: function(context) {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) return;
            return getGradient(ctx, chartArea);
          },
          label: chart.label,
          pointRadius: inputData?.length > 1 ? 1 : 4,
        };
      } else {
        datasets[i].data.push({
          x: inputData[j]?.invalid ? NaN : inputData[j][chart.xScale],
          y: inputData[j]?.invalid ? NaN : inputData[j][chart.yScale] || 0,
          invalid: inputData[j]?.invalid,
        });
      }

      if (hasInvalid) {
        let firstLastValidValue = (!inputData[j]?.invalid && (inputData[+j + 1]?.invalid || inputData[j - 1]?.invalid));
        if (!datasets[1]) {
          datasets[1] = {
            data: [
              {
                x: (inputData[j]?.invalid || firstLastValidValue) ? inputData[j][chart.xScale] : NaN,
                y: (inputData[j]?.invalid || firstLastValidValue) ? inputData[j][chart.yScale] || 0 : NaN,
                invalid: inputData[j]?.invalid,
                hiddenTooltip: firstLastValidValue,
              },
            ],
            ...chartBaseStyle,
            borderColor: '#D71313',
            backgroundColor: function(context) {
              const { ctx, chartArea } = context.chart;
              if (!chartArea) return;
              return getGradient(ctx, chartArea);
            },
            label: chart.label,
            pointRadius: inputData?.length > 1 ? 1 : 4,
            pointBackgroundColor: '#D71313',
            pointHoverBackgroundColor: '#D71313',
          };
        } else {
          datasets[1].data.push({
            x: (inputData[j]?.invalid || firstLastValidValue) ? inputData[j][chart.xScale] : NaN,
            y: (inputData[j]?.invalid || firstLastValidValue) ? inputData[j][chart.yScale] || 0 : NaN,
            invalid: inputData[j]?.invalid,
            hiddenTooltip: firstLastValidValue,
          });
        }
      }
    }
    return {
      datasets: datasets,
    };
  }
};

function Chart(props) {
  const { data, type, height, animation, loading, isMobile=false } = props;
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({ datasets: [] });
  const theme = useSelector(state => state.nav.theme);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const chartData = getChartData(data, type);
    setChartData(chartData);
    // eslint-disable-next-line
  }, [data]);

  const tempData = [...data]?.map(el => el?.value).filter(el => el > 1);

  if (data?.length >= 1 && data.filter(el => el.value !== 0).length !== 0) {
    return (
      <div style={{ height: height || '235px', width: '100%' }}>
        {
          ((data?.length === 1 && data?.[0]?.value === 1) || !tempData.length) ?
            <Line ref={chartRef}
                  data={chartData}
                  options={chartConfig(type, animation, theme, 'one', isMobile)}
            />
            :
            <Line ref={chartRef}
                  data={chartData}
                  options={chartConfig(type, animation, theme, 'default', isMobile)}
            />
        }
      </div>
    );
  } else if (data.filter(el => el.value !== 0).length === 0 && data.length >= 1) {
    return (
      <div style={{ height: height || '235px', width: '100%' }}>
        <Line ref={chartRef}
              data={chartData}
              options={chartConfig(type, animation, theme, 'empty', isMobile)}
        />
      </div>
    );
  } else {
    return (
      <div className="empty-screen">
        <EmptyChart type={type} theme={theme} loading={loading}/>
      </div>
    );
  }
}

export default Chart;
