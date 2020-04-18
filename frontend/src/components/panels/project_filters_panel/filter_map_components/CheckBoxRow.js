import React from 'react';
import ProjectTypeMarker from '../../../helpers/projectTypeMarker';
import { removeTypeFilter, addTypeFilter } from '../../../../actions/filters';
import { connect } from 'react-redux';

const CheckBoxRow = (props) => {
    const { Checked, Label, ProjectType } = props;

    const handleCheckedEvent = () => {
        (Checked) ?
            props.dispatch(removeTypeFilter(ProjectType)) :
            props.dispatch(addTypeFilter(ProjectType));
    }

    return (
        <div className="checkbox-container" onClick={handleCheckedEvent}>
            <input className="hidden-checkbox" type="checkbox" defaultChecked={Checked}/>
            <div className="styled-checkbox">
                <svg className={`icon ${Checked ? "show-checked" : "hide-checked"}`}
                     viewBox="0 0 24 24" >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            <span className="style-span">{Label}</span>
            <span className="project-type-marker">
                <ProjectTypeMarker FillClass={ProjectType}/> 
            </span>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {    
    return {
        ...ownProps,
        Checked: state.filters.types.length && state.filters.types.includes(ownProps.ProjectType)
    }
}

export default connect(mapStateToProps)(CheckBoxRow);