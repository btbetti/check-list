import React, { Component } from 'react';
import List from './components/List';
import ItemInput from './components/ItemInput';
import logo from './logo.png';
import Calendar from './Calendar.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import 'animate.css';
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      checkList: [],
      checked: [],
      inputText: "",
      date: new Date(),
      showDatePicker: false
    }
  }

  dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  weekdayFormatOptions = { weekday: 'long' };

  datePicker = () => {
    this.setState({showDatePicker: true});
  }

  handleDateChagne = (e) => {
    this.setState({date: e, showDatePicker: false})
  }

  handleKeyPress = (e) => {
    const code = (e.keyCode ? e.keyCode : e.which);
    if (e.key === 'Enter' || code === 13) {
      this.pushData();
      e.preventDefault();
    }
  }

  onInputChange = (e) => {
    this.setState({inputText: e.target.value});
  }

  pushData = () => {
    const inputText = this.state.inputText.trim();
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

  clearData = () => {
    const confirmationAction = window.confirm("This will reset the page. Do you want to continue?");
    if(confirmationAction) {
      this.setState({ checkList: [], checked: [], inputText:"" });
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1>Multi-Day Checklist</h1>
          <img src={Calendar} className="logo" alt="Calendar" onClick={this.datePicker} />
          <DayPicker 
            style={{visibility: this.state.showDatePicker ? 'visible' : 'hidden'}}
            className="date-picker" 
            mode="single" 
            selected={this.state.date} 
            onSelect={this.handleDateChagne} 
            modifiersClassNames={{
              selected: "day-picker-selected",
              today: "day-picker-today"
            }}
            weekStartsOn={1}
            showWeekNumber
          />
        </div>
        <div className="content">
          <p>Checklist of</p>
          <p className="current-date"><strong>{this.state.date.toLocaleDateString(navigator.language, this.dateFormatOptions)} ({this.state.date.toLocaleDateString(navigator.language, this.weekdayFormatOptions)})</strong></p>
          <ItemInput handleKeyPress={this.handleKeyPress} pushData={this.pushData} onInputChange={this.onInputChange} inputText={this.state.inputText}/>
          <List list={this.state.checkList} handleCheck={this.handleCheck} isChecked={this.isChecked} />
          <p className="checked-item-text">Items checked are:</p>
          <List list={this.state.checked}/>
          <button className="clear-button button" onClick={this.clearData}>Clear</button>
        </div>     
      </div>
    );
  }
}



export default App;