import {getEntity} from "../utils.js";

function getRows(entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
    export const select${it.pascalPlural} = (state) => state.${it.single}? state.${it.single}.${it.plural} : [];
    export const select${it.pascalSingle} = (state) => state.${it.single}? state.${it.single}.${it.single} : null;
        `);
    });

    return arr.join("");
}

export default function getSelector(module){
    const entities = module.entities.map(it => {
        return getEntity(it);
    });

    const rows = getRows(entities);
   
    return `${rows}`;
}
