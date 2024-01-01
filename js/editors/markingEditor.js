class MarkingEditor{
    constructor(viewport, world, targetSegments){
        this.viewport = viewport;
        this.targetSegments = targetSegments;
        this.world = world;
        this.canvas = viewport.canvas;
        this.ctx = this.canvas.getContext('2d');
        this.mouse = null;
        this.intent = null;
        this.markings = world.markings;
    }

    // to be overwritten by child classes
    createMarking(center, directionVector){
        return center;
    }

    
    enable(){
        
        this.#addEventListeners();
    }
    disable(){
        this.#removeEventListeners();
    }
    #removeEventListeners(){

        this.canvas.removeEventListener('mousedown', this.boundMouseDown);
        this.canvas.removeEventListener('mousemove', this.boundMouseMove);
        this.canvas.removeEventListener('contextmenu', this.boundDefault);


    }
    dispose(){
        this.graph.dispose();
    }
    display(){
        if(this.intent){
            this.intent.draw(this.ctx);
        }
    }


    #addEventListeners(){
        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
        this.boundDefault = (event) => event.preventDefault();
        this.canvas.addEventListener('mousedown', this.boundMouseDown);
        this.canvas.addEventListener('mousemove', this.boundMouseMove);
        this.canvas.addEventListener('contextmenu', this.boundDefault);
    }

    #handleMouseDown(event){
        
        // if(event.button == 2){  //right click
        //     if(this.selected){
        //         this.selected = null;
        //     }
        //     else if(this.hovered){
        //         this.graph.removePoint(this.hovered);
        //         if(this.selected == this.hovered){
        //             this.selected = null;
        //         }
        //         this.hovered = null;
        //     }
            
        // }
        // if(event.button == 0){  // left click
        //     this.mouse = this.viewport.getMouse(event);
        //     this.hovered = getNearestPoint(this.mouse, this.graph.points, 15);
        //     if(this.hovered){
        //         if(this.selected){
        //             this.graph.tryAddSegment(new Segment(this.selected, this.hovered));
        //         }
        //         this.selected = this.hovered;
        //         this.dragging = true;
        //         return;
        //     }
        //     this.graph.addPoint(this.mouse);
        //     if(this.selected){
        //         this.graph.tryAddSegment(new Segment(this.selected, this.mouse));
        //     }
        //     this.selected = this.mouse;
        //     this.hovered = this.mouse;
        // }

        if(event.button == 0){ //left click
            if(this.intent){
                this.markings.push(this.intent);
                this.intent = null;
            }
        }
        if(event.button == 2){ //right click
            for(let i = 0;i<this.markings.length;i++){
                const poly = this.markings[i].poly;
                if(poly.containsPoint(this.mouse)){
                    this.markings.splice(i, 1);
                    break;
                }
            }
        }
        
      
    }

    #handleMouseMove(event){
        
        this.mouse = this.viewport.getMouse(event, true);
        const seg = getNearestSegment(
            this.mouse, 
            this.targetSegments, 
            10*this.viewport.zoom
        );
        if(seg){
            const proj = seg.projectionPoint(this.mouse);
            if(proj.offset >= 0 && proj.offset <= 1){
                // this.intent = proj.point;
                this.intent = this.createMarking(
                    proj.point, 
                    seg.directionVector(),
                );
            }
            else{
                this.intent = null;
            }
        }
        else{
            this.intent = null;
        }
        

    }
    


    
}