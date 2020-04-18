// FILTER_BY_RANGE
export const setRangeFilter = (range = 25) => ({
    type: 'FILTER_BY_RANGE',
    range: parseInt(range)
});

// ADD_TYPE_FILTER
export const addTypeFilter = (project_type) => ({
    type: 'ADD_TYPE_FILTER',
    project_type: project_type
});

// REMOVE_TYPE_FILTER
export const removeTypeFilter = (project_type = null) => ({
    type: 'REMOVE_TYPE_FILTER',
    project_type: project_type
});

// SET_ZIPCODE
export const setZipCode = (zipcode) => ({
    type: 'SET_ZIPCODE',
    zipcode: zipcode
});

// FILTER_BY_SEARCH_TEXT
export const setSearchText = (search_text) => ({
    type: 'FILTER_BY_SEARCH_TEXT',
    search_text: search_text
});

// SET_LAT_LNG
export const setLatLngCoordinates = (latLngCoordinates) => ({
    type: 'SET_LAT_LNG',
    lat_lng: latLngCoordinates
});

// RESET_FILTERS
export const resetFilters = () => ({
    type: 'RESET_FILTERS'
});