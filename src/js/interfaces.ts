import { MoveDirections } from './index';

export interface IMoveManager {
  moveLeft(): void;
  moveUp(): void;
  moveRight(): void;
  moveDown(): void;
  moveTilesAction(direction: keyof typeof MoveDirections): void;
  moveTiles(tiles: Record<string, ITile[]>, direction: keyof typeof MoveDirections): void;
}

export interface ITileManager {
  getHorizontalLineTiles(): Record<string, ITile[]>;
  getVerticalLineTiles(): Record<string, ITile[]>;
  getTileMaxPosByDirection(direction: keyof typeof MoveDirections, tile: ITile): any;
  getTileMinPosByDirection(direction: keyof typeof MoveDirections, tile: ITile): any;
  getTileByPosition(direction: keyof typeof MoveDirections, pos: number, tiles: ITile[]): any;
  getSortedTilesByDirection(direction: keyof typeof MoveDirections, tiles: ITile[]): any;
  getTilesByDirection(direction: keyof typeof MoveDirections): any;
  mergeTiles(to: ITile, from: ITile): any;
  checkMergeAbility(tileOnPos: ITile, tile: ITile, tileList: ITile[]): any;
  isAnyTilesCanBeMerged(): any;
  deleteTileData(tile: ITile): any;
  deleteAllTiles(): void;
}

export interface IEventManager {
  eventListener({ keyCode }: any): any;
  initTouchListener(): any;
  initListener(): void;
  removeListener(): void;
}

export interface ITile {
  x: number;
  y: number;
  value: number;
  element: HTMLDivElement;
  updateTile(tile: ITile): void;
  updatePosition(tile: ITile): void;
  updateStyles(tile: ITile): void;
  remove(): void;
  merged(): void;
}

export interface IGameField {
  locked: boolean;
  createCells(): void;
  renderCells(): void;
  renderTiles(): void;
  renderTile(tile: ITile): void;
  createRandomTile(): ITile;
  getEmptyCells(): ICell[];
  addInitialTiles(): void;
  addRandomTile(): void;
  addTileToCell(tile: ITile): void;
  removeTileFromCell(tile: ITile): void;
  tiles: ITile[];
  rowSize: number;
  removeAllTilesFromCells(): void;
  tilesContainnerDomElement: HTMLDivElement;
}

export interface ICell {
  x: number;
  y: number;
  hasTile?: boolean;
  addTile(): void;
  removeTile(): void;
}

export interface IApp {
  game: IGameField;
  eventManager: IEventManager;
  moveManager: IMoveManager;
  tileManager: ITileManager;
  lose: boolean;
  score: number;
  scoreDomElement: HTMLElement;
  moveTileTime: number;
  checkLose(): void;
  // TODO update interface
}