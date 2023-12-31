class World{
    constructor(graph, roadWidth = 100, roundness = 10){
        this.graph = graph;
        this.roadWidth = roadWidth;
        this.roundness = roundness;
        this.envelopes = [];
        this.roadBorders = [];
        this.generate();
    }
    generate(){
        
        this.envelopes.length = 0;
        for(const seg of this.graph.segments){
            this.envelopes.push(
                new Envelope(seg, this.roadWidth, this.roundness)
            )
        }
        this.roadBorders = Polygon.union(this.envelopes.map((e)=>e.poly));

    }
    draw(ctx){
        if(this.graph.points.length<2){
            return;
        }
        for(const env of this.envelopes){
            env.draw(ctx, {fill:"#BBB", stroke : "#BBB", lineWidth : 15});
        }
        for(const seg of this.graph.segments){
            // console.log("came here")
            seg.draw(ctx, {color:"white", width : 4, dash : [10, 10]})
        }
        for(const seg of this.roadBorders){
            seg.draw(ctx, {color: "white", width : 4});
        }
        
    }
}