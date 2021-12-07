import Tile, { ITile } from './tile';

class TileFactory {
  createTile(x: number, y: number, value = 2): ITile {
    const tileElement = document.createElement('div');
    const tileInnerElement = document.createElement('div');

    tileInnerElement.innerText = value.toString();
    tileInnerElement.classList.add('tile__inner');

    tileElement.classList.add(...[`position-${x}-${y}`, 'tile', `tile-${value}`]);
    tileElement.appendChild(tileInnerElement);

    return new Tile(x, y, value, tileElement);
  }
}

export default new TileFactory();
