import Matter from "matter-js";

let Bodies = Matter.Bodies

class Barrier {
    constructor(x, y, quantity) {
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.properties = { isStatic: true, render: {fillStyle: 'red'} };
        this.quantity = quantity;

        let barrier = [Bodies.rectangle(this.x, this.y, this.height, this.width, this.properties)];

        for (let i = 0; i <= this.quantity - 2; i++) {
            barrier.push(Bodies.rectangle(this.x, this.y + 50, this.height, this.width, this.properties));
            this.y += 50;
        }

        barrier.push(Bodies.rectangle(this.x, this.y + 50, this.height, this.width, this.properties));
        return (barrier);
    }
}

export default Barrier;