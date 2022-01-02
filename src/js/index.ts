import GameField from './gameField';
import { IGameField } from './gameField';

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

  init() {
    this.game.createCells();
    this.game.renderCells();
    this.game.addInitialTiles();
    window.addEventListener('keydown', this.eventListener.bind(this));
  }
}

const game = new App(new GameField());
game.init();
