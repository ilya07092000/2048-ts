import { myContainer } from './inversify.config';
import { ITileManager, IMoveManager, IEventManager, IGameField, IApp } from './interfaces';
import { TYPES } from './types';

import '../styles/styles.scss';

export enum MoveDirections {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

class App implements IApp {
  game: IGameField;
  eventManager: IEventManager;
  moveManager: IMoveManager;
  tileManager: ITileManager;
  locked: boolean;
  lose: boolean;
  score: number;
  scoreDomElement: HTMLElement;
  moveTileTime: number;
  restartButton: HTMLButtonElement;

  constructor(
    game: IGameField,
    eventManager: IEventManager,
    moveManager: IMoveManager,
    tileManager: ITileManager
  ) {
    this.game = game;
    this.eventManager = eventManager;
    this.moveManager = moveManager;
    this.tileManager = tileManager;
    this.locked = false;
    this.lose = false;
    this.score = 0;
    this.scoreDomElement = document.querySelector('.score__value');
    this.moveTileTime = 300;
    this.restartButton = document.querySelector('#restart-btn');
  }

  checkLose() {
    const emptyCells = this.game.getEmptyCells();

    if (emptyCells.length === 0 && !this.tileManager.isAnyTilesCanBeMerged()) {
      this.eventManager.removeListener();
      console.log('LOSE');
    }
  }

  updateScore(value: number) {
    this.score = value;
    this.renderScoreValue();
  }

  renderScoreValue() {
    this.scoreDomElement.textContent = this.score.toString();
  }

  restart() {
    this.game.removeAllTilesFromCells();
    this.tileManager.deleteAllTiles();

    this.game.addInitialTiles();
  }

  init() {
    this.game.createCells();
    this.game.renderCells();
    this.game.addInitialTiles();
    this.eventManager.initListener();
    this.eventManager.initTouchListener();
    this.restartButton.addEventListener('click', this.restart.bind(this));
  }
}

const game = new App(
  myContainer.get<IGameField>(TYPES.GameField),
  myContainer.get<IEventManager>(TYPES.EventManager),
  myContainer.get<IMoveManager>(TYPES.MoveManager),
  myContainer.get<ITileManager>(TYPES.TileManager)
);
game.init();

export default game;
