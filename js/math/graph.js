class Graph{
    constructor(points = [], segments = []){
        this.points = points
        this.segments = segments
    }
    draw(ctx){
        for(const seg of this.segments){
            seg.draw(ctx);
        }
        for(const point of this.points){
            point.draw(ctx);
        }
    }
    dispose(){
        this.segments.length = 0;
        this.points.length = 0;
    }
    addPoint(point){
        this.points.push(point)
    }

    addSegment(segment){
        this.segments.push(segment);

    }

    tryAddSegment(seg){
        if(!this.containsSegment(seg)){
            this.addSegment(seg);
            
            return true;
        }
        return false;
    }
    getSegmentsWithPoint(point){
        var segs = []
        for(const seg of this.segments){
            if(seg.includes(point)){
                segs.push(seg);
            }
        }
        return segs;
    }

    removeSegment(seg){
        this.segments.splice(this.segments.indexOf(seg), 1);
    }
    removePoint(point){
        var segs = []
        // for(let i = 0;i<this.segments.length;i++){
        //     if(!this.segments[i].includes(point)){
        //         segs.push(this.segments[i]);
        //     }
        // }

        segs = this.segments.filter(seg=> !seg.includes(point) )

        this.segments = segs;
        this.points.splice(this.points.indexOf(point), 1);
    }

    tryAddPoint(point){
        if(!this.containsPoint(point)){
            this.addPoint(point);
            return true;
        }
        return false;
    }
    containsPoint(point){
        return this.points.find((p)=>p.equals(point))
    }
    containsSegment(seg){
        return this.segments.find((s)=>s.equals(seg));
    }
}