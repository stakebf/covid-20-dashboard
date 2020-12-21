const caseCalculationFormula = (cases, population) => {
  return (cases / population * 10e4).toFixed(2);
}

export const getInfoAboutCountry = ({ category, timePeriod }, countryInfo, worldStats) => {
  const currentInfo = !Object.keys(countryInfo).length ? worldStats : countryInfo;
  const countryName = !Object.keys(countryInfo).length ? 'World data' : countryInfo.country;
  const { 
    cases, 
    todayCases, 
    population,
    deaths,
    todayDeaths,
    recovered,
    todayRecovered
   } = currentInfo;
  console.log(category, timePeriod, 'params');
  console.log(currentInfo, 'countryInfo');
  const result = {
    confirmed: {
      total: cases,
      today: todayCases,
      "total/100k": caseCalculationFormula(cases, population),
      "today/100k": caseCalculationFormula(todayCases, population)
    },
    deaths: {
      total: deaths,
      today: todayDeaths,
      "total/100k": caseCalculationFormula(deaths, population),
      "today/100k": caseCalculationFormula(todayDeaths, population)
    },
    recovered: {
      total: recovered,
      today: todayRecovered,
      "total/100k": caseCalculationFormula(recovered, population),
      "today/100k": caseCalculationFormula(todayRecovered, population)
    },
  }[category.toLowerCase()][timePeriod.toLowerCase()];

  console.log({
    currentData: result,
    countryName
  });

  return {
    currentData: result,
    countryName
  };
}
