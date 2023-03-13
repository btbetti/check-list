import React from 'react';
import './ItemInput.css';

const ItemInput = ({ handleKeyPress, pushData, onInputChange, inputText }) => {
    return (
        <div>
            <input 
              onKeyDown={handleKeyPress}
              onChange={onInputChange}
              className="input-text"
              type="text" 
              placeholder="Create a list item"
              value={inputText}
            />
            <button className="add-button button" onClick={pushData}>Add</button>
        </div>
    )
}

export default ItemInput;