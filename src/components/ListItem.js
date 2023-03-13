import React from 'react';
import './ListItem.css';

const ListItem = ({ item, handleCheck, isChecked }) => {
    if (handleCheck) {
        return(
            <div className="list-container">
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
            </div>
        )
    } else {
        return(<span>{item}</span>)
    }  
}

export default ListItem;