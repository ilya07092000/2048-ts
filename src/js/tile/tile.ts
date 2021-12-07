export interface ITile {
  x: number;
  y: number;
  value: number;
  element: HTMLDivElement;
  updateTile(tile: ITile): void;
  updatePosition(tile: ITile): void;
  updateStyles(tile: ITile): void;
}

class Tile implements ITile {
  x: number;
  y: number;
  value: number;
  element: HTMLDivElement;

  constructor(
    x: number,
    y: number,
    value: number,
    element: HTMLDivElement,
  ) {
    this.x = x;
    this.y = y;
    this.element = element;
    this.value = value;
  }

  remove() {
    setTimeout(() => this.element.remove(), 100);
  }

  updateTile(tile: ITile) {
    this.updatePosition(tile);
    this.updateStyles(tile);
    this.updateValue(tile);
  }

  updatePosition({x, y}: ITile) {
    this.x = x;
    this.y = y;
  }

  updateStyles({ x, y, value }: ITile) {
    this.element.className = '';
    this.element.classList.add(...[`position-${x}-${y}`, 'tile', `tile-${value}`]);
  }

  updateValue({ value }: ITile) {
    this.value = value;
    this.element.querySelector('.tile__inner')!.textContent = value.toString();
  }
}

export default Tile;
