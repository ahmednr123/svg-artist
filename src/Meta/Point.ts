import {makeid} from '../Utils/GeneralUtils';

export default interface Point {
    id?: string,
    active?: boolean, 
    x: number, 
    y: number
}

export function createPoint (x: number, y: number): Point {
    return {id: makeid(5), x, y};
}