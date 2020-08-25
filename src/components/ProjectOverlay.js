import React from 'react';
import {useProjectsValue} from './../context';

function ProjectOverlay({setProject, showProjectOverlay, setShowProjectOverlay}) {
    const {projects} = useProjectsValue();
    return (    
        <div>
            {projects && showProjectOverlay && (
                <div className="project-overlay" data-testid='project-overlay'>
                    <ul className='project-overlay__list'>
                        {projects.map(project =>(
                            <li key={project.projectId} 
                            data-testid='project-overlay-action'
                            onClick={()=>{
                                setProject(project.projectId);
                                setShowProjectOverlay(false)
                            }}>
                                {project.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ProjectOverlay
