import React,{useState} from 'react';
import {firebase, firebaseConfig} from '../../firebase';
import {generatePushId} from '../../helpers';
import {useProjectValue, useProjectsValue} from '../../context';

function AddProject({userId ,shouldShow = false}) {
    const [show, setShow] = useState(shouldShow);
    const [projectName, setProjectName] = useState('');

    const projectId = generatePushId();
    const {setProjects} = useProjectsValue();

    const addProject = () =>
    {
        projectName && firebase.firestore().collection('projects')
        .add({
            projectId,
            name: projectName,
            userId: userId ,
        })
        .then(()=>{
            setProjects([]);
            setProjectName('');
            setShow(false);
        });
    }

    return (
        <div className='add-projects' data-testid='add-project'>
            {show && (
                <div className="add-projects__input">
                    <input value={projectName} type="text" className='add-projects__name' data-testid='project-name' placeholder='Name Your Project' onChange={e => setProjectName(e.target.value)}/>
                    <button className='add-projects__submit' type='button' data-testid='add-project-submit' onClick={()=> addProject()}>Add Project</button>
                    <span className="add-projects__cancel" data-testid='hide-project-overlay'
                    onClick={() => setShow(false)}
                    >Cancel</span>
                </div>
               
            )}
            <span className="add-project__plus">+ </span>
            <span className="add-project__text" data-testid="add-project-action"
                onClick={() => setShow(!show)}
            >Add Project</span>
        </div>
    )
}

export default AddProject
