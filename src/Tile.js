import React, { Component } from 'react';
import './Tile.css';

const TILE_DIMENSION = 100;

class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); 
  }
  handleClick() {
    this.props.onTileSelected(this.props.row_idx, this.props.col_idx);
  }
  render() {
    const hasValue = this.props.model.value !== null;
    let value = null;
    let x_offset = TILE_DIMENSION * this.props.col_idx;
    let y_offset = TILE_DIMENSION * this.props.row_idx;
    let transform = `translate(${x_offset},${y_offset})`;
    let color = "red";
    if (this.props.selected) {
      color = "blue";
    }
    if (hasValue) {
      value = this.props.model.value;
    } else {
      value = "";
    }
    return (
      <g transform={transform} className="Tile" onClick={this.handleClick}>
        <rect x="0" y="0" width={TILE_DIMENSION} height={TILE_DIMENSION} fill="white"></rect>
        <text x="50" y="50" fill={color}>{value}</text>
      </g>
    );
  }
}

export default Tile;
