import React from 'react';
import logo from './../../img/logo.png';
import { FaPizzaSlice } from 'react-icons/fa'

function Header() {
    return (
        <div>
            <header className="header" data-testid="header">
                <nav>
                    <div className="logo">
                        <img className="logo" src={logo} alt="ToDoLister" />
                    </div>
                    <div className="settings">
                        <ul>
                            <li data-testid="quick-add-task-action" className="settings__add">+</li>
                            <li data-testid="dark-mode-action" className="settings__darkmode"><FaPizzaSlice/></li>
                        </ul>
                    </div>
                </nav>

            </header>
        </div>
    )
}

export default Header
