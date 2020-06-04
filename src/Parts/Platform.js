import Matter from "matter-js";

let Bodies = Matter.Bodies

class Platform {
    constructor(x, y, quantity) {
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.properties = { isStatic: true, };
        this.quantity = quantity;

        let platform = [Bodies.rectangle(this.x, this.y, this.height, this.width, this.properties)];

        for (let i = 0; i <= this.quantity - 2; i++) {
            platform.push(Bodies.rectangle(this.x + 50, this.y, this.height, this.width, this.properties));
            this.x += 50;
        }

        platform.push(Bodies.rectangle(this.x + 50, this.y, this.height, this.width, this.properties));
        return (platform);
    }

}

export default Platform;
