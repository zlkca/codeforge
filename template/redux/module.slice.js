
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

function getActions(entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
    set${it.pascalPlural},
    set${it.pascalSingle},
    create${it.pascalSingle}Success,
    update${it.pascalSingle}Success,
    delete${it.pascalSingle}Success,
        `);
    });

    return arr.join("");
}


function getReducers(entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
        set${it.pascalPlural}: (state, action) => {
            state.loading = false;
            state.${it.plural} = action.payload;
        },
        set${it.pascalSingle}: (state, action) => {
            state.loading = false;
            state.${it.single} = action.payload;
        },
        create${it.pascalSingle}Success: (state, action) => {
            state.loading = false;
            state.${it.single} = action.payload;
            state.${it.plural} = [action.payload, ...state.${it.plural}];
        },
        update${it.pascalSingle}Success: (state, action) => {
            state.loading = false;
            state.${it.single} = action.payload;
            const index = state.${it.plural}.findIndex(it => it._id === action.payload._id);
            state.${it.plural}[index] = action.payload;
        },
        delete${it.pascalSingle}Success: (state, action) => {
            state.loading = false;
            state.${it.single} = null;
            state.${it.plural} = state.${it.plural}.filter(it => it._id !== action.payload._id);
        },
        `);
    });

    return arr.join("");
}

export default function getSlice(module){
    const entities = module.entities.map(it => {
        return getEntity(it);
    });

    const pascalSingle = pascalcase(module.name, {pascalCase: true});
    const initialState = getInitalState(entities);
    const reducers = getReducers(entities);
    const actions = getActions(entities);
    // const importActions = getImportActions(entities)
    // import { ${importActions}
// } from './${module.name}.action'
    return `
import { createSlice } from '@reduxjs/toolkit'
import { ${module.name}ThunkReducers } from './${module.name}.thunk.js'

export const initial${pascalSingle}State = {
    ${initialState}
}

export const ${module.name}Slice = createSlice({
    name: '${module.name}',
    initialState: initial${pascalSingle}State,
    reducers: {
        ${reducers}
    },
    extraReducers: ${module.name}ThunkReducers
})

export const {
    ${actions}
} = ${module.name}Slice.actions;

export default ${module.name}Slice.reducer;
    `
}