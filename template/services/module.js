
import pascalcase from 'pascalcase';
import pluralize from "pluralize";


export default function getService(module){
    const single = module.name;
    const plural = pluralize(single);
  
    const pascalSingle = pascalcase(single, {pascalCase: true});
    const pascalPlural = pascalcase(plural, {pascalCase: true});
  
    return `
import {get, post, put, del} from './http';
import { buildApiUrlNonsql } from './queryString';

export const ${single}API = {
    fetch${pascalPlural}: async (query, optional) => {
        const url = buildApiUrlNonsql('/${plural}', query, optional);
        return await get(url);
    },

    fetch${pascalSingle}: async (id, optional) => {
        const url = buildApiUrlNonsql('/${plural}', id, optional);
        return await get(url);
    },

    create${pascalSingle}: async (data) => {
        const url = buildApiUrlNonsql('/${plural}');
        return await post(url, data);
    },

    update${pascalSingle}: async (id, data) => {
        const url = buildApiUrlNonsql('/${plural}', id);
        return await put(url, data);
    },

    delete${pascalSingle}: async (id) => {
        const url = buildApiUrlNonsql('/${plural}', id);
        return await del(url);
    },

    search${pascalPlural}: async (query) => {
        const url = buildApiUrlNonsql('/search/${plural}');
        return await post(url, query);
    },
}
`
}
