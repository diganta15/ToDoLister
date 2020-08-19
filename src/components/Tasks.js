import React,{useEffect} from 'react';
import Checkbox from './Checkbox';
import {UseTasks} from './../hooks';
import {collatedTasks} from '../constants';
import {getTitle, getCollatedTitle, collatedTasksExists} from '../helpers';
import { useProjectsValue, UseSelectedProjectValue } from '../context';


function Tasks() {
    const {selectedProject} = UseSelectedProjectValue();
    const {projects} = useProjectsValue();
    const {tasks} = UseTasks(selectedProject);
    let projectName = '';

    if (projects && selectedProject && !collatedTasksExists(selectedProject))
    {
        projectName = getTitle(projects, selectedProject).name;
        console.log('projectName 1:',projectName);
    }

    if(collatedTasksExists(selectedProject) && selectedProject){
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
        console.log('projectName 2:', projectName);
    }

    useEffect(() => {
        document.title = `${projectName}: Todoist`
    }, [])

    console.log('tasks',tasks)
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
            </div>
        </div>
    )
}

export default Tasks
