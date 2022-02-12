import { ITile } from '../interfaces';

class Tile implements ITile {
  x: number;
  y: number;
  value: number;
  element: HTMLDivElement;
  private innerElement: HTMLDivElement;

  constructor(x: number, y: number, value: number, element: HTMLDivElement) {
    this.x = x;
    this.y = y;
    this.element = element;
    this.value = value;
    this.innerElement = this.element.querySelector('.tile__inner');
  }

  remove() {
    this.element.remove();
  }

  updateTile(tile: ITile) {
    this.updatePosition(tile);
    this.updateStyles(tile);
    this.updateValue(tile);
  }

  updatePosition({ x, y }: ITile) {
    this.x = x;
    this.y = y;
  }

  updateStyles({ x, y, value }: ITile) {
    this.element.className = '';
    this.element.classList.add(...[`position-${x}-${y}`, 'tile', `tile-${value}`]);
  }

  updateValue({ value }: ITile) {
    const innerElement = this.element.querySelector('.tile__inner');
    this.value = value;
    innerElement!.textContent = value.toString();
  }

  merged() {
    this.innerElement.animate([
      {
        transform: 'scale(1.3)',
        easing: 'ease-out'
      },

      {
        transform: ' scale(1.0)',
        easing: 'ease-out'
      },
    ], 100);
  }
}

export default Tile;
