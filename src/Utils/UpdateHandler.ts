import {SVGElementType} from '../Meta/SVGElementType';

export default class UpdateHandler {
    static update (svgType: SVGElementType, id: string, data: any) {
        let element = document.getElementById(`#${id}`);
        if (element == undefined) {
            console.error("Element doesn't exist!");
            return;
        }

        if (element.tagName.toLowerCase() != svgType) {
            console.error(`Wrong SVGElement!\nExpected = ${svgType}, Found = ${element.tagName.toLowerCase()}`);
            return;
        }

        for (let attrib in data) {
            element.setAttribute(attrib, data[attrib]);
        }
    }
}