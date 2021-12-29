import GameField from './gameField';
import { IGameField } from './gameField';

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

  init() {
    this.game.createCells();
    this.game.renderCells();
    this.game.addInitialTiles();
  }
}

const game = new App(new GameField());
game.init();
