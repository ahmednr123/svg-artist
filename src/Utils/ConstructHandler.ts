import {SVGElementType} from '../Meta/SVGElementType';

export default class ConstructHandler {
    static construct (svgType: SVGElementType, id: string, data: any) {
        switch (svgType) {
            case SVGElementType.Path:
                break;
            case SVGElementType.Circle:
                break;
        }
    }
}