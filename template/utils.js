import pascalcase from 'pascalcase';
import pluralize from 'pluralize';
import { constantCase } from 'constant-case';

export function getEntity(entity){
    const single = entity;
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