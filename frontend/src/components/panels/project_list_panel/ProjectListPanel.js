import React, { Component } from 'react';
import Header from '../../helpers/Header';
import BackToLink from '../../helpers/BackToLink';
import ProjectCard from './ProjectCard';
import { connect } from 'react-redux';
import { selectProject } from '../../../actions/project_details';
import { selectProjectLocations } from '../../../selectors/locations';
import { setSearchText } from '../../../actions/filters';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { MeepService } from '../../../services/meep_service';

const meep_service = new MeepService();

class ProjectListPanel extends Component {
    constructor(props) {
        super(props);
    }

    dispatchProjectSummary ({ project_id }) {
        meep_service.getProjectDetailsById(project_id).then(data => {
            this.props.dispatch(selectProject(data));
            this.props.history.push("/details");
        });
    }

    render() {
        return (
            <div id="project_list_container">
                <BackToLink Route="/filters" Text="Back to filters"/>
                <Header Text="Results That Match Your Search"/>
                <div className="row">
                    <div className="col">
                        <InputGroup size="sm" className="my-2 project_list_filter">
                            <FormControl 
                                aria-label="search text"
                                placeholder="search results.." 
                                value={this.props.search_text}
                                onChange={(e) => this.props.dispatch(setSearchText(e.target.value))}/>
                        </InputGroup>
                    </div>
                </div>
                {this.props.locations.length ?
                    <div className="project-list">
                        {this.props.locations.map(project => {
                            return (
                                <div onClick={() => this.dispatchProjectSummary(project)} key={project.key}>
                                    <ProjectCard
                                        key={project.key}
                                        Name={project.name} 
                                        Type={project.type}
                                        GHG_Reduced={project.ghg_reduced}
                                        GGE_Reduced={project.gge_reduced}/>
                                </div>
                            );
                        })}
                    </div>
                    :
                    <div>
                        <br/>
                        <p><em>No projects matched your search</em></p>
                    </div>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return { 
        locations: state.locations && state.locations.length ? selectProjectLocations(state.locations[0], state.filters) : [],
        selected_project: state.selected_project || {},
        search_text: state.filters.search_text
    }
};

export default connect(mapStateToProps)(ProjectListPanel);