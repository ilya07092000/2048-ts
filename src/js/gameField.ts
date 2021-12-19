import { ITile } from './tile/tile';
import Cell, { ICell } from './cell';

export interface IGameField {
  tiles: ITile[];
  rowSize: number;
  createCells(): void;
}

class GameField implements IGameField {
  private _rowSize: number;
  private _initialTilesNumber: number;
  private _cells: ICell[][];
  private _gameFieldDomElement: HTMLDivElement;
  private _tilesContainnerDomElement: HTMLDivElement;
  private _tiles: ITile[];
  private _maxTilesNumber;

  constructor(rowSize = 4, initialTilesNumber = 2) {
    this._rowSize = rowSize;
    this._maxTilesNumber = rowSize * rowSize;
    this._cells = [];
    this._tiles = [];
    this._gameFieldDomElement = document.querySelector('#game-field') as HTMLDivElement;
    this._tilesContainnerDomElement = document.querySelector('#tiles-container') as HTMLDivElement;
    this._initialTilesNumber =
      initialTilesNumber > this._maxTilesNumber ? this._maxTilesNumber : initialTilesNumber;
  }

  get tiles(): ITile[] {
    return this._tiles;
  }

  get rowSize(): number {
    return this._rowSize;
  }

  createCells() {
    for (let i = 0; i < this._rowSize; i += 1) {
      const row = [];

      for (let j = 0; j < this._rowSize; j += 1) {
        const cell: ICell = new Cell(j, i);
        row.push(cell);
      }

      this._cells.push(row);
    }
  }
}

export default GameField;
