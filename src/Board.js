import React, { Component } from 'react';
import Tile from './Tile'

const num_rows = 9;
const num_cols = 9;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_row_idx: null,
      selected_col_idx: null
    };
    this.handleTileSelected = this.handleTileSelected.bind(this);
  }
  handleTileSelected(row_idx, col_idx) {
    this.setState({
      selected_row_idx: row_idx,
      selected_col_idx: col_idx
    });
    this.props.onTileSelected(row_idx, col_idx)
  }
  renderTile(row_idx, col_idx) {
    let tileModel = this.props.model.getTile(row_idx, col_idx);
    let selected = this.state.selected_row_idx === row_idx && this.state.selected_col_idx === col_idx;
    let key = row_idx*9+col_idx;
    return(
      <Tile key={key} model={tileModel} row_idx={row_idx} col_idx={col_idx} selected={selected} onTileSelected={this.handleTileSelected}/>
    )
  }
  renderRow(row_idx) {
    let tiles = [];
    for (let i = 0; i < num_cols; i++) {
      tiles.push(this.renderTile(row_idx, i));
    }
    return(
      <g key={row_idx} className='row'>
        {tiles}
      </g>
    );
  }
  render() {
    let rows = [];
    for (let i = 0; i < num_rows; i++) {
      rows.push(this.renderRow(i));
    }
    return (
      <svg width="900" height="900">
        {rows}
      </svg>
    );
  }
}

export default Board;
