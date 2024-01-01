class Marking{
    constructor(center, directionVector, width, height){
        this.center = center;
        this.directionVector = directionVector;
        this.width = width;
        this.height = height;
        this.support = new Segment(
            translate(this.center, Math.atan2(directionVector.y, directionVector.x), this.height/2),
            translate(this.center, Math.atan2(directionVector.y, directionVector.x) - Math.PI, this.height/2)
        );
        this.poly = new Envelope(this.support, width, 0).poly;
    }
    draw(ctx){
        this.poly.draw(ctx);
        
    }
}