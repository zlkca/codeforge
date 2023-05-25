import {getEntity} from "../utils.js";

function getRows(moduleName, entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
    export const select${it.pascalPlural} = (state) => state.${moduleName}? state.${moduleName}.${it.plural} : [];
    export const select${it.pascalSingle} = (state) => state.${moduleName}? state.${moduleName}.${it.single} : null;
        `);
    });

    return arr.join("");
}

export default function getSelector(module){
    const entities = module.entities.map(it => {
        return getEntity(it);
    });

    const rows = getRows(module.name, entities);
   
    return `${rows}`;
}
