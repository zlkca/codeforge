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

function getImportServices(entities){
    const importServiceArray = [];
    
    entities.forEach(it => {
        importServiceArray.push(`
import { ${it.single}API } from '../../services/${it.single}API';
    `);
    });

    return importServiceArray.join("");
}

function getThunkRows(module, entities){
    const arr = [];

    entities.forEach(it => {
        arr.push(`
export const create${it.pascalSingle} = createAsyncThunk(
    "${it.single}/create${it.pascalSingle}",
    async (body, thunkAPI) => {
        const rsp = await ${it.single}API.create${it.pascalSingle}(body)
        return rsp.data
    }
    )

export const fetch${it.pascalPlural} = createAsyncThunk(
    "${it.single}/fetch${it.pascalPlural}",
    async (query, thunkAPI) => {
        const rsp = await ${it.single}API.fetch${it.pascalPlural}(query)
        return rsp.data
    }
    )

export const fetch${it.pascalSingle} = createAsyncThunk(
    "${it.single}/fetch${it.pascalSingle}",
    async (id, thunkAPI) => {
        const rsp = await ${it.single}API.fetch${it.pascalSingle}(id)
        return rsp.data
    }
    )

export const search${it.pascalPlural} = createAsyncThunk(
    "${it.single}/search${it.pascalPlural}",
    async (query, thunkAPI) => {
        const rsp = await ${it.single}API.search${it.pascalPlural}(query)
        return rsp.data
    }
    )

export const update${it.pascalSingle} = createAsyncThunk(
    "${it.single}/update${it.pascalSingle}",
    async ({id, updates}, thunkAPI) => {
        const rsp = await ${it.single}API.update${it.pascalSingle}(id, updates)
        return rsp.data
    }
    )

export const delete${it.pascalSingle} = createAsyncThunk(
    "${it.single}/delete${it.pascalSingle}",
    async (id, thunkAPI) => {
        const rsp = await ${it.single}API.delete${it.pascalSingle}(id)
        return rsp.data
    }
    )
          `);
    });
    return arr.join("");
    
}

function getExtraReducers(entities){
    
    const arr = [];

    entities.forEach(it => {
        arr.push(
       `.addCase(create${it.pascalSingle}.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(create${it.pascalSingle}.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.${it.plural}.push(action.payload)
    })
    .addCase(create${it.pascalSingle}.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
    })
    .addCase(fetch${it.pascalPlural}.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(fetch${it.pascalPlural}.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.${it.plural} = action.payload
    })
    .addCase(fetch${it.pascalPlural}.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
    })
    .addCase(fetch${it.pascalSingle}.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(fetch${it.pascalSingle}.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.${it.single} = action.payload
    })
    .addCase(fetch${it.pascalSingle}.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
    })
    .addCase(search${it.pascalPlural}.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(search${it.pascalPlural}.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.${it.plural} = action.payload
    })
    .addCase(search${it.pascalPlural}.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
    })
    .addCase(update${it.pascalSingle}.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(update${it.pascalSingle}.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.${it.single} = action.payload
    })
    .addCase(update${it.pascalSingle}.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
    })
    .addCase(delete${it.pascalSingle}.pending, (state, action) => {
        state.status = 'loading'
    })
    .addCase(delete${it.pascalSingle}.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const id = action.payload;
        state.${it.plural} = state.${it.plural}.filter(it => it.id !== id)
    })
    .addCase(delete${it.pascalSingle}.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error
    })
        `);
    });

    return arr.join("");
    
}


export default function getSliceWithThunk(module){
    const entities = module.entities.map(it => {
        return getEntity(it);
    });

    const importServices = getImportServices(entities);
    const initialState = getInitalState(entities);
    const thunkRows = getThunkRows(module, entities);
    const extraReducers = getExtraReducers(entities);

    const pascalSingle = pascalcase(module.name, {pascalCase: true});
    // const reducers = getReducers(entities);
    // const actions = getActions(entities);

    return `
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
${importServices}

export const initial${pascalSingle}State = {
    ${initialState}
}

${thunkRows}

export const ${module.name}ThunkReducers = (builder) => {
    builder
    ${extraReducers}
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
