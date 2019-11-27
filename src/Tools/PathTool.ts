import Point, { createPoint } from '../Meta/Point';
import {makeid} from '../Utils/GeneralUtils';
import Tool from './Tool'
import UpdateHandler from '../Utils/UpdateHandler';
import { SVGElementType } from '../Meta/SVGElementType';

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
    curve_points: {[point_id:string]: Point},
    attribs: {[key:string]:string}
}

interface PathActionFragment {
    action: PathActionType,
    point_arr: Array<Point>,
    next: PathActionFragment,
    prev: PathActionFragment
}

export default class PathTool implements Tool {
    private static instance: PathTool;

    private static ActivePath: Path = null;

    private constructor() {}
    
    public static getInstance(): PathTool {
        if (!PathTool.instance) {
            PathTool.instance = new PathTool();
        }

        return PathTool.instance;
    }

    public init () {
        document.addEventListener("mousedown", PathTool.onMouseDown);
        document.addEventListener("mousemove", PathTool.onMouseMove);
        document.addEventListener("mouseup", PathTool.onMouseUp);
    }

    public destroy () {
        document.removeEventListener("mousedown", PathTool.onMouseDown);
        document.removeEventListener("mousemove", PathTool.onMouseMove);
        document.removeEventListener("mouseup", PathTool.onMouseUp);
    }

    public getAttribute (path_id: string, attribute: string): string {
        return PathHandler.Paths[path_id].attribs[attribute];
    }

    public onSelect (id: string) {

    }

    public deSelect (id: string) {

    }

    public static onMouseDown (ev: MouseEvent) {
        if (ev.which == 1) {
            let point: Point = createPoint(ev.clientX, ev.clientY);
            if (this.ActivePath == null) {
                this.ActivePath = PathHandler.create(point);
            } else {
                PathHandler.add(this.ActivePath, point);
            }
        }
    }

    public static onMouseMove (ev: MouseEvent) {

    }

    public static onMouseUp (ev: MouseEvent) {

    }
}

class PathHandler {
    static Paths: {[key: string]: Path} = {};

    static create (point: Point): Path {
        let path: Path = this.createPath();
        path.root = this.createActionFragment(PathActionType.Move, [point]);
        path.points[point.id] = point;

        // THIS IS DONE TO AVOID POITING TO THE point OBJECT [Object Copy]
        path.curve_points[point.id] = {id: point.id, active: false, x: point.x, y: point.y};

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

        UpdateHandler.update(SVGElementType.Path, path_id, PathHandler.getAttribs(path));
    }

    static getAttribs (path: Path): {[key: string]:string} {
        let attribs: {[key: string]:string} = {}
        attribs.d = ""

        let temp = path.root;
        while (temp != null) {
            attribs.d += temp.action + " ";
            for (let point of temp.point_arr)
            attribs.d += `${point.x} ${point.y}, `;
            
            temp = temp.next;
        }

        attribs = concat(attribs, path.attribs);

        return attribs;
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
        return {id: makeid(10), root: null, points: {}, curve_points: {}, attribs: {stroke:"black", "stroke-width":"4", fill:"none"}};
    }
}

function getMirrorPoint (base_point: Point, point: Point): Point {
    let mirror_point: Point = {x:null, y:null}

    mirror_point.x = 2 * base_point.x - point.x;
    mirror_point.y = 2 * base_point.y - point.y;

    return mirror_point;
}

function concat(object1: {[key: string]:string}, object2: {[key: string]:string}) {
    for (var key in object2) {
        object1[key] = object2[key];
    }

    return object1;
}