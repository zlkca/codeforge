
import pascalcase from 'pascalcase';
import pluralize from "pluralize";


export default function getSelector(module){
    const single = module;
    const plural = pluralize(single);
  
    const pascalSingle = pascalcase(single, {pascalCase: true});
    const pascalPlural = pascalcase(plural, {pascalCase: true});
  
    return `
export const select${pascalPlural} = (state) => state.${single}? state.${single}.${plural} : [];
export const select${pascalSingle} = (state) => state.${single}? state.${single}.${single} : null;
`
}
