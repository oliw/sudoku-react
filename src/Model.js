
let num_rows = 9;
let num_cols = 9;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class TileModel {
  constructor(editable, value) {
    this.editable = editable;
    this.value = value;
  }
}

class Model {
  constructor() {
    this.data = [];
    for (let i = 0; i < num_rows; i++) {
      let row = [];
      for (let j = 0; j < num_cols; j++) {
        let value = getRandomInt(9);
        let tile = new TileModel(true, value);
        row.push(tile);
      };
      this.data.push(row);
    };
  }
  isValidMove(row_idx, col_idx, value) {
    let data = this.data;
    if (!this.data[row_idx][col_idx].editable) {
      return false;
    }
    // Check row is still ok
    let row_check = {};
    for (let i = 0; i < num_cols; i++) {
      if (data[row_idx][i].value in row_check) {
        console.log('Row fail');
        return false;
      } else {
        row_check[data[row_idx][i].value] = true;
      }
    }

    // Check column is still ok
    let col_check = {};
    for (let i = 0; i < num_rows; i++) {
      if (data[i][col_idx].value in col_check) {
        console.log('Column fail');
        return false;
      } else {
        col_check[data[i][col_check].value] = true;
      }
    }

    // Check tile section is still ok
    let row_start = Math.floor(row_idx / 3);
    let col_start = Math.floor(col_idx / 3);
    let section_check = {}
    for (let i = row_start; i < row_start + 3; i++) {
      for (let j = col_start; j < col_start + 3; j++) {
        if (data[i][j].value in section_check) {
          console.log('Section fail');
          return false;
        } else {
          section_check[data[i][j].value] = true;
        }
      }
    }
    return true;
  }
  setValue(row_idx, col_idx, value) {
    if (this.isValidMove(row_idx, col_idx, value)) {
      this.data[row_idx][col_idx].value = value;
    }
  }
  isComplete() {
    for (let i = 0; i < num_rows; i++) {
      for (let j = 0; j < num_cols; j++) {
        if (this.data[i][j] === null) {
          return false;
        }
      };
    }
    return true;
  }
  getTile(row_idx, col_idx) {
    return this.data[row_idx][col_idx];
  }
}

export default Model;
