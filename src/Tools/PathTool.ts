import Point, { createPoint } from '../Meta/Point';
import {makeid} from '../Utils/GeneralUtils';

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
    static ActivePath: Path = null;

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

    static onMouseDown (ev: MouseEvent) {
        if (ev.which == 1) {
            let point: Point = createPoint(ev.clientX, ev.clientY);
            if (this.ActivePath == null) {
                this.ActivePath = PathHandler.create(point);
            } else {
                PathHandler.add(this.ActivePath, point);
            }
        }
    }

    static onMouseMove (ev: MouseEvent) {

    }

    static onMouseUp (ev: MouseEvent) {

    }
}

class PathHandler {
    static Paths: {[key: string]: Path} = {};

    static create (point: Point): Path {
        let path: Path = this.createPath();
        path.root = this.createActionFragment(PathActionType.Move, [point]);
        path.points[point.id] = point;
        path.curve_points[point.id] = {id: point.id, active: false, x: point.x, y: point.y}; // THIS IS DONE TO AVOID POITING TO THE point OBJECT

        this.Paths[path.id] = path;

        return path;
    }

    static add (path: Path, point: Point) {
        let action = PathActionType.Line;
        let point_arr = [point];

        let temp = path.root;
        while (temp.next != null)
            temp = temp.next;

        let prev_point = this.getPoint(temp);
        let curve_point = path.curve_points[point.id];
        let prev_curve_point = path.curve_points[prev_point.id];
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
                temp.point_arr.unshift(path.curve_points[temp_point_id])
                temp.point_arr.unshift(path.curve_points[this.getPoint(temp.prev).id])
                
                action = PathActionType.Smooth;
                point_arr.unshift(curve_point);
            }
        }

        let ac_fragment = this.createActionFragment(action, point_arr);
        ac_fragment.prev = temp;
        temp.next = ac_fragment;
    }

    static update (path_id: string, point: Point) {
        let path = this.Paths[path_id];

        if (point.id.charAt(1) == ':') {
            let curve_point_type = point.id.split(':')[0];
            let curve_point_id = point.id.split(':')[1];
            
            if (curve_point_type == 'A') {
                path.curve_points[curve_point_id].x = point.x;
                path.curve_points[curve_point_id].y = point.y;
            } else if (curve_point_type == 'B') {
                let base_point = path.points[curve_point_id];
                let mirror_point = getMirrorPoint(base_point, point);

                path.curve_points[curve_point_id].x = mirror_point.x;
                path.curve_points[curve_point_id].y = mirror_point.y;
            }
        } else {
            let diff_point: Point = {x: point.x - path.points[point.id].x, y: point.y - path.points[point.id].y};

            path.points[point.id].x = point.x;
            path.points[point.id].y = point.y;

            path.curve_points[point.id].x += diff_point.x;
            path.curve_points[point.id].y += diff_point.y;
        }
    }

    static getSVG (path: Path): string {
        let path_data = ""

        let temp = path.root;
        while (temp != null) {
            path_data += temp.action + " ";
            for (let point of temp.point_arr)
                path_data += `${point.x} ${point.y}, `;
            
            temp = temp.next;
        }

        return `<path id="${path.id}" d="${path_data}" stroke="black" fill="none"/>`;
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

function getMirrorPoint (base_point: Point, point: Point): Point {
    let mirror_point: Point = {x:null, y:null}

    mirror_point.x = 2 * base_point.x - point.x;
    mirror_point.y = 2 * base_point.y - point.y;

    return mirror_point;
}