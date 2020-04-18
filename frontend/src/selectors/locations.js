import withinProximity from "./promixity_selector";
const proximity_center = {latitude: 39.057, longitude: -94.594};

export const selectProjectLocations = (locations, { types, startDate, endDate, range, searchText }) => {
    return locations.filter((location) => {

      // search text filter value
      const hasSearchTextMatch = !searchText || !location.name || location.name.toLowerCase().includes(searchText);

      //DateRangeSlider value
      const startDateMatch = typeof startDate !== 'number' || location.startDate >= startDate;
      const endDateMatch = typeof endDate !== 'number' || location.endDate <= endDate;
      
      //Project type value
      const locationTypeMatch = !types.length || types.includes(location.type);

      //Proximity value
      const withinProximityMatch = typeof range !== 'number' || withinProximity(proximity_center, location.center, range);
  
      return startDateMatch && endDateMatch && locationTypeMatch && withinProximityMatch && hasSearchTextMatch;
    }).sort((a, b) => {
        return a.name > b.name ? 1 : -1;
    });
};