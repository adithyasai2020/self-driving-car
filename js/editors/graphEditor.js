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

    }
    enable(){
        
        this.#addEventListeners();
    }
    disable(){
        this.selected = null;
        this.hovered = null;
        this.#removeEventListeners();
    }
    #removeEventListeners(){

        this.canvas.removeEventListener('mousedown', this.boundMouseDown);
        this.canvas.removeEventListener('mousemove', this.boundMouseMove);
        this.canvas.removeEventListener('contextmenu', this.boundDefault);
        this.canvas.removeEventListener('mouseup', this.boundMouseUp);


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
        this.boundMouseDown = this.#handleMouseDown.bind(this);
        this.boundMouseMove = this.#handleMouseMove.bind(this);
        this.boundMouseUp = () => this.dragging = false;
        this.boundDefault = (event) => event.preventDefault();
        this.canvas.addEventListener('mousedown', this.boundMouseDown);
        this.canvas.addEventListener('mousemove', this.boundMouseMove);
        this.canvas.addEventListener('contextmenu', this.boundDefault);
        this.canvas.addEventListener('mouseup', this.boundMouseUp);
    }

    #handleMouseDown(event){
        
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
        
      
    }

    #handleMouseMove(event){
        
        this.mouse = this.viewport.getMouse(event, true);
        this.hovered = getNearestPoint(this.mouse, this.graph.points, 10*this.viewport.zoom);
        if(this.dragging == true){
            this.selected.x = this.mouse.x;
            this.selected.y = this.mouse.y;
        }

    }
    
    #handleMouseUp(){
        
        this.dragging = false;
        
    }

    #handleDefault(event){
        
        event.preventDefault();
        
    }

    
}