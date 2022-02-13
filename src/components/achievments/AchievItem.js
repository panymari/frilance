import React from 'react';
import classes from './AchievItem.module.scss';

const AchievItem = ({ todo, removeToDo }) => {
    return (
        <div key={todo.id}>
            <div>
                {todo.task}
                &nbsp;
                <button className={classes.buttonRemove} onClick={() => { removeToDo(todo.id) }}>                    
                    <i aria-hidden="true" className="fa fa-trash fa-2x" />
                </button>
            </div>
        </div>
    );
}
export default AchievItem;