import React,{useState} from 'react';
import {firebase, firebaseConfig} from '../../firebase';
import {generatePushId} from '../../helpers';
import {useProjectValue, useProjectsValue} from '../../context';

function AddProject({shouldShow = false}) {
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
            userId: '23c3rrf',
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
                <div className="add-project__input">
                    <input value={projectName} type="text" className='add-project__name' data-testid='project-name' placeholder='Name Your Project' onChange={e => setProjectName(e.target.value)}/>
                    <button className='add-project__submit' type='button' data-testid='add-project-submit'>Add Project</button>
                    <span className="add-project__cancel" data-testid='hide-project-overlay'
                    onClick={() => setShow(false)}
                    >Cancel</span>
                </div>
            )}
        </div>
    )
}

export default AddProject
