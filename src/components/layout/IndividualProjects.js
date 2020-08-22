import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useProjectsValue, UseSelectedProjectValue } from '../../context';
import { firebase } from '../../firebase';




function IndividualProjects({project}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const { projects, setProjects } = useProjectsValue();
    const { setSelectedProject } = UseSelectedProjectValue();
    
    const deleteProject = docId => {
        firebase
            .firestore()
            .collection('projects')
            .doc(docId)
            .delete()
            .then(() => {
                setProjects([...projects]);
                setSelectedProject('INBOX');
            })
    }
    return (
        <div>
            <>
                <span className="sidebar__dot">•</span>
                <span className="sidebar__project-name" style={{marginTop:"0px",paddingTop:"0px"}}>{project.name}</span>
                <span className="sidebar__project-delete" data-testid="delete project" onClick={() => setShowConfirm(!showConfirm)}>
                    <FaTrashAlt />
                    {showConfirm && (
                        <div className="project-delete-modal">
                            <div className="project-delete-modal__inner">
                                <p>Are you sure you want to delete this project?</p>
                                <button type="button" onClick={()=>deleteProject(project.docId)}>Delete  </button>
                                <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>

                            </div>
                        </div>
                    )}
                    
                </span>
            </>
        </div>
    )
}

export default IndividualProjects
