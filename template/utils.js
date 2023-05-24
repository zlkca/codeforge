import pascalcase from 'pascalcase';
import pluralize from 'pluralize';
import { constantCase } from 'constant-case';

export function getEntity(entity){
    const single = entity.name;
    const plural = pluralize(single);
  
    const pascalSingle = pascalcase(single, {pascalCase: true});
    const pascalPlural = pascalcase(plural, {pascalCase: true});
    const constSingle = constantCase(single);
    const constPlural = constantCase(plural);

    return {single, plural, pascalSingle, pascalPlural, constSingle, constPlural};
}

export function getUpdatedListFunc(){
    return `
function getUpdateList(item, list){
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
    `
}

export function getImportServices(entities){
    const importServiceArray = [];
    
    entities.forEach(it => {
        importServiceArray.push(`
import { ${it.single}API } from '../../services/${it.single}API';
    `);
    });

    return importServiceArray.join("");
}

export function getImportThunks(moduleName, entities){
    const arr = [];
    
    entities.forEach(it => {
        arr.push(`
    fetch${it.pascalPlural},
    fetch${it.pascalSingle},
    create${it.pascalSingle},
    update${it.pascalSingle},
    delete${it.pascalSingle},
    search${it.pascalPlural},`);
    });

    return `import { ${arr.join("")} } from './${moduleName}Slice'`;
}