export const chartConfig = (type, animation, theme, kind, isMobile=false) => ({
    animation: !!animation,
    response: false,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    layout: {
      autoPadding: false,
      padding: 0,
    },
    scales: {
      x: {
        //beginAtZero: true,
        adapters: {},
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM DD',
            week: 'MMM DD',
            month: 'MMM DD',
            quarter: 'MMM DD',
            year: 'MMM',
          },
          tooltipFormat: 'MMM DD, YYYY'
        },
        ticks: {
          //align: 'start',
          maxRotation: 0,
          //autoSkip: false,
          //autoSkipPadding: 6,
          padding: 4,
          maxTicksLimit: isMobile ? 6 : 11,
          color: '#707BA0',
          font: {
            family: 'Inter, sans-serif',
            weight: 400,
            size: 12,
            lineHeight: '16px',
          },
          /*callback: function(value) {
            return moment(this.getLabelForValue(value)).format('MMM DD');
          }*/
        },
        grid: {
          display: false,
          drawBorder: false,
        }
      },

      y: {
        beginAtZero: true,
        ticks: {
          align: 'center',
          padding: 8,
          color: '#707BA0',
          stepSize: kind === 'one' && 0.1,
          font: {
            family: 'Inter, sans-serif',
            weight: 400,
            size: 12,
            lineHeight: '16px',
          },
          callback: function (value) {
            //let realValue = +this.getLabelForValue(value).replace(/\s+/g, '');
            let realValue = value || 0;
            if (realValue >= 1000000) return `${realValue / 1000000}M`
            if (realValue >= 1000) return `${realValue / 1000}K`
            return kind === 'empty' ? value * 10 : realValue
          }
        },
        grid: {
          display: true,
          drawBorder: false,
          drawTicks: false,
          color: theme === 'light' ? '#F2F3F8' : '#151E3A',
        }
      },
    },
    plugins: {
      'vertical-line-plugin': {theme: theme},
      tooltip: {
        padding: {x: 16, y: 12},
        backgroundColor: '#151E3A',
        caretPadding: 16,
        caretSize: 0,
        displayColors: false,
        titleColor: '#FFFFFF',
        titleFont: {
          family: 'Inter, sans-serif',
          weight: 500,
          size: 16,
          lineHeight: '24px',
        },
        titleAlign: 'center',
        bodyFont: {
          family: 'Inter, sans-serif',
          weight: 400,
          size: 14,
          lineHeight: '20px',
        },
        bodyAlign: 'center',

        //hide tooltip stacking for boundary points (min, max)
        filter: function (tooltipItem) {
          return !tooltipItem?.raw?.hiddenTooltip
        },
        callbacks: {
          label: function (context) {
            let label = ''
            if (context?.raw?.invalid) {
              label = 'Invalid data'
            } else if (context.parsed.y !== null) {
              label = new Intl.NumberFormat(
                'en-US',
                type === 'revenue' ? {style: 'currency', currency: 'USD'} : {}
              ).format(context.parsed.y);
            }
            return label;
          },
          labelTextColor: function (context) {
            // return context?.raw?.invalid ? 'rgb(241,117,117)' : '#FFFFFF'
            return '#FFFFFF'
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  })
