
import pascalcase from 'pascalcase';
import pluralize from "pluralize";


export default function getService(module){
    const single = module.name;
    const plural = pluralize(single);
  
    const pascalSingle = pascalcase(single, {pascalCase: true});
    const pascalPlural = pascalcase(plural, {pascalCase: true});
  
    return `
import {get, post, put, del} from './http';
import { buildApiUrl } from './utils';

export const ${single}API = {
    fetch${pascalPlural}: async (query) => {
        const url = buildApiUrl('/${plural}', query);
        return await get(url);
    },

    fetch${pascalSingle}: async (params) => {
        const url = buildApiUrl('/${plural}', params);
        return await get(url);
    },

    create${pascalSingle}: async (data) => {
        const url = buildApiUrl('/${plural}');
        return await post(url, data);
    },

    update${pascalSingle}: async (params, data) => {
        const url = buildApiUrl('/${plural}', params);
        return await put(url, data);
    },

    delete${pascalSingle}: async (params) => {
        const url = buildApiUrl('/${plural}', params);
        return await del(url);
    },

    search${pascalPlural}: async (query) => {
        const url = buildApiUrl('/search/${plural}');
        return await post(url, query);
    },
}
`
}
