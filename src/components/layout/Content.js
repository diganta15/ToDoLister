import React from 'react';
import Sidebar from './Sidebar';
import Tasks from '../Tasks'
function Content({userId}) {
    return (
        <div className="content">
            <section >
                <Sidebar userId={userId}/>
                <Tasks userId={userId} />
            </section>
        </div>
    )
}

export default Content
