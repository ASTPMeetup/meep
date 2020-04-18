import React from 'react';
import { connect } from 'react-redux';
import Header from '../../helpers/Header';
import SubHeader from '../../helpers/SubHeader';
import ActionButton from '../../helpers/ActionButton';
import StatsContainer from './area_stats_components/AreaStatsContainer';
import BackToLink from '../../helpers/BackToLink';
import {ProximitySlider, ZipLookUpField, CheckBoxRow} from './filter_map_components/index';
import { Link } from 'react-router-dom';
import { resetFilters } from '../../../actions/filters';

const ProjectFiltersPanel = (props) => {
    return(
        <div id="project_filters_panel">
            <BackToLink Route="/" Text="Back to home"/>
            <div className="project-filters">
                <Header Text="Filter The Map View"/>
                <div className="row">
                    <div className="col-5">
                        <SubHeader Text="Zip Code"/>
                        <ZipLookUpField/>
                    </div>
                    <div className="col-7">
                        <SubHeader Text="Proximity"/>
                        <ProximitySlider/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <SubHeader Text="Project Type"/>
                        <div className="project-types-container">
                            <CheckBoxRow Label="Infrastructure Transportation" ProjectType="Infrastructure Transportation"/>
                            <CheckBoxRow Label="Vehicle Transportation" ProjectType="Vehicle Transportation"/>
                            <CheckBoxRow Label="Other" ProjectType="Default"/>
                        </div>
                    </div>
                </div>
                <Header Text="Stats For The Area"/>
                <StatsContainer/>
                <div className="row">
                    <div className="col">
                        <Link to="/projects">
                            <ActionButton Text="Search"Class="primary-large"/>
                        </Link>
                        <div onClick={(e) => props.dispatch(resetFilters())}>
                            <ActionButton Text="Clear Filters" Class="secondary-large"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect()(ProjectFiltersPanel);