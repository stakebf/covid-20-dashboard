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

const chartOptions = (countryName) => {
  return {
    scales: {
      xAxes: [{
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
      text: countryName
    }
  }
}

export { chartOptions };
