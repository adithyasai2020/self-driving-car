class GraphEditor{
    constructor(viewport, graph){
        this.viewport = viewport;
        this.canvas = this.viewport.canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext('2d');
        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.#addEventListeners(this.graph);
    }
    dispose(){
        this.graph.dispose();
        this.selected = null;
        this.hovered = null;
    }
    display(){
        this.graph.draw(this.ctx);
        if(this.hovered){
            this.hovered.draw(this.ctx, {fill:true});
        }
        if(this.selected){
            const intent = this.hovered ? this.hovered:this.mouse;
            new Segment(this.selected, intent).draw(ctx, {dash:[3, 3]});
            this.selected.draw(this.ctx, {outline:true});
        }
    }
    #addEventListeners(){
        this.canvas.addEventListener('mousedown', (event)=>{
            if(event.button == 2){  //right click
                if(this.selected){
                    this.selected = null;
                }
                else if(this.hovered){
                    this.graph.removePoint(this.hovered);
                    if(this.selected == this.hovered){
                        this.selected = null;
                    }
                    this.hovered = null;
                }
                
            }
            if(event.button == 0){  // left click
                this.mouse = this.viewport.getMouse(event);
                this.hovered = getNearestPoint(this.mouse, this.graph.points, 15);
                if(this.hovered){
                    if(this.selected){
                        this.graph.tryAddSegment(new Segment(this.selected, this.hovered));
                    }
                    this.selected = this.hovered;
                    this.dragging = true;
                    return;
                }
                this.graph.addPoint(this.mouse);
                if(this.selected){
                    this.graph.tryAddSegment(new Segment(this.selected, this.mouse));
                }
                this.selected = this.mouse;
                this.hovered = this.mouse;
            }
            
          });
        this.canvas.addEventListener('mousemove', (event)=>{
            this.mouse = this.viewport.getMouse(event, true);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 10*this.viewport.zoom);
            if(this.dragging == true){
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
        });
        this.canvas.addEventListener('contextmenu', (event)=>{
            event.preventDefault();
        });
        this.canvas.addEventListener('mouseup', ()=>{
            this.dragging = false;
        })
    }
    


    
}