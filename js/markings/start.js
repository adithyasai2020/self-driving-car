class Start extends Marking{
    constructor(center, directionVector, width, height){
        super(center, directionVector, width, height);
        this.img = new Image();
        this.img.src = "car.png";
    }
    draw(ctx){
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(  Math.atan2(this.directionVector.y, this.directionVector.x)  - Math.PI/2 );
        ctx.scale(-1, -1);
        ctx.drawImage(this.img, -this.img.width/2, -this.img.height/2)

        ctx.restore();
    }
}