import React from 'react';
import moment from 'moment';
import {FaSpaceShuttle, FaSun, FaRegPaperPlane} from 'react-icons/fa'

function TaskDate({setTaskDate, showTaskDate, setShowTaskDate}) {
    return (
        <div>
            {showTaskDate && (
                <div className="task-date" data-testid='task-date-overlay'>
                    <ul className="task-date__list">
                        <li onClick={()=>{
                            setShowTaskDate(false);
                            setTaskDate(moment().format('DD/MM/YY'))
                        }} data-testid='task-date-overlay'>
                            <span>
                                <FaSpaceShuttle />
                            </span>
                            <span>Today</span>
                        </li>

                        <li onClick={() => {
                            setShowTaskDate(false);
                            setTaskDate(moment().add(1,'day').format('DD/MM/YY'))
                        }} data-testid='task-date-overlay'>
                            <span>
                                <FaSun />
                            </span>
                            <span>Tomorrow</span>
                        </li>

                        <li onClick={() => {
                            setShowTaskDate(false);
                            setTaskDate(moment().add(7,'days').format('DD/MM/YY'))
                        }} data-testid='task-date-overlay'>
                            <span>
                                <FaRegPaperPlane />
                            </span>
                            <span>Next Week</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default TaskDate
