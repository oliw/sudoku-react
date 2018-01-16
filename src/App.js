import React, { Component } from 'react';
import Board from './Board';
import Model from './Model'; 
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: new Model(),
      selectedRow: null,
      selectedCol: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleTileSelected = this.handleTileSelected.bind(this);
  }
  handleTileSelected(row_idx, col_idx) {
    this.setState({
      selectedRow: row_idx,
      selectedCol: col_idx
    });
  }
  handleClick() {
    this.setState({
      model: new Model()
    });
  }
  handleKeyPress(e) {
    let value = e.key;
    if (value < "0" || value > "9") {
      return false;
    }
    let model = this.state.model;
    if (this.state.selectedRow !== null && this.state.selectedCol !== null) {
      model.setValue(this.state.selectedRow, this.state.selectedCol, Number(value));      
    }
    this.setState({
      model: model
    });
  }
  componentWillMount() {
    document.addEventListener("keyup", this.handleKeyPress.bind(this), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyPress.bind(this), false);
  }
  render() {
    return (
      <div>
        <Board model={this.state.model} onTileSelected={this.handleTileSelected}></Board>
        <button onClick={this.handleClick} >Reset</button>
        <span>The selected row is {this.state.selectedRow}, column is {this.state.selectedCol}</span>
      </div>
    );
  }
}

export default App;
