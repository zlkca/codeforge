
import pascalcase from 'pascalcase';
import {getEntity} from '../utils.js';

function getInitalState(entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
    ${it.plural}: [],
    ${it.single}: null,
    selected${it.pascalSingle}Id: null,
        `);
    });

    return arr.join("");
}

function getActions(entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
    fetch${it.pascalPlural},
    fetch${it.pascalSingle},
    create${it.pascalSingle},
    update${it.pascalSingle},
    delete${it.pascalSingle},
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
        fetch${it.pascalPlural}: (state) => {
            state = { ...state, loading: true};
        },
        fetch${it.pascalSingle}: (state) => {
            state = { ...state, loading: true};
        },
        create${it.pascalSingle}: (state) => {
            state = { ...state, loading: true};
        },
        update${it.pascalSingle}: (state) => {
            state = { ...state, loading: true};
        },
        delete${it.pascalSingle}: (state) => {
            state = { ...state, loading: true};
        },
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
            const list = [action.payload, ...state.${it.plural}];
            state.${it.plural} = list;
        },
        update${it.pascalSingle}Success: (state, action) => {
            state.loading = false;
            state.${it.single} = action.payload;
            const list = getUpdatedList(state.${it.plural}, action.payload);
            state.${it.plural} = list;
        },
        delete${it.pascalSingle}Success: (state, action) => {
            state.loading = false;
            state.${it.single} = null;
            const list = state.${it.plural}.filter(it => it._id !== action.payload._id);
            state.${it.plural} = list;
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

    return `
import { createSlice } from '@reduxjs/toolkit'

function getUpdatedList(item, list){
    const newList = [];
    list.forEach(it => {
        if(it._id === item._id){
            newList.push(item);
        }else{
            newList.push(it);
        }
    });
    return newList;
}

export const initial${pascalSingle}State = {
    ${initialState}
}

export const ${module.name}Slice = createSlice({
    name: '${module.name}',
    initialState: initial${pascalSingle}State,
    reducers: {
        ${reducers}
    },
})

export const {
    ${actions}
} = ${module.name}Slice.actions;

export default ${module.name}Slice.reducer;
    `
}