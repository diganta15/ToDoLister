import React,{useEffect} from 'react';
import Checkbox from './Checkbox';
import {UseTasks} from './../hooks';
import {collatedTasks} from '../constants';
import {getTitle, getCollatedTitle, collatedTasksExists} from '../helpers';
import { useProjectsValue, UseSelectedProjectValue } from '../context';
import AddTask from './layout/AddTask';

function Tasks() {
    const {selectedProject} = UseSelectedProjectValue();
    const {projects} = useProjectsValue();
    const {tasks} = UseTasks(selectedProject);
    let projectName = '';

    if (projects.length>0 && selectedProject && !collatedTasksExists(selectedProject))
    {
        projectName = getTitle(projects, selectedProject).name;
        
    }

    if(collatedTasksExists(selectedProject) && selectedProject){
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
        
    }

    useEffect(() => {
        document.title = `${projectName}: Todoist`
    }, [])

   
    return (
        <div>
            <div className="tasks" data-testid="tasks">
                <h2 data-testid="project-name">{projectName}</h2>

                <ul className="tasks__list">
                    {tasks.map(task => (
                        <li key={`$task.id`}>
                            <Checkbox id={task.id} />
                            <span>{task.task}</span>
                        </li>
                    ))}
                </ul>
                <AddTask />
            </div>
        </div>
    )
}

export default Tasks
