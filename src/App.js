import React, { Component } from 'react';
import logo from './logo.png';
import Calendar from './Calendar.png';
import 'animate.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      checkList: [],
      checked: [] 
    }
  }
  
  pushData = () => {
    const inputText = document.getElementById("input-text").value.trim();
    if (inputText === '') {
      alert("The list item is not valid, please try again.");
    } else if (this.state.checkList.indexOf(inputText) > -1) {
      alert("The list item is already avaible in the list, please try another one.");
    } else {
      this.setState({
        checkList: [...this.state.checkList, inputText]
      });
    }
  }

  clearData = () => {
    const confirmationAction = window.confirm("This will reset the page. Do you want to continue?");
    if(confirmationAction) {
      this.setState({ checkList: [], checked: [] });
      const inputElement = document.getElementById("input-text");
      if (inputElement.value !=="") {
        inputElement.value = "";
      }
    }
  }

  handleKeyPress =(e) => {
    const code = (e.keyCode ? e.keyCode : e.which);
    if (e.key === 'Enter' || code === 13) {
      this.pushData();
      e.preventDefault();
    }
  }

  handleCheck = (event) => {
    let updatedList = [...this.state.checked];
    if (event.target.checked) {
      updatedList = [...this.state.checked, event.target.value];
    } else {
      updatedList.splice(this.state.checked.indexOf(event.target.value), 1);
    }
    this.setState({checked: updatedList});
  };

  isChecked = (item) => 
   this.state.checked.includes(item) ? "checked-item" : "not-checked-item";

  checkedItems = () => 
    this.state.checked.length
    ? this.state.checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  
  render() {
    return (
      <div>
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1>Multi-Day Checklist</h1>
          <img src={Calendar} className="logo" alt="Calendar" />
        </div>
        <div className="content">
          <div>
            <input 
              onKeyDown={this.handleKeyPress}
              className="input-text"
              id="input-text"
              type="text" 
              placeholder="Create a list item"
            />
            <button className="add-button button" onClick={this.pushData}>Add</button>
          </div>
            
          <div className="list-container">
            {this.state.checkList.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={this.handleCheck} />
                <span className={this.isChecked(item)}>{item}</span>
              </div>
            ))}
          </div>

          <div className="checked-list-container">
            <p className="checked-item-text">Items checked are:</p>
            {this.state.checked.map((item, index) => (
              <div key={index}>
                <span>{item}</span>
              </div>
            ))}
          </div>
          
          <button className="clear-button button" onClick={this.clearData}>Clear</button>

        </div>
      </div>
    );
  }
}

export default App;