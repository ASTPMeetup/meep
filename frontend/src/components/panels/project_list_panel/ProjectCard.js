import React from 'react';
import ProjectTypeMarker from '../../helpers/projectTypeMarker';
import SubHeader from '../../helpers/SubHeader';
import { ProjectTypePropsMap } from '../../../utilities/project_types';

const ProjectCard = ({ Name, Type, GHG_Reduced, GGE_Reduced }) => {
    const ProjectType = ProjectTypePropsMap[Type] ? ProjectTypePropsMap[Type].label : 'Project';
    return (
        <div className="project-card">
            <div className="row">
                <div className="col">
                    <SubHeader Text={Name}/>
                </div>
                <div className="col col-lg-2">
                    <div className="project-type-marker">
                        <ProjectTypeMarker FillClass={Type}/>
                    </div>
                </div>
                <div className="col-12 col-lg-10 flush-left">
                    <p>
                        <span className="project-card-label">Type:</span>&nbsp;{ProjectType}</p>
                    <p>
                        <span className="project-card-label">GHG Reduced:</span>&nbsp;{GHG_Reduced}
                    </p>
                    <p>
                        <span className="project-card-label">GGE Reduced:</span>&nbsp;{GGE_Reduced}
                    </p>
                </div>
            </div>
            <hr/>
        </div>
    )
};

export default ProjectCard;