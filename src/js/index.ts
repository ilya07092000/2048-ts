import GameField from './gameField';
import { IGameField } from './gameField';
import { ITile } from './tile/tile';

enum MoveDirections {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

class App {
  game: IGameField;
  locked: boolean;
  lose: boolean;
  score: number;
  scoreDomElement: HTMLElement;
  moveTileTime: number;

  constructor(game: IGameField) {
    this.game = game;
    this.locked = false;
    this.lose = false;
    this.score = 0;
    this.scoreDomElement = document.querySelector('.score__value');
    this.moveTileTime = 300;
  }

  checkMergeAbility(tileOnPos: ITile, tile: ITile, tileList: ITile[]) {
    if (tileOnPos && tileOnPos.value === tile.value) {
      const tileOnPosIndex = tileList.findIndex((t) => tileOnPos === t);
      const tileToMergeIndex = tileList.findIndex((t) => t === tile);

      if (tileToMergeIndex - tileOnPosIndex === 1) {
        return true;
      }

      return false;
    }

    return false;
  }

  getSortedTilesByDirection(direction: keyof typeof MoveDirections, tiles: ITile[]) {
    switch (direction) {
      case MoveDirections.LEFT:
        return tiles.sort((a, b) => a.x - b.x);
      case MoveDirections.RIGHT:
        return tiles.sort((a, b) => b.x - a.x);
      case MoveDirections.UP:
        return tiles.sort((a, b) => a.y - b.y);
      case MoveDirections.DOWN:
        return tiles.sort((a, b) => b.y - a.y);
    }
  }

  getTileMaxPosByDirection(direction: keyof typeof MoveDirections, tile: ITile) {
    switch (direction) {
      case MoveDirections.LEFT:
        return tile.x;
      case MoveDirections.RIGHT:
        return this.game.rowSize - 1;
      case MoveDirections.DOWN:
        return this.game.rowSize - 1;
      case MoveDirections.UP:
        return tile.y;
    }
  }

  getTileByPosition(direction: keyof typeof MoveDirections, pos: number, tiles: ITile[]) {
    if (direction === MoveDirections.DOWN || direction === MoveDirections.UP) {
      return tiles.find((tile: ITile) => tile.y === pos);
    } else {
      return tiles.find((tile: ITile) => tile.x === pos);
    }
  }

  eventListener({ keyCode }: KeyboardEvent) {
    switch (keyCode) {
      case 37:
        this.moveTilesAction(MoveDirections.LEFT);
        break;
      case 38:
        this.moveTilesAction(MoveDirections.UP);
        break;
      case 39:
        this.moveTilesAction(MoveDirections.RIGHT);
        break;
      case 40:
        this.moveTilesAction(MoveDirections.DOWN);
        break;
    }
  }

  moveTilesAction(direction: keyof typeof MoveDirections) {
    if (this.locked) return;

    switch (direction) {
      case MoveDirections.LEFT:
        break;
      case MoveDirections.UP:
        break;
      case MoveDirections.RIGHT:
        break;
      case MoveDirections.DOWN:
        break;
    }
  }

  getTilesByDirection(direction: keyof typeof MoveDirections) {
    if (direction === MoveDirections.LEFT || direction === MoveDirections.RIGHT) {
      return this.getHorizontalLineTiles();
    }

    return this.getVerticalLineTiles();
  }

  getHorizontalLineTiles() {
    const hrLineTiles: Record<string, ITile[]> = {};

    for (let i = 0; i < this.game.rowSize; i += 1) {
      const sameLineTiles = this.game.tiles.filter((tile: ITile) => tile.y === i);
      hrLineTiles[i] = sameLineTiles;
    }

    return hrLineTiles;
  }

  getVerticalLineTiles() {
    const vrLineTiles: Record<string, ITile[]> = {};

    for (let i = 0; i < this.game.rowSize; i += 1) {
      const sameLineTiles = this.game.tiles.filter((tile: ITile) => tile.x === i);
      vrLineTiles[i] = sameLineTiles;
    }

    return vrLineTiles;
  }

  init() {
    this.game.createCells();
    this.game.renderCells();
    this.game.addInitialTiles();
    window.addEventListener('keydown', this.eventListener.bind(this));
  }
}

const game = new App(new GameField());
game.init();
