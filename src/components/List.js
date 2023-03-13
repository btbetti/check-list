import React from 'react';
import ListItem from './ListItem';
import './List.css';

const List = ({ list, handleCheck, isChecked }) => {
    return (
        <div className="list-container">
            {list.map((item, index) => (
              <div key={index}>
                <ListItem item={item} handleCheck={handleCheck} isChecked={isChecked}/>
              </div>
            ))}
        </div>
    )
}

export default List;