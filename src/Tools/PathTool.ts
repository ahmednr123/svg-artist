import Point from '../Meta/Point';

enum PathActionType {
    Move = "M",
    Line = "L",
    Curve = "C",
    Smooth = "S"
}

interface Path {
    id: string,
    root: PathActionFragment,
    points: {[point_id:string]: Point},
    curve_points: {[point_id:string]: Point}
}

interface PathActionFragment {
    action: PathActionType,
    point_arr: Array<Point>,
    next: PathActionFragment,
    prev: PathActionFragment
}

export default class PathTool {
    static init () {
        document.addEventListener("mousedown", this.onMouseDown);
        document.addEventListener("mousemove", this.onMouseMove);
        document.addEventListener("mouseup", this.onMouseUp);
    }

    static destroy () {
        document.removeEventListener("mousedown", this.onMouseDown);
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("mouseup", this.onMouseUp);
    }

    static onSelect (id: string) {

    }

    private static onMouseDown (ev: MouseEvent) {
        if (ev.which == 1) {

        }
    }

    private static onMouseMove (ev: MouseEvent) {

    }

    private static onMouseUp (ev: MouseEvent) {

    }
}

class PathHandler {
    static Paths: {[key: string]: Path} = {};

    static create (point: Point): string {
        let path: Path = this.createPath();
        path.root = this.createActionFragment(PathActionType.Move, [point]);
        path.points[point.id] = point;
        path.curve_points[point.id] = {id: point.id, active: false, x: point.x, y: point.y}; // THIS IS DONE TO AVOID POITING TO THE point OBJECT

        this.Paths[path.id] = path;

        return path.id;
    }

    static add (id: string, point: Point) {
        if (!(id in this.Paths)) {
            console.error(`Path [id="${id}"] Not Found!`);
            return;
        }

        let action = PathActionType.Line;
        let point_arr = [point];

        let temp = this.Paths[id].root;
        while (temp.next != null)
            temp = temp.next;

        let prev_point = this.getPoint(temp);
        let curve_point = this.Paths[id].curve_points[point.id];
        let prev_curve_point = this.Paths[id].curve_points[prev_point.id];
        if (prev_curve_point.active) {
            if (temp.action == PathActionType.Move) {
                action = PathActionType.Curve;
                point_arr.unshift(curve_point);
                point_arr.unshift(prev_curve_point);
            } else if (temp.action == PathActionType.Curve || temp.action == PathActionType.Smooth) {
                action = PathActionType.Smooth;
                point_arr.unshift(curve_point);
            } else if (temp.action == PathActionType.Line) {
                let temp_point_id = temp.point_arr[0].id;
                temp.action = PathActionType.Curve;
                temp.point_arr.unshift(this.Paths[id].curve_points[temp_point_id])
                temp.point_arr.unshift(this.Paths[id].curve_points[this.getPoint(temp.prev).id])
                
                action = PathActionType.Smooth;
                point_arr.unshift(curve_point);
            }
        }

        let ac_fragment = this.createActionFragment(action, point_arr);
        ac_fragment.prev = temp;
        temp.next = ac_fragment;
    }

    static getSVG (path_id: string): string {
        let path_data = ""

        let temp = this.Paths[path_id].root;
        while (temp != null) {
            path_data += temp.action + " ";
            for (let point of temp.point_arr)
                path_data += `${point.x} ${point.y}, `;
            
            temp = temp.next;
        }

        return `<path id="${path_id}" d="${path_data}" stroke="black" fill="none"/>`;
    }

    private static 
    getPoint (fragment: PathActionFragment): Point
    {
        switch (fragment.action) {
            case PathActionType.Line:
            case PathActionType.Move:
                return fragment.point_arr[0];
            case PathActionType.Smooth:
                return fragment.point_arr[1];
            case PathActionType.Curve:
                return fragment.point_arr[2];
        }
    }

    private static 
    createActionFragment (type: PathActionType, point_arr: Array<Point>): PathActionFragment 
    {
        return {action: type, point_arr, next: null, prev: null};
    }

    private static 
    createPath (): Path 
    {
        return {id: makeid(5), root: null, points: {}, curve_points: {}};
    }
}

function makeid (length: number): string {
    var result          =   '';
    var characters      =   'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var onlyCharacters  =   '_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    result += onlyCharacters.charAt(Math.floor(Math.random() * onlyCharacters.length));

    for ( var i = 0; i < length-1; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}