const filtersReducerDefaultState = {
  range: 10,
  zipcode: 64111,
  lat_lng: { lat: 30.274702, lng: -97.740341 },
  types: [],
  startDate: null,
  endDate: null,
  searchText: ''
};

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'RESET_FILTERS':
      return {
        ...filtersReducerDefaultState,
        zipcode: state.zipcode,
        lat_lng: state.lat_lng
      };
    case 'FILTER_BY_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.search_text
      };
    case 'FILTER_BY_RANGE':
      return {
        ...state,
        range: action.range
      };
    case 'ADD_TYPE_FILTER':
      return {
        ...state,
        types: [...state.types, action.project_type]
      };
    case 'REMOVE_TYPE_FILTER':
      return {
        ...state,
        types: state.types.filter(type => type !== action.project_type)
      };
    case 'FILTER_BY_START_DATE':
      return {
        ...state,
        startDate: action.start_date
      };
    case 'FILTER_BY_END_DATE':
      return {
        ...state,
        endDate: action.end_date
      };
    case 'SET_ZIPCODE': 
      return {
        ...state,
        zipcode: action.zipcode
      };
    case 'SET_LAT_LNG': 
      return {
        ...state,
        lat_lng: action.lat_lng
      };
    default:
      return state;
  }
};