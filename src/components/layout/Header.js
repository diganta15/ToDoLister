import React,{useState} from 'react';
import logo from './../../img/logo.png';
import { FaPizzaSlice } from 'react-icons/fa';
import AddTask from './AddTask';
import {Avatar} from '@material-ui/core';
import {auth} from '../../firebase'

function Header({darkMode, setDarkMode, imageUrl, userId, user, setUser}) {
    const [shouldShowMain, setShouldShowMain] = useState(false);
    const [ showQuickAddTask, setShowQuickAddTask] = useState(false);
    return (
        <div>
            <header className="header" data-testid="header">
                <nav>
                    <div className="logo">,
                        <img className="logo" src={logo} alt="ToDoLister" />
                    </div>
                    <div className="settings">
                        <ul>    
                            <li data-testid="quick-add-task-action" className="settings__add"
                            onClick={()=> {setShowQuickAddTask(true);
                            setShouldShowMain(true)}}>+</li>
                            <li data-testid="dark-mode-action" className="settings__darkmode"
                            onClick={()=> setDarkMode(!darkMode )}><FaPizzaSlice/></li>
                            <li><Avatar className="post_avatar" alt={userId} src={imageUrl} /></li>
                            <li>{userId}</li>
                            
                        
                        </ul>
                        <button onClick={() => setUser(null)}>Log Out</button>
                    </div>
                </nav>
            <AddTask showAddTaskMain={false} shouldShowMain={shouldShowMain} showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask}/>
            </header>
        </div>
    )
}

export default Header
