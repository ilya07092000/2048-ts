import { injectable } from 'inversify';
import Tile from './tile/tile';
import Cell from './cell';
import tileFactory from './tile/tileFactory';
import randomNum from './helpers/getRandomNum';
import { ITile } from './interfaces';
import { IGameField, ICell } from './interfaces';
import getRandomNum from './helpers/getRandomNum';

@injectable()
class GameField implements IGameField {
  public locked: boolean;
  private _rowSize: number;
  private _initialTilesNumber: number;
  private _cells: ICell[][];
  private _gameFieldDomElement: HTMLDivElement;
  private _tilesContainnerDomElement: HTMLDivElement;
  private _tiles: ITile[];
  private _maxTilesNumber: number;

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

  set tiles(newTiles) {
    this._tiles = newTiles;
  }

  get tilesContainnerDomElement() {
    return this._tilesContainnerDomElement;
  }

  addTileToCell({ x, y }: ITile) {
    this._cells[y][x].addTile();
  }

  removeTileFromCell({ x, y }: ITile) {
    this._cells[y][x].removeTile();
  }

  removeAllTilesFromCells() {
    this._tiles.forEach((tile) => this.removeTileFromCell(tile));
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

  renderCells() {
    this._cells.forEach((row: any) => {
      const rowElement = document.createElement('div');
      rowElement.classList.add('row');

      row.forEach(() => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        rowElement.appendChild(cellElement);
      });

      this._gameFieldDomElement.appendChild(rowElement);
    });
  }

  addInitialTiles() {
    for (let i = 0; i < this._initialTilesNumber; i += 1) {
      const tile = this.createRandomTile();

      this.addTileToGameField(tile);
    }

    // // TODO REMOVE
    // for (let i = 0; i < this._initialTilesNumber; i += 1) {
    //  for (let j = 0; j < this._initialTilesNumber; j += 1) {
    //     const tile = tileFactory.createTile(i, j, Math.floor(getRandomNum(100)));

    //     this.addTileToGameField(tile);
    //  }
    // }
  }

  addRandomTile() {
    const tile: ITile = this.createRandomTile();
    this.addTileToGameField(tile);
  }

  createRandomTile(): ITile {
    const emptyCells: ICell[] = this.getEmptyCells();
    const intRandomNum: number = Math.floor(randomNum(emptyCells.length));
    const cell: ICell = emptyCells[intRandomNum];
    const tile = tileFactory.createTile(cell.x, cell.y);

    return tile;
  }

  addTileToGameField(tile: ITile) {
    const { x, y } = tile;

    this._tiles.push(tile);
    this._cells[y][x].addTile();

    this.renderTile(tile);
  }

  renderTiles() {
    this._tiles.forEach((tile: ITile) => this.renderTile(tile));
  }

  renderTile(tile: ITile) {
    this._tilesContainnerDomElement.appendChild(tile.element);
  }

  getEmptyCells(): ICell[] {
    const emptyCells: ICell[] = [];

    for (let i = 0; i < this._rowSize; i += 1) {
      for (let j = 0; j < this._rowSize; j += 1) {
        const y: number = j;
        const x: number = i;
        const cell: ICell = this._cells[y][x];

        if (!cell.hasTile) emptyCells.push(cell);
      }
    }

    return emptyCells;
  }
}

export default GameField;
