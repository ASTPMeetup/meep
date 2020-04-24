import uuid from 'uuid';
import { firebase_service } from '../services/firebase_service';

// ADD_LOCATIONS
export const addLocations = (locations) => ({
  type: 'ADD_LOCATIONS',
  locations: locations.map(location => {
      return {
        key: uuid(),
        project_id: (Array.isArray(location.project_ids)) ? location.project_ids[0] : [],
        name: location.project_name,
        type: (Array.isArray(location.project_types)) ? location.project_types[0] : 'Default',
        center: location.center,
        gge_reduced: location.gge_reduced,
        ghg_reduced: location.ghg_reduced
      }
  })
});

export const getLocations = () => {
  return (dispatch) => {
    firebase_service.getLocations().then(locations => {
      dispatch(addLocations(locations));
    });
  }
}