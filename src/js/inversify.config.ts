import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { IApp, IEventManager, IGameField, IMoveManager, ITileManager } from './interfaces';
import MoveManager from './moveManager';
import TileManager from './tileManager';
import EventManager from './eventManager';
import GameField from './gameField';
import App from './index';

const myContainer = new Container();
myContainer.bind<IGameField>(TYPES.GameField).to(GameField).inSingletonScope();
myContainer.bind<IMoveManager>(TYPES.MoveManager).to(MoveManager).inSingletonScope();
myContainer.bind<IEventManager>(TYPES.EventManager).to(EventManager).inSingletonScope();
myContainer.bind<ITileManager>(TYPES.TileManager).to(TileManager).inSingletonScope();

export { myContainer };
