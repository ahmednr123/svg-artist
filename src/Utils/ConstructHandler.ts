import {SVGElementType} from '../Meta/SVGElementType';
import {SelectedTool} from '../Main'

const PathAttribs: Array<string> =  ["d"]
const CircleAttribs: Array<string> =  ["cx", "cx", "r"]

export default class ConstructHandler {
    static construct (svgType: SVGElementType, id: string, data: any) {
        let isDataValid = validateData(svgType, data);

        if (!isDataValid){
            console.error(`Attributes required to create SVGElement:[${svgType}] are missing!`);
            return;
        }
        
        let element = document.createElement(svgType);
        let hoverable_element = createHoverableElement(svgType, id, data);

        element.id = id;
        for (let attrib in data) {
            element.setAttribute(attrib, data[attrib]);
        }

        let v_use_element = document.createElement("use");
        v_use_element.id = "V:"+id;
        v_use_element.setAttribute("xlink:href", id);

        let h_use_element = document.createElement("use");
        h_use_element.id = "H:"+id;
        h_use_element.setAttribute("xlink:href", "h:" + id);
        
        document.querySelector("defs#objects").appendChild(element);
        document.querySelector("defs#objects").appendChild(hoverable_element);
        document.querySelector("g#visibles").appendChild(v_use_element);
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

function 
createHoverableElement (svgType: SVGElementType, id: string, data: any): Element 
{
    let element = document.createElement(svgType);
    element.id = "h:" + id;
    for (let attrib in data) {
        element.setAttribute(attrib, data[attrib]);
    }

    switch (svgType) {
        case SVGElementType.Path:
            element.setAttribute("stroke-width", "10");
            break;
    }

    element.addEventListener("mouseover", () => {
        let main_element = document.getElementById(`#${id}`);
        main_element.setAttribute("stroke", "blue");
    })

    element.addEventListener("mouseleave", () => {
        let main_element = document.getElementById(`#${id}`);
        main_element.setAttribute("stroke", SelectedTool.getAttribute(id, "stroke"));
    })

    element.addEventListener("click", () => {
        SelectedTool.onSelect(id);
    })

    return element;
}