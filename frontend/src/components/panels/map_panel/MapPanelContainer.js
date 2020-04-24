import React, { useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { connect } from 'react-redux';
import { MeepService } from '../../../services/meep_service';
import { selectProject } from '../../../actions/project_details';
import { withRouter} from 'react-router-dom';
import { selectProjectLocations } from '../../../selectors/locations';
import { GoogleMapsAPIKey } from '../../../../private/google_maps';
import { ProjectTypePropsMap } from '../../../utilities/project_types';
import { getLocations } from '../../../actions/locations';

const meep_service = new MeepService();

const mapStateToProps = (state, ownProps) => {
    return { 
        ...ownProps,
        locations: state.locations[0] ? selectProjectLocations(state.locations[0], state.filters) : [],
        map_state: state.map_state
    }
};

const MyMapComponent = connect(mapStateToProps)(withScriptjs(withGoogleMap((props) => {
    const { map_state, locations } = props;

    useEffect(() => {
        props.dispatch(getLocations());
    }, []);

    const dispatchProjectSummary = (location) => {
        meep_service.getProjectDetailsById(location.project_id).then(data => {
            props.dispatch(selectProject(data));
            props.history.push("/details");
        });
    }

    return (
        <GoogleMap
            zoom={map_state.zoom}
            center={map_state.center}>
            {locations.map(location => {
                const iconTypeColor = ProjectTypePropsMap[location.type] ? ProjectTypePropsMap[location.type].color : 'default';
                const iconTypeImg = `/images/markers/${iconTypeColor}-marker.svg`;
                return <Marker key={location.key} icon={iconTypeImg} onClick={()=>dispatchProjectSummary(location)} position={location.center}>
                       </Marker>
            })}
        </GoogleMap>
    )
})));

const MapContainer = (props) => {
        return (
            <MyMapComponent
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPIKey}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100vh` }} />}
                history={props.history}
            />
        );

}

export default withRouter(MapContainer);