import React, { useState } from 'react'
import { UseSelectedProjectValue, useProjectsValue } from '../../context';
import IndividualProjects from './IndividualProjects';

function Projects({userId, activeValue = null }) {
    const [active, setActive] = useState(activeValue);
    const { setSelectedProject } = UseSelectedProjectValue();
    const { projects } = useProjectsValue();
    
    return (
        <div>
            {projects && projects.map(project => (
            <li key={project.projectId} data-doc-id={project.docId} data-testid="project-action" className={
                active === project.projectId ? 'active sidebar__project' : 'sidebar__project'
            } onClick={() => {
                setActive(project.projectId)
                setSelectedProject(project.projectId)
            }}>
                <IndividualProjects project={project} userId={userId}/>
            </li>
            ))}
        </div>
    )
}

export default Projects
