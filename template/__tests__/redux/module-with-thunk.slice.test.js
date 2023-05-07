import pascalcase from 'pascalcase';
import {getEntity} from '../../utils.js';

function getJestMock(module, entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
        fetch${it.pascalPlural}: jest.fn(),
        fetch${it.pascalSingle}: jest.fn(),
        create${it.pascalSingle}: jest.fn(),
        update${it.pascalSingle}: jest.fn(),
        delete${it.pascalSingle}: jest.fn(),
        search${it.pascalPlural}: jest.fn(),
        `)
    });

    return `
    jest.mock('../../services/${module}API', () => ({
        ${module}API: {
            ${arr.join("")}
        }
    }))
    `
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


function getTests(module, entity){
    const arr = [];
    ['fetch', 'search'].forEach(op => {
        arr.push(
        `
        describe('${op}${entity.pascalPlural}', () => {
            const listData = ['mock data'];
            it('should dispatch the correct actions and update the store state when ${op}ing ${entity.plural} succeeds', async () => {
                ${module}API.${op}${entity.pascalPlural}.mockResolvedValueOnce({ data: listData });
                const store = configureStore({ reducer: ${module}Slice.reducer });
                await store.dispatch(${op}${entity.pascalPlural}());
    
                const actions = store.getActions();
                expect(actions[0].type).toEqual(${op}${entity.pascalPlural}.pending.type);
                expect(actions[1].type).toEqual(${op}${entity.pascalPlural}.fulfilled.type);
                expect(actions[1].payload).toEqual(listData);
    
                expect(store.getState()).toEqual({ data: ['mock data'] });
    
                const state = store.getState();
                expect(state.${module}.${entity.plural}).toEqual(listData);
                expect(state.${module}.status).toEqual('succeeded');
            });
    
            it('should dispatch the correct actions and update the store state when ${op}ing ${entity.plural} fails', async () => {
                const errorMessage = 'Failed to ${op} ${entity.plural}';
                ${module}API.${op}${entity.pascalPlural}.mockRejectedValueOnce(new Error(errorMessage));
          
                const store = configureStore({ reducer: ${module}Slice.reducer });
                await store.dispatch(${op}${entity.pascalPlural}());
          
                const actions = store.getActions();
                expect(actions[0].type).toEqual(${op}${entity.pascalPlural}.pending.type);
                expect(actions[1].type).toEqual(${op}${entity.pascalPlural}.rejected.type);
                expect(actions[1].error.message).toEqual(errorMessage);
          
                const state = store.getState();
                expect(state.${module}.${entity.plural}).toEqual([]);
                expect(state.${module}.status).toEqual('failed');
              });
        });
        `
        )
    });
    
    ['create', 'fetch', 'update', 'delete'].forEach(op => {
        arr.push(
        `
        describe('${op}${entity.pascalSingle}', () => {
            const listData = ['mock data'];
            it('should dispatch the correct actions and update the store state when ${op}ing ${entity.single} succeeds', async () => {
                ${module}API.${op}${entity.pascalSingle}.mockResolvedValueOnce({ data: listData });
                const store = configureStore({ reducer: ${module}Slice.reducer });
                await store.dispatch(${op}${entity.pascalSingle}());
    
                const actions = store.getActions();
                expect(actions[0].type).toEqual(${op}${entity.pascalSingle}.pending.type);
                expect(actions[1].type).toEqual(${op}${entity.pascalSingle}.fulfilled.type);
                expect(actions[1].payload).toEqual(listData);
    
                expect(store.getState()).toEqual({ data: ['mock data'] });
    
                const state = store.getState();
                expect(state.${module}.${entity.single}).toEqual(listData);
                expect(state.${module}.status).toEqual('succeeded');
            });
    
            it('should dispatch the correct actions and update the store state when ${op}ing ${entity.single} fails', async () => {
                const errorMessage = 'Failed to ${op} ${entity.single}';
                ${module}API.${op}${entity.pascalSingle}.mockRejectedValueOnce(new Error(errorMessage));
          
                const store = configureStore({ reducer: ${module}.reducer });
                await store.dispatch(${op}${entity.pascalSingle}());
          
                const actions = store.getActions();
                expect(actions[0].type).toEqual(${op}${entity.pascalSingle}.pending.type);
                expect(actions[1].type).toEqual(${op}${entity.pascalSingle}.rejected.type);
                expect(actions[1].error.message).toEqual(errorMessage);
          
                const state = store.getState();
                expect(state.${module}.${entity.single}).toEqual([]);
                expect(state.${module}.status).toEqual('failed');
              });
        });
        `
        )
    });

    return arr.join("");
}

function getTestSuite(module, entities){
    
    const arr = [];
    entities.forEach(it => {
        const tests = getTests(module, it);
        arr.push(tests);
    })
    
    return arr.join("");
}

// import { configureStore } from '@reduxjs/toolkit';
// ${importServices}
// ${jestMock}

// describe('${module}Slice', () => {
//     afterEach(() => {
//         jest.resetAllMocks();
//     })

//     ${suite}
// })

export default function getSliceTestWithThunk(module){
    const entities = module.entities.map(it => {
        return getEntity(it);
    });
    const importServices = getImportServices(entities);
    const jestMock = getJestMock(module.name, entities);
    const suite = getTestSuite(module.name, entities);
    return ``
}
