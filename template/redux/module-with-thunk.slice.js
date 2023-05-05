import pascalcase from 'pascalcase';
import {getEntity} from '../utils.js';

function getInitalState(entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
    ${it.plural}: [],
    ${it.single}: null,
    selected${it.pascalSingle}Id: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null
        `);
    });

    return arr.join("");
}

// function getImportThunks(module, entities){
//     const arr = [];

//     entities.forEach(it => {
//         arr.push(
//             `
//             create${it.pascalSingle},
//             fetch${it.pascalPlural},
//             fetch${it.pascalSingle},
//             search${it.pascalPlural},
//             update${it.pascalSingle},
//             delete${it.pascalSingle}
//             `
//         );
//     })

//     return arr.join(",");
// }

export default function getSliceWithThunk(module){
    const entities = module.entities.map(it => {
        return getEntity(it);
    });
    const initialState = getInitalState(entities);

    const pascalSingle = pascalcase(module.name, {pascalCase: true});

    return `
import { createSlice } from '@reduxjs/toolkit';
import { ${module.name}ThunkReducers } from './${module.name}.thunk';

export const initial${pascalSingle}State = {
    ${initialState}
}

export const ${module.name}Slice = createSlice({
    name: '${module.name}',
    initialState: initial${pascalSingle}State,
    reducers: {
        
    },
    extraReducers: ${module.name}ThunkReducers
})

export default ${module.name}Slice.reducer;
    `
}
