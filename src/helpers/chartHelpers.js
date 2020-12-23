const setChartAxis = (dates, cases, deaths, recovered, countryName) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'cases',
        data: cases,
        fill: false,
        backgroundColor: '#62be62',
        borderColor: 'green',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'deaths',
        data: deaths,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'red',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'recovered',
        data: recovered,
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'blue',
        yAxisID: 'y-axis-1',
      },
    ],
  }

  return data;
}

const getCountriesData = (
    activeCountry, 
    byHistoricalAll, 
    byHistoricalCountry
) => {
  console.log(activeCountry);
  console.log(byHistoricalAll);
  console.log(byHistoricalCountry);
  const countryName = Object.keys(activeCountry).length ? activeCountry.country : 'World data';
  console.log(countryName, 'countryName');
  const data = Object.keys(byHistoricalCountry).length ? byHistoricalCountry.timeline : byHistoricalAll;
  const dates = [];
  const cases = [];
  Object.entries(data.cases).forEach(([key, value]) => {
    cases.push(value);
    dates.push(key);
  });
  const deaths = Object.values(data.deaths);
  const recovered = Object.values(data.recovered);
  return setChartAxis(dates, cases, deaths, recovered, countryName);
}

export { getCountriesData };
