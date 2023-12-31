function getNearestPoint(loc, points, threshold = Number.MAX_SAFE_INTEGER){
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;
    for(const point of points){
        const dist = distance(loc, point);
        if(dist< minDist && dist < threshold){
            minDist = dist;
            nearest = point;
        }
    }
    return nearest;
}

function getNearestSegment(loc, segments, threshold = Number.MAX_SAFE_INTEGER){
    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;
    for(const seg of segments){
        const dist = seg.distanceToPoint(loc);
        if(dist< minDist && dist < threshold){
            minDist = dist;
            nearest = seg;
        }
    }
    return nearest;
}

function distance(p1, p2){
    return Math.hypot(p1.x-p2.x, p1.y- p2.y);
}


function average(p1, p2){
    return new Point((p1.x+p2.x)/2, (p1.y+p2.y)/2);
}


function add(p1, p2){
    return new Point(p1.x+p2.x, p1.y+p2.y);
}

function subtract(p1, p2){
    return new Point(p1.x-p2.x, p1.y-p2.y);
}
function scale(p1, scalar){
    return new Point(p1.x*scalar, p1.y*scalar);
}
function normalize(p){
    return scale(p, 1/magnitude(p));
}
function magnitude(p){
    return Math.hypot(p.x, p.y);
}
function translate(loc, angle, offset){
    return new Point(
        loc.x + Math.cos(angle)*offset,
        loc.y + Math.sin(angle)*offset
    );
}
function perpendicular(p){
    return new Point(-p.y, p.x);
}
function dot(a, b){
    return a.x*b.x + a.y*b.y;
}

function getIntersection(A, B, C, D){
    const tTop = (D.x - C.x)*(A.y-C.y) - (D.y - C.y)*(A.x - C.x);
    const uTop = (C.y - A.y)*(A.x - B.x) - (C.x - A.x)*(A.y - B.y);
    const bottom = (D.y - C.y)*(B.x - A.x) - (D.x - C.x)*(B.y - A.y);

    const eps = 0.000001;
    if(Math.abs(bottom)>eps){
        const t = tTop/bottom;
        const u = uTop/bottom;
        if(t >= 0 && t<=1 && u >= 0&& u <= 1){
            return {
                x : lerp(A.x, B.x, t),
                y : lerp(A.y, B.y, t),
                offset : t
            }
        }
    }
    return null;
}
function lerp(a, b, t){
    return a + (b - a) * t;
}

function lerp2D(A, B, t){
    return new Point(lerp(A.x, B.x, t), lerp(A.y, B.y, t));
}

function getRandomColor(){
    const hue = 209 + Math.random()*260;
    return "hsl(" + hue + ", 100%, 60%";
}