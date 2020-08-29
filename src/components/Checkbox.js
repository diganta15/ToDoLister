import React from 'react';
import firebase from 'firebase';

function Checkbox({ id }) {

    const archiveTask = () => {

        firebase
            .firestore()
            .collection('tasks')
            .doc(id)
            .update({
                archived: true,
            })

    }

    return (
        <div>
            <div className="checkbox-holder" data-testid="checkbox-action" onClick={() => archiveTask()}>
                <span className="checkbox" />
            </div>
        </div>
    )
}

export default Checkbox;

