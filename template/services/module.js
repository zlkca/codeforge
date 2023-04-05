
import pascalcase from 'pascalcase';
import pluralize from "pluralize";


export default function getService(module){
    const single = module.name;
    const plural = pluralize(single);
  
    const pascalSingle = pascalcase(single, {pascalCase: true});
    const pascalPlural = pascalcase(plural, {pascalCase: true});
  
    return `
import {get, post, put, del} from './http';
import { buildApiUrlRdb, buildApiUrlNonsql } from './queryString';

export const fetch${pascalPlural} = async (query, optional) => {
    const url = buildApiUrlNonsql('/${plural}', query, optional);
    return await get(url);
}

export const fetch${pascalSingle} = async (id, optional) => {
    const url = buildApiUrlNonsql('/${plural}', id, optional);
    return await get(url);
}

export const create${pascalSingle} = async (data) => {
    const url = buildApiUrlNonsql('/${plural}');
    return await post(url, data);
}

export const update${pascalSingle} = async (id, data) => {
    const url = buildApiUrlNonsql('/${plural}', id);
    return await put(url, data);
}

export const delete${pascalSingle} = async (id) => {
    const url = buildApiUrlNonsql('/${plural}', id);
    return await del(url);
}

export const search${pascalPlural} = async (query) => {
    const url = buildApiUrlRdb('/search/${plural}');
    return await post(url, query);
}
`
}
