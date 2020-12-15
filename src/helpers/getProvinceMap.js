export const getProvinceMap = (array) => {
  return array.map(({ province, coordinates, county, stats, updatedAt }) => {
    return {
      province,
      county,
      coordinates,
      stats,
      updatedAt
    };
  });
}
