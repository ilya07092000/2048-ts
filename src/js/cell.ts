import { ICell } from "./interfaces";

class Cell implements ICell {
  x: number;
  y: number;
  hasTile?: boolean;

  constructor(x: number, y: number, hasTile: boolean = false) {
    this.x = x;
    this.y = y;
    this.hasTile = hasTile;
  }

  addTile() {
    this.hasTile = true;
  }

  removeTile() {
    this.hasTile = false;
  }
};

export default Cell;