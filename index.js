
import { program } from 'commander';
import * as fs from 'fs';
import pascalcase from 'pascalcase';

import getSlice from './template/redux/module.slice.js';
import getSelector from './template/redux/module.selector.js';
import getService from './template/services/module.js';
import getListPage from './template/pages/list.js';
import { modelMap } from './template/model/index.js';

function add(module){
  const pascalSingle = pascalcase(module, {pascalCase: true});

  const reduxSlice = getSlice(module);
  const reduxSelector = getSelector(module);
  const service = getService(module);

  const model = modelMap[module];
  const listPage = getListPage(module, model);

  console.log(module);
  const dirRedux = `./redux/${module}`;
  const dirServices = `./services`;
  const dirPages = `./pages`;
  try{
    if(!fs.existsSync(dirRedux)){
      fs.mkdirSync(dirRedux, null, true); 
    }
    if(!fs.existsSync(dirServices)){
      fs.mkdirSync(dirServices, null, true); 
    }
    if(!fs.existsSync(dirPages)){
      fs.mkdirSync(dirPages, null, true); 
    }
    fs.writeFileSync(`${dirRedux}/${module}.slice.js`, reduxSlice);
    console.log(`${dirRedux}/${module}.slice.js created!`);
    fs.writeFileSync(`${dirRedux}/${module}.selector.js`, reduxSelector);
    console.log(`${dirRedux}/${module}.selector.js created!`);
    fs.writeFileSync(`${dirServices}/${module}.js`, service);
    console.log(`${dirServices}/${module}.js created!`);

    fs.writeFileSync(`${dirPages}/${pascalSingle}ListPage.js`, listPage);
    console.log(`${dirServices}/${pascalSingle}ListPage.js created!`);
  }catch(e){
    console.log(e);
  }
}

program
  .command("add <module>")
  .description("add module for redux, pages, services and restful api")
  // .option('--first')
  // .option('-m, --module <module>')
  .action(add);

program.parse();


