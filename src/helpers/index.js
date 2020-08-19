import {collatedTasks} from '../constants/index'

export const collatedTasksExists = selectedProject => 
    collatedTasks.find(task => task.key === selectedProject);

export const getCollatedTitle = (project,key) =>
collatedTasks.find(project => project.key === key);

export const getTitle = (projects, projectId) =>
    projects.find(project => project.projectId === projectId);