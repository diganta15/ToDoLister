import React, { useState } from 'react';
import { FaRegList, FaCalendarAlt, FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../../firebase';
import { UseSelectedProjectValue } from '../../context';
import ProjectOverlay from './../ProjectOverlay';
import TaskDate from './../TaskDate';

function AddTask({ userId, showAddTaskMain = true, showShouldMain = false, showQuickAddTask, setShowQuickAddTask }) {

    const [task, setTask] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [project, setProject] = useState('');
    const [showMain, setShowMain] = useState(showShouldMain);
    const [showProjectOverlay, setShowProjectOverlay] = useState(false);
    const [showTaskDate, setShowTaskDate] = useState(false);

    const { selectedProject } = UseSelectedProjectValue();
    
    const addTask = () => {
        const projectId = project || selectedProject;
        let collatedDate = '';

        if (projectId === 'TODAY') {
            collatedDate = moment().format('DD/MM/YYYY');
        }
        else if (projectId === 'NEXT_7') {
            collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
        }

        return (task && projectId && firebase.firestore().collection('tasks').add(
            {
                archived: false,
                projectId,
                task,
                date: collatedDate || taskDate,
                userId: userId,

            })
            .then(() => {
                setTask('');
                setProject('');
                setShowMain('');
                setShowProjectOverlay(false);
            }))

    }

    return (
        <div>
            <div className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'} dats-testid='add-task-comp'>
                {showAddTaskMain && (
                    <div className="add-task__shallow" data-testid='show-main-action' onClick={() => setShowMain(!showMain)}>
                        <span className='add-task__plus'>+</span>
                        <span className='add-task__text'> Add Task</span>
                    </div>
                )}

                {(showMain || showQuickAddTask) && (
                    <div className="add-task__main" data-testid='add-task-main'>
                        {showQuickAddTask && (
                            <>
                                <div className="" data-testid='quick-add-task'>
                                    <h2 className='header'>Quick Add Task</h2>
                                    <span className='add-task__cancel-x' data-testid='add-task-quick-cancel'
                                        onClick={() => {
                                            setShowMain(false);
                                            setShowProjectOverlay(false);
                                            setShowQuickAddTask(false);
                                        }}>
                                            X
                                    </span>
                                </div>
                            </>
                        )}
                        <ProjectOverlay setProject={setProject} showProjectOverlay={showProjectOverlay} setShowProjectOverlay={setShowProjectOverlay} />
                        
                        <TaskDate setTaskDate={setTaskDate} showTaskDate={showTaskDate} setShowTaskDate={setShowTaskDate}/>

                        <input type="text" className="add-task__content"
                        data-testid='add-task-content' value={task} onChange={(e)=>setTask(e.target.value)} />
                        <button className="add-task__submit" type='button' onClick={() => showQuickAddTask ? addTask() &&  setShowQuickAddTask(false) : addTask()}>
                            Add Task
                        </button>
                        {!showQuickAddTask && (
                            <span className="add-task__cancel" data-testid='add-task-main-cancel'
                            onClick={()=>{
                                setShowMain(false);
                                setShowProjectOverlay(false)
                            }} >Cancel</span>
                        )}
                        <span className="add-task__project" data-testid='show-project-overlay'
                        onClick={()=> 
                        setShowProjectOverlay(!showProjectOverlay)}>
                            <FaRegListAlt />
                        </span>
                        <span className="add-task__date" data-testid='show-task-date-overlay'
                        onClick={()=> setShowTaskDate(!showTaskDate)}>
                            <FaRegCalendarAlt />
                        </span>
                    </div>
                )}
            </div>
        </div >
    )
}

export default AddTask;
