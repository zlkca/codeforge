
import { program } from 'commander';
import * as fs from 'fs';
// import pascalcase from 'pascalcase';

import getActions from './template/redux/module.action.js';
import getThunks from './template/redux/module.thunk.js';

import getSlice from './template/redux/module.slice.js';
import getSelector from './template/redux/module.selector.js';
import getService from './template/services/module.js';
// import getListPage from './template/pages/list.js';
import { moduleMap } from './template/module/index.js';
import getStore from './template/redux/store.js';


function add(name){
  const module = moduleMap[name];
  console.log(module.name);
  // const pascalSingle = pascalcase(module.name, {pascalCase: true});

  const actions = getActions(module);
  const thunks = getThunks(module);
  const reduxSlice = getSlice(module);
  const reduxSelector = getSelector(module);

  const modules = Object.keys(moduleMap);
  const reduxStore = getStore(modules);
  const service = getService(module);

  // const listPage = getListPage(module, model);
  const dirRedux = `./dist/redux`;
  const dirReduxModule = `./dist/redux/${module.name}`;
  const dirServices = `./dist/services`;
  const dirPages = `./dist/pages`;
  try{
    if(!fs.existsSync(dirReduxModule)){
      fs.mkdirSync(dirReduxModule, {recursive:true}); 
    }
    if(!fs.existsSync(dirServices)){
      fs.mkdirSync(dirServices, null, true); 
    }
    // if(!fs.existsSync(dirPages)){
    //   fs.mkdirSync(dirPages, null, true); 
    // }
    fs.writeFileSync(`${dirReduxModule}/${module.name}.action.js`, actions);
    console.log(`${dirReduxModule}/${module.name}.actions.js created!`);

    fs.writeFileSync(`${dirReduxModule}/${module.name}.thunk.js`, thunks);
    console.log(`${dirReduxModule}/${module.name}.thunk.js created!`);

    fs.writeFileSync(`${dirReduxModule}/${module.name}.slice.js`, reduxSlice);
    console.log(`${dirReduxModule}/${module.name}.slice.js created!`);

    fs.writeFileSync(`${dirReduxModule}/${module.name}.selector.js`, reduxSelector);
    console.log(`${dirReduxModule}/${module.name}.selector.js created!`);

    fs.writeFileSync(`${dirRedux}/store.js`, reduxStore);
    console.log(`${dirRedux}/store.js created!`);

    fs.writeFileSync(`${dirServices}/${module.name}API.js`, service);
    console.log(`${dirServices}/${module.name}API.js created!`);

    // fs.writeFileSync(`${dirPages}/${pascalSingle}ListPage.js`, listPage);
    // console.log(`${dirServices}/${pascalSingle}ListPage.js created!`);
  }catch(e){
    console.log(e);
  }
}

program
  .command("add <name>")
  .description("add module for redux, pages, services and restful api")
  // .option('--first')
  // .option('-m, --module <module>')
  .action(add);

program.parse();


