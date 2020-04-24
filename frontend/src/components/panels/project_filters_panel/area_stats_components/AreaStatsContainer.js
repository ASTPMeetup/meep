import React from "react";
import { connect } from 'react-redux';
import { selectProjectLocations } from '../../../../selectors/locations';
import SubHeader from "../../../helpers/SubHeader";

const StatsContainer = ({ number_of_locations }) => {
    const stat_string = number_of_locations + ' projects in your area';
    return (
        <div className="stats-container text-center">
            <SubHeader Text={stat_string}/>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { 
        ...ownProps,
        number_of_locations: state.locations[0] ? selectProjectLocations(state.locations[0], state.filters).length : 0
    }
};

export default connect(mapStateToProps)(StatsContainer);