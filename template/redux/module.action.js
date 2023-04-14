import {getEntity} from "../utils.js";

function getRows(entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
export const fetch${it.pascalPlural} = createAction('${it.single}/fetch${it.pascalPlural}');
export const fetch${it.pascalSingle} = createAction('${it.single}/fetch${it.pascalSingle}');
export const create${it.pascalSingle} = createAction('${it.single}/create${it.pascalSingle}');
export const update${it.pascalSingle} = createAction('${it.single}/update${it.pascalSingle}');
export const delete${it.pascalSingle} = createAction('${it.single}/delete${it.pascalSingle}');
export const search${it.pascalPlural} = createAction('${it.single}/search${it.pascalPlural}');
        `);
    });

    return arr.join("");
}

export default function getActions(module){
    const entities = module.entities.map(it => {
        return getEntity(it);
    });

    const rows = getRows(entities);
   
    return `
import { createAction } from '@reduxjs/toolkit'
${rows}
    `;
}
