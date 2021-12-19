import { ITile } from './tile/tile';
import { ICell } from './cell';

export interface IGameField {
  tiles: ITile[];
  rowSize: number;
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
}

export default GameField;
