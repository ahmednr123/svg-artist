import {SVGElementType} from '../Meta/SVGElementType';

export default class UpdateHandler {
    static update (svgType: SVGElementType, id: string, data: any) {
        let element = document.getElementById(`#${id}`);
        let hoverable_element = document.getElementById(`#h:${id}`);
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
            hoverable_element.setAttribute(attrib, data[attrib]);
        }

        this.updateHoverableElement(svgType, hoverable_element);
    }

    static updateHoverableElement (svgType: SVGElementType, element: Element) {
        switch (svgType) {
            case SVGElementType.Path:
                element.setAttribute("stroke-width", "10");
                element.setAttribute("stroke", "transparent");
                break;
        }
    }
}