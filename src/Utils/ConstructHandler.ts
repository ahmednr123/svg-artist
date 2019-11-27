import {SVGElementType} from '../Meta/SVGElementType';

const PathAttribs: Array<string> =  ["d"]
const CircleAttribs: Array<string> =  ["cx", "cx", "r"]

export default class ConstructHandler {
    static construct (svgType: SVGElementType, id: string, data: any) {
        let isDataValid = validateData(svgType, data);

        if (!isDataValid){
            console.error(`Attributes required to create SVGElement:[${svgType}] are missing!`);
            return;
        }
        
        let element = null;

        switch (svgType) {
            case SVGElementType.Path:
                element = document.createElement("path");
                break;
            case SVGElementType.Circle:
                element = document.createElement("circle");
                break;
        }

        for (let attrib in data) {
            element.setAttribute(attrib, data[attrib]);
        }
    }
}

function validateData (svgType: SVGElementType, data: any) {
    switch (svgType) {
        case SVGElementType.Path:
            for (let key of PathAttribs) {
                if (!(key in data)) 
                    return false;
            }
            break;
        case SVGElementType.Circle:
            for (let key of CircleAttribs) {
                if (!(key in data)) 
                    return false;
            }
            break;
    }

    return true;
}