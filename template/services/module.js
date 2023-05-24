
import pascalcase from 'pascalcase';
import pluralize from "pluralize";
import { getEntity } from '../utils';

function getApiRequests(entity){
    return `
    fetch${entity.pascalPlural}: async (query) => {
        const url = buildApiUrl('/${entity.plural}', query);
        return await get(url);
    },

    fetch${entity.pascalSingle}: async (params) => {
        const url = buildApiUrl('/${entity.plural}', params);
        return await get(url);
    },

    create${entity.pascalSingle}: async (data) => {
        const url = buildApiUrl('/${entity.plural}');
        return await post(url, data);
    },

    update${entity.pascalSingle}: async (params, data) => {
        const url = buildApiUrl('/${entity.plural}', params);
        return await put(url, data);
    },

    delete${entity.pascalSingle}: async (params) => {
        const url = buildApiUrl('/${entity.plural}', params);
        return await del(url);
    },

    search${entity.pascalPlural}: async (query) => {
        const url = buildApiUrl('/search/${entity.plural}');
        return await post(url, query);
    },
    `
}

export default function getService(module){
    const single = module.name; 
    const reqs = [];
    
    module.entities.map(it => {
        const entity = getEntity(it);
        const req = getApiRequests(entity);
        reqs.push(req);
    });

    return `
import {get, post, put, del} from './http';
import { buildApiUrl } from './utils';

export const ${single}API = {
    ${reqs.join("")}
}
`
}
