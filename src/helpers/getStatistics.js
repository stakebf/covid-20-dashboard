export const getStatistics = (value, population ) => {
if(population) {
  return ( value / population) * 100000
} 

return value
}