const cutZerosHelper = (number) => {
  let quantityRepeats = 0;

  while(true) {
    if (number / 1000 >= 1) {
      quantityRepeats++;
      number /= 1000;
    } else {
      break;
    }
  }

  return {
    quantityRepeats: 'K'.repeat(quantityRepeats),
    number
  };
}

const chartOptions = (byHistoricalCountry, activeCountry) => {
  const countryName = !byHistoricalCountry.message && Object.keys(byHistoricalCountry).length ? byHistoricalCountry.country : 'World data';
  const errorData = byHistoricalCountry.message ? `There is currently no data for: ${activeCountry.country}` : '';

  return {
    scales: {
      xAxes: [{
        ticks: {
          fontColor: "#fefeff",
          fontSize: 12,
        },
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            fontColor: "#fefeff",
            fontSize: 12,
            beginAtZero: true,
            userCallback(value) {
              const { number, quantityRepeats } = cutZerosHelper(value);
              return `${number}${quantityRepeats}`;
            },
          },
          gridLines: {
            display: false,
          },
        }],
    },
    tooltips: {
      enabled: true,
      mode: 'point'
    },
    title: {
      display: true,
      text: [countryName, errorData]
    },
    legend: {
      labels: {
          fontColor: "#fefeff",
          fontSize: 12
      }
    },
    maintainAspectRatio: false,
    responsive: true
  }
}

export { chartOptions };
