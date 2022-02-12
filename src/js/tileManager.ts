import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { ITileManager } from './interfaces';
import { MoveDirections } from './index';
import { IGameField } from './interfaces';
import { ITile } from './interfaces';
import game from './index';

@injectable()
class TileManager implements ITileManager {
  @inject(TYPES.GameField) private gameField: IGameField;

  getHorizontalLineTiles() {
    const hrLineTiles: Record<string, ITile[]> = {};
    for (let i = 0; i < this.gameField.rowSize; i += 1) {
      const sameLineTiles = this.gameField.tiles.filter((tile: ITile) => tile.y === i);
      hrLineTiles[i] = sameLineTiles;
    }

    return hrLineTiles;
  }

  getVerticalLineTiles() {
    const vrLineTiles: Record<string, ITile[]> = {};

    for (let i = 0; i < this.gameField.rowSize; i += 1) {
      const sameLineTiles = this.gameField.tiles.filter((tile: ITile) => tile.x === i);
      vrLineTiles[i] = sameLineTiles;
    }

    return vrLineTiles;
  }

  getTileMaxPosByDirection(direction: keyof typeof MoveDirections, tile: ITile) {
    switch (direction) {
      case MoveDirections.LEFT:
        return tile.x;
      case MoveDirections.RIGHT:
        return this.gameField.rowSize - 1;
      case MoveDirections.DOWN:
        return this.gameField.rowSize - 1;
      case MoveDirections.UP:
        return tile.y;
    }
  }

  getTileMinPosByDirection(direction: keyof typeof MoveDirections, tile: ITile) {
    switch (direction) {
      case MoveDirections.LEFT:
        return 0;
      case MoveDirections.RIGHT:
        return 0;
      case MoveDirections.DOWN:
        return 0;
      case MoveDirections.UP:
        return 0;
    }
  }

  getTileByPosition(direction: keyof typeof MoveDirections, pos: number, tiles: ITile[]) {
    if (direction === MoveDirections.DOWN || direction === MoveDirections.UP) {
      return tiles.find((tile: ITile) => tile.y === pos);
    } else {
      return tiles.find((tile: ITile) => tile.x === pos);
    }
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

  getTilesByDirection(direction: keyof typeof MoveDirections) {
    if (direction === MoveDirections.LEFT || direction === MoveDirections.RIGHT) {
      return this.getHorizontalLineTiles();
    }

    return this.getVerticalLineTiles();
  }

  mergeTiles(to: ITile, from: ITile) {
    const newValue = to.value * 2;
    const newTile = Object.assign(to, {
      value: newValue,
    });

    to.updateTile(newTile);
    to.merged();
    from.remove();
    this.gameField.addTileToCell(to);
    this.deleteTileData(from);
    game.updateScore(game.score + newValue);
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

  deleteTileData(tile: ITile) {
    this.gameField.tiles = this.gameField.tiles.filter((t) => t !== tile);
  }

  isAnyTilesCanBeMerged() {
    const tylesByDirections = {
      horizontal: this.getHorizontalLineTiles(),
      vertial: this.getVerticalLineTiles(),
    };

    for (let [type, tiles] of Object.entries(tylesByDirections)) {
      for (let tilesRow of Object.values(tiles)) {
        let sortedTiles = [];

        if (type === 'horizontal') {
          sortedTiles = this.getSortedTilesByDirection(MoveDirections.RIGHT, tilesRow);
        } else {
          sortedTiles = this.getSortedTilesByDirection(MoveDirections.UP, tilesRow);
        }

        for (let i = 0; i < sortedTiles.length - 1; i += 1) {
          const currTile = sortedTiles[i];
          const nextTile = sortedTiles[i + 1];

          if (this.checkMergeAbility(currTile, nextTile, sortedTiles)) {
            return true;
          }
        }
      }
    }

    return false;
  }

  deleteAllTiles() {
    this.gameField.tiles.forEach((tile) => tile.remove());

    this.gameField.tiles = [];
  }
}

export default TileManager;
