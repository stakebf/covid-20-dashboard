import { caseCalculationFormula } from './getInfoAboutCountry';

const convertData = (data, is100K, population) => {
  return data.map((item, idx) => {
    let currentItem;
    if (idx === 0) {
      currentItem = 0;
    } else {
      currentItem = item - data[idx - 1];
      currentItem = currentItem < 0 ? 0 : currentItem;

      if (is100K) {
        currentItem = (caseCalculationFormula(item, population) - caseCalculationFormula(data[idx - 1], population)).toFixed(2);
        currentItem = currentItem < 0 ? 0 : currentItem;
      }
    }
    return currentItem;
  })
}

const setChartAxis = (dates, cases, deaths, recovered, population) => {
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'cases/total',
        data: cases,
        fill: false,
        backgroundColor: 'darkgreen',
        borderColor: 'darkgreen',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'cases/today',
        data: convertData(cases),
        fill: false,
        backgroundColor: 'green',
        borderColor: 'green',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
      {
        label: 'cases/total/100K',
        data: convertData(cases, true, population),
        fill: false,
        backgroundColor: '#adff2f',
        borderColor: '#adff2f',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
      {
        label: 'cases/today/100K',
        data: convertData(convertData(cases), true, population),
        fill: false,
        backgroundColor: '#14f714',
        borderColor: '#14f714',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
      {
        label: 'deaths/total',
        data: deaths,
        fill: false,
        backgroundColor: 'darkred',
        borderColor: 'darkred',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'deaths/today',
        data: convertData(deaths),
        fill: false,
        backgroundColor: 'red',
        borderColor: 'red',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
      {
        label: 'deaths/total/100K',
        data: convertData(deaths, true, population),
        fill: false,
        backgroundColor: 'indianred',
        borderColor: 'indianred',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
      {
        label: 'deaths/today/100K',
        data: convertData(convertData(deaths), true, population),
        fill: false,
        backgroundColor: 'palevioletred',
        borderColor: 'palevioletred',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
      {
        label: 'recovered/total',
        data: recovered,
        fill: false,
        backgroundColor: 'darkblue',
        borderColor: 'darkblue',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'recovered/today',
        data: convertData(recovered),
        fill: false,
        backgroundColor: 'blue',
        borderColor: 'blue',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
      {
        label: 'recovered/total/100K',
        data: convertData(recovered, true, population),
        fill: false,
        backgroundColor: 'cadetblue',
        borderColor: 'cadetblue',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
      {
        label: 'recovered/today/100K',
        data: convertData(convertData(recovered), true, population),
        fill: false,
        backgroundColor: 'dodgerblue',
        borderColor: 'dodgerblue',
        yAxisID: 'y-axis-1',
        hidden: true,
      },
    ],
  }

  return data;
}

const prepareCountiesData = (data, population) => {
  const dates = [];
  const cases = [];
  Object.entries(data.cases).forEach(([key, value]) => {
    cases.push(value);
    dates.push(key);
  });

  const deaths = Object.values(data.deaths);
  const recovered = Object.values(data.recovered);

  return setChartAxis(dates, cases, deaths, recovered, population);
}

const getCountriesData = (
    byHistoricalAll, 
    byHistoricalCountry,
    activeCountry,
    byAllCases
) => {
  const data = Object.keys(byHistoricalCountry).length && !byHistoricalCountry.message ? byHistoricalCountry.timeline : byHistoricalAll;
  const population = Object.keys(byHistoricalCountry).length && !byHistoricalCountry.message ? activeCountry.population : byAllCases.population;

  return prepareCountiesData(data, population);
}

export { getCountriesData };
