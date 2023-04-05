
function getImports(modules){
    const arr = [];
    
    modules.forEach(it => {
        arr.push(`import ${it}Reducer from '../redux/${it}/${it}.slice';`);
    });

    return arr.join("\n");
}

function getReducers(modules){
    const arr = [];
    
    modules.forEach(it => {
        arr.push(`
        ${it}: ${it}Reducer,`);
    });

    return arr.join("");
}

export default function getStore(modules){
    const imports = getImports(modules);
    const reducers = getReducers(modules);
    return `
import { configureStore } from '@reduxjs/toolkit';
${imports}

export default configureStore({
    reducer: {
    ${reducers}
    
    },
})    
    `;
}


