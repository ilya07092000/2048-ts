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

  moveTiles(tiles: Record<string, ITile[]>, direction: keyof typeof MoveDirections) {
    const MIN_POS = 0;
    let moved = false;
    const lose = this.checkLose();

    if (lose) {
      console.log('lose');
      return;
    }

    Object.keys(tiles).forEach((rowNum: string) => {
      const tilesRow: ITile[] = [...tiles[rowNum]];

      if (tilesRow.length) {
        /**
         * sort by coords ascend or descend due to move direction
         */
        let sortedTiles = this.getSortedTilesByDirection(direction, tilesRow);

        sortedTiles.forEach((tile: ITile, index: number) => {
          let MAX_POS = this.getTileMaxPosByDirection(direction, tile);

          for (let i = MIN_POS; i < MAX_POS; i += 1) {
            let suggestedPos = i;

            if (direction === MoveDirections.DOWN || direction === MoveDirections.RIGHT) {
              suggestedPos = MAX_POS - suggestedPos; // reverse position 
            }

            const currTilesArr = [...sortedTiles];
            currTilesArr.splice(index, 1);

            let tileOnPos = this.getTileByPosition(direction, suggestedPos, sortedTiles);

            if (tileOnPos === tile) return;

            const mergeAbility = this.checkMergeAbility(tileOnPos, tile, sortedTiles);

            if (mergeAbility) {
              let updatedTile;
              this.locked = true;

              this.game.removeTileFromCell(tile);

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
                this.mergeTiles(tileOnPos, updatedTile);
                this.locked = false;
              }, this.moveTileTime);

              break;
            } else if (!tileOnPos) {
              let updatedTile;
              this.locked = true;

              this.game.removeTileFromCell(tile);

              if (direction === MoveDirections.LEFT || direction === MoveDirections.RIGHT) {
                updatedTile = Object.assign(
                  tile,
                  {
                    x: suggestedPos,
                  }
                );
              } else {
                updatedTile = Object.assign(
                  tile,
                  {
                    y: suggestedPos,
                  }
                );
              }

              moved = true;
              tile.updateTile(updatedTile);
              this.game.addTileToCell(updatedTile);

              setTimeout(() => {
                this.locked = false;
              }, this.moveTileTime);

              break;
            }
          }
        });
      }
    });

    if (moved) {
      setTimeout(() => {
        this.game.addRandomTile();
      }, this.moveTileTime);
    }
  }

  mergeTiles(to: ITile, from: ITile) {
    const newValue = to.value * 2;
    const newTile = Object.assign(to, {
      value: newValue,
    });

    to.updateTile(newTile);
    from.remove();
    this.game.addTileToCell(to);
    this.game.deleteTileData(from);
    this.updateScore(this.score + newValue);
  }

  checkLose() {
    const emptyCells = this.game.getEmptyCells();

    if (emptyCells.length === 0 && !this.isAnyTilesCanBeMerged()) {
      return true;
    }

    return false;
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

        for (let i = 0; i < sortedTiles.length - 1; i+= 1) {
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

  updateScore(value: number) {
    this.score = value;
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
