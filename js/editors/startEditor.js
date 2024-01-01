class StartEditor extends MarkingEditor{
    constructor(viewport, world){
        super(viewport, world, world.laneGuides);
        // world.graph.segments
    }

    createMarking(center, directionVector){
        
        return new Start(
            center,
            directionVector,
            this.world.roadWidth/2,
            this.world.roadWidth/2
        );
    }
    
}