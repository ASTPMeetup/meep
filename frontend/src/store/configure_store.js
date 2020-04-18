import { createStore, combineReducers, applyMiddleware } from 'redux';
import locationsReducer from '../reducers/locations';
import filtersReducer from '../reducers/filters';
import projectsReducer from '../reducers/projects';
import projectDetailsReducer from '../reducers/project_details';
import mapSettingsReducer from '../reducers/map';
import thunk from 'redux-thunk';

export default () => {
  const store = createStore(
    combineReducers({
      locations: locationsReducer,
      projects: projectsReducer,
      selected_project: projectDetailsReducer,
      filters: filtersReducer,
      map_state: mapSettingsReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
};