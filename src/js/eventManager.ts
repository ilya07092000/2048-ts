import { injectable, inject } from 'inversify';
import { IEventManager, IGameField, IMoveManager } from './interfaces';
import { MoveDirections } from './index';
import { TYPES } from './types';
import game from './index';

@injectable()
class EventManager implements IEventManager {
  @inject(TYPES.MoveManager) private moveManager: IMoveManager;
  @inject(TYPES.GameField) private gameField: IGameField;

  private listener: (e: KeyboardEvent) => void;

  constructor() {
    this.listener = this.eventListener.bind(this);
  }

  initListener() {
    window.addEventListener('keydown', this.listener);
  }

  removeListener() {
    window.removeEventListener('keydown', this.listener);
  }

  eventListener({ keyCode }: any) {
    console.log(keyCode);
    switch (keyCode) {
      // LEFT
      case 37:
        this.moveManager.moveTilesAction(MoveDirections.LEFT);
        game.checkLose();
        break;
      // UP
      case 38:
        this.moveManager.moveTilesAction(MoveDirections.UP);
        game.checkLose();
        break;
      // RIGHT
      case 39:
        this.moveManager.moveTilesAction(MoveDirections.RIGHT);
        game.checkLose();
        break;
      // DOWN
      case 40:
        this.moveManager.moveTilesAction(MoveDirections.DOWN);
        game.checkLose();
        break;
    }
  }

  initTouchListener() {
    let touchStartX = 0;
    let touchStartY = 0;

    this.gameField.tilesContainnerDomElement.addEventListener('touchstart', (e) => {
      e.preventDefault();

      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    this.gameField.tilesContainnerDomElement.addEventListener('touchend', (e) => {
      e.preventDefault();

      let touchEndX = e.changedTouches[0].clientX;
      let touchEndY = e.changedTouches[0].clientY;

      let deltaX = touchEndX - touchStartX;
      let deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX > 0) {
          this.eventListener({ keyCode: 39 });
        } else {
          console.log(123);
          this.eventListener({ keyCode: 37 });
        }
      } else {
        if (deltaY > 0) {
          this.eventListener({ keyCode: 40 });
        } else {
          this.eventListener({ keyCode: 38 });
        }
      }
    });
  }
}

export default EventManager;
