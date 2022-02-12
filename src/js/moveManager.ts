import { injectable } from 'inversify';
import { MoveDirections } from './index';
import { inject } from 'inversify';
import { TYPES } from './types';
import { IGameField, IMoveManager, ITileManager } from './interfaces';
import { ITile } from './interfaces';

@injectable()
class MoveManager implements IMoveManager {
  @inject(TYPES.TileManager) private tileManager: ITileManager;
  @inject(TYPES.GameField) private gameField: IGameField;

  private moveTime: number;

  constructor() {
    this.moveTime = 200;
  }

  moveLeft() {
    const tiles = this.tileManager.getTilesByDirection(MoveDirections.LEFT);
    this.moveTiles(tiles, MoveDirections.LEFT);
  }

  moveUp() {
    const direction = MoveDirections.UP;
    const tiles = this.tileManager.getTilesByDirection(direction);
    this.moveTiles(tiles, direction);
  }

  moveRight() {
    const direction = MoveDirections.RIGHT;
    const tiles = this.tileManager.getTilesByDirection(direction);
    this.moveTiles(tiles, direction);
  }

  moveDown() {
    const direction = MoveDirections.DOWN;
    const tiles = this.tileManager.getTilesByDirection(direction);
    this.moveTiles(tiles, direction);
  }

  moveTilesAction(direction: keyof typeof MoveDirections) {
    if (this.gameField.locked) return;

    switch (direction) {
      case MoveDirections.LEFT:
        this.moveLeft();
        break;
      case MoveDirections.UP:
        this.moveUp();
        break;
      case MoveDirections.RIGHT:
        this.moveRight();
        break;
      case MoveDirections.DOWN:
        this.moveDown();
        break;
    }
  }

  moveTiles(tiles: Record<string, ITile[]>, direction: keyof typeof MoveDirections) {
    let moved = false;

    Object.keys(tiles).forEach((rowNum: string) => {
      const tilesRow: ITile[] = [...tiles[rowNum]];

      if (tilesRow.length) {
        /**
         * sort by coords ascend or descend due to move direction
         */
        let sortedTiles = this.tileManager.getSortedTilesByDirection(direction, tilesRow);

        sortedTiles.forEach((tile: ITile, index: number) => {
          let MAX_POS = this.tileManager.getTileMaxPosByDirection(direction, tile);
          let MIN_POS = this.tileManager.getTileMinPosByDirection(direction, tile);

          for (let i = MIN_POS; i < MAX_POS; i += 1) {
            let suggestedPos = i;

            if (direction === MoveDirections.DOWN || direction === MoveDirections.RIGHT) {
              suggestedPos = MAX_POS - suggestedPos; // reverse position
            }

            const currTilesArr = [...sortedTiles];
            currTilesArr.splice(index, 1);

            let tileOnPos = this.tileManager.getTileByPosition(
              direction,
              suggestedPos,
              sortedTiles
            );

            if (tileOnPos === tile) return;

            const mergeAbility = this.tileManager.checkMergeAbility(tileOnPos, tile, sortedTiles);

            if (mergeAbility) {
              let updatedTile;
              this.gameField.locked = true;

              this.gameField.removeTileFromCell(tile);

              if (direction === MoveDirections.LEFT || direction === MoveDirections.RIGHT) {
                updatedTile = Object.assign(tile, {
                  x: suggestedPos,
                });
              } else {
                updatedTile = Object.assign(tile, {
                  y: suggestedPos,
                });
              }

              moved = true;
              tile.updateTile(updatedTile);
              setTimeout(() => {
                this.tileManager.mergeTiles(tileOnPos, updatedTile);
                this.gameField.locked = false;
              }, this.moveTime);

              break;
            } else if (!tileOnPos) {
              let updatedTile;
              this.gameField.locked = true;

              this.gameField.removeTileFromCell(tile);

              if (direction === MoveDirections.LEFT || direction === MoveDirections.RIGHT) {
                updatedTile = Object.assign(tile, {
                  x: suggestedPos,
                });
              } else {
                updatedTile = Object.assign(tile, {
                  y: suggestedPos,
                });
              }

              moved = true;
              tile.updateTile(updatedTile);
              this.gameField.addTileToCell(updatedTile);

              setTimeout(() => {
                this.gameField.locked = false;
              }, this.moveTime);

              break;
            }
          }
        });
      }
    });

    if (moved) {
      setTimeout(() => {
        this.gameField.addRandomTile();
      }, this.moveTime);
    }
  }
}

export default MoveManager;
