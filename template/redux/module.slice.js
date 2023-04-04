import pascalcase from 'pascalcase';
import pluralize from "pluralize";


export default function getSlice(module){
    const single = module;
    const plural = pluralize(single);
  
    const pascalSingle = pascalcase(single, {pascalCase: true});
    const pascalPlural = pascalcase(plural, {pascalCase: true});
  
    return `
import { createSlice } from '@reduxjs/toolkit'

export const initial${pascalSingle}State = {
    ${single}: {
        _id: '',
        created:'',
        updated: ''
    },
    ${plural}: [],
}

export const ${single}Slice = createSlice({
    name: '${single}',
    initialState: initial${pascalSingle}State,
    reducers: {
        fetch${pascalPlural}: (state) => {
            state = { ...state, loading: true};
        },
        fetch${pascalSingle}: (state) => {
            state = { ...state, loading: true};
        },
        set${pascalPlural}: (state, action) => {
            state.loading = false;
            state.${plural} = action.payload;
        },
        set${pascalSingle}: (state, action) => {
            state.loading = false;
            state.${single} = action.payload;
        },
    },
})

export const {
    fetch${pascalPlural},
    fetch${pascalSingle},
    set${pascalPlural},
    set${pascalSingle},
} = ${single}Slice.actions;

export default ${single}Slice.reducer;
    `
}