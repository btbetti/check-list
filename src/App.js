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

  handleDateChange = (e) => {
    this.setState({date: e, showDatePicker: false, inputText:""})
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
      const newItem = {note: inputText, date: this.state.date.toDateString(), isChecked: false};
      this.setState({
        checkList: [...this.state.checkList, newItem]
      });
    }
  }

  handleCheck = (event) => {
    let updatedList = [...this.state.checkList];
    const checkedItem = this.state.checkList.filter(x => x.note===event.target.value)[0];
    checkedItem.isChecked = event.target.checked;
    this.setState({checkList: updatedList});
  };

  isChecked = (item) => {
    return this.state.checkList.filter(x => x.note===item && x.isChecked).length>0 ? "checked-item" : "not-checked-item";
  }

  clearData = () => {
    const confirmationAction = window.confirm("This will reset the page. Do you want to continue?");
    if(confirmationAction) {
      this.setState({ checkList: [], inputText:"" });
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
            onSelect={this.handleDateChange} 
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
          <List list={this.state.checkList.filter(x => x.date===this.state.date.toDateString()).map(x => x.note)} handleCheck={this.handleCheck} isChecked={this.isChecked} />
          <p className="checked-item-text">Items checked are:</p>
          <List list={this.state.checkList.filter(x => x.isChecked && x.date===this.state.date.toDateString()).map(x => x.note)}/>
          <button className="clear-button button" onClick={this.clearData}>Clear</button>
        </div>     
      </div>
    );
  }
}

export default App;