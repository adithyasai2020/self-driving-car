class Tree{
    constructor(center, size, heightCoeff = 0.2){
        this.center = center;
        this.size = size;
        this.heightCoeff = heightCoeff;
        this.base = this.#generateLevel(center, size);
    }


    #generateLevel(point, size){
        const points = [];
        const rad = size/2;
        for(let a = 0; a <= Math.PI * 2; a += Math.PI / 16){
            const kindOfRandom = Math.cos( ( (a + this.center.x) * size) % 17) ** 2;
            const noisyRad = rad *  lerp(0.5, 1, kindOfRandom);
            //JavaScript is a bitch, it has no concept of generating random numbers with some fixed seed!
            points.push(translate(point, a, noisyRad));
        }
        return new Polygon(points);
    }

    draw(ctx, viewPoint){
        const diff = scale(subtract(this.center, viewPoint), this.heightCoeff);
        // this.center.draw(ctx, {size:this.size, color:"green"});
        const top = add(this.center, diff);
        const levelCount = 7;
        for(let level = 0;level<levelCount;level++){
            const t = level/(levelCount - 1);
            const point = lerp2D(this.center, top, t);
            const color = "rgba(30,"+lerp(50, 200, t) + ",70";
            const size = lerp(this.size, 20, t);
            const poly = this.#generateLevel(point, size);
            poly.draw(ctx, {fill : color, stroke : "rgba(0,0,0,0)"});
        }
    }
    
}