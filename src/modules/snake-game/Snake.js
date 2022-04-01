export default function Snake({ startPosition }) {
  this.length = 1;
  this.head = { x: startPosition.x, y: startPosition.y, next: null, prev: null };
  let tail = this.head;

  this.getHeadPosition = () => {
    return { x: this.head.x, y: this.head.y };
  };

  const addOnePart = (position) => {
    const newEl = {
      prev: tail,
      next: null,
      x: position.x,
      y: position.y,
    };

    tail.next = newEl;
    tail = newEl;
    this.length += 1;
  };

  this.moveSnake = ({ x, y }, add) => {
    const moveNext = ({ x, y }, pointer) => {
      const prevX = pointer.x;
      const prevY = pointer.y;
      pointer.x = x;
      pointer.y = y;
      if (pointer.next) moveNext({ x: prevX, y: prevY }, pointer.next);
      //to add element one step earlier - pass prevx and prevY
      else if (!pointer.next && add) addOnePart({ x, y });
    };
    moveNext({ x, y }, this.head);
  };

  this.getSnakeArray = () => {
    const resArr = [];
    let count = 0;
    let pointer = this.head;
    while (pointer) {
      resArr.push({ x: pointer.x, y: pointer.y, index: count });
      pointer = pointer.next;
      count++;
    }
    return resArr;
  };

  this.printSnakeInfo = () => {
    console.log(`Snake length: ${this.length} || headPosition X:${this.head.x}|Y:${this.head.y}`);
    let pointer = this.head;
    while (pointer) {
      console.log(`X:${pointer.x}|Y:${pointer.y}`);
      pointer = pointer.next;
    }
  };
}
