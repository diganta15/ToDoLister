import { useState, useEffect } from 'react';
import { firebase } from '../firebase.js';
import moment from 'moment';
import { collatedTasksExists } from '../helpers/index.js';

const userId = localStorage.getItem('userId')


export const UseTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsuscribe = firebase
            .firestore()
            .collection('tasks')
            .where('userId', '==', userId);

        unsuscribe = selectedProject && !collatedTasksExists(selectedProject) ? (unsuscribe = unsuscribe.where('projectId', '==', selectedProject)) : selectedProject === 'TODAY'
            ? (unsuscribe = unsuscribe.where('date', '==', moment().format('DD/MM/YYYY')))
            : selectedProject === 'INBOX' || selectedProject === 0
                ? (unsuscribe = unsuscribe.where(' date', '==', userId))
                : unsuscribe;

        unsuscribe = unsuscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data(),
            }));

            setTasks(
                selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                        task => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true
                    )
                    : newTasks.filter(task => task.archived !== true)
            );
            setArchivedTasks(newTasks.filter(task => task.archived !== false));
        })
        return () => unsuscribe();
    }, [selectedProject])
    return { tasks, archivedTasks };

};

// const selectedProject = 1;
// const {tasks, archivedTasks} = userTasks(selectedProject);

export const useProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        firebase.firestore().collection('projects').where('userId', '==', userId).orderBy('projectId').get().then(
            snapshot => {
                const allProjects = snapshot.docs.map(project => ({
                    ...project.data(),
                    docId: project.id,

                }))
                if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
                    setProjects(allProjects);
                }
            }
        )
    }, [projects]);
    return { projects, setProjects };
   
};