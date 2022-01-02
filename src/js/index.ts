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
        break;
      case 38:
        break;
      case 39:
        break;
      case 40:
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
