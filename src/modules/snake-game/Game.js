import Snake from "./Snake";

export default function Game({ snakeHeadPosition, width, height, speed, onChange }) {
  this.wallTeleport = true;

  //points
  this.points = 0;
  this.addPoint = function () {
    this.points++;
  };

  //game status
  this.gameStatus = "RUNNING";

  //current direction
  this.direction = "R";

  const randomPosition = () => {
    return {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
  };

  this.starPosition = randomPosition();

  this.snake = new Snake({ startPosition: snakeHeadPosition });

  this.getNextPosition = () => {
    let { x, y } = this.snake.getHeadPosition();
    if (this.direction === "L") x = x - 1;
    if (this.direction === "R") x = x + 1;
    if (this.direction === "D") y = y + 1;
    if (this.direction === "U") y = y - 1;
    return { x, y };
  };

  this.makeNextStep = () => {
    if (this.gameStatus !== "RUNNING") return;
    onChange();

    let { x, y } = this.getNextPosition();

    //check if move valid
    if (x < 0 || y < 0 || x >= width || y >= height) {
      if (this.wallTeleport) {
        if (x < 0) x = width + x;
        if (y < 0) y = height + y;
        if (x >= width) x = x - width;
        if (y >= height) y = y - height;
        this.snake.moveSnake({ x: x, y: y });
      } else {
        console.log("❌ GAME OVER 😔");
        return;
      }
    } else if (x === this.starPosition.x && y === this.starPosition.y) {
      //PUNKT
      this.points += 1 * speed;
      //console.log("yeah ⭐ punkty: " + this.points);
      this.starPosition = randomPosition();
      this.snake.moveSnake({ x, y }, true);
    } else if (this.snake.getSnakeArray().filter((sn) => (sn.x === x) & (sn.y === y)).length > 0) {
      console.log("❌ GAME OVER 🍰🍰🍰🍰 ZJADŁEM SIĘ 😔");
      this.gameStatus = "GAMEOVER";
    } else {
      this.snake.moveSnake({ x, y });
    }
  };

  this.printGameInfo = () => {
    this.snake.printSnakeInfo();
    console.dir(this);
  };
}
