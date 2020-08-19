import React from 'react';
import Sidebar from './Sidebar';
import Tasks from '../Tasks'
function Content() {
    return (
        <div className="content">
            <section >
            <Sidebar />
            <Tasks />
            </section>
        </div>
    )
}

export default Content
