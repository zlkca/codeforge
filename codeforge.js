
import { program } from 'commander';
import * as fs from 'fs';
// import pascalcase from 'pascalcase';

// import getActions from './template/redux/module.action.js';

import getSliceWithThunk from './template/redux/module-with-thunk.slice.js';
import getSliceTestWithThunk from './template/__tests__/redux/module-with-thunk.slice.test.js';

import getSlice from './template/redux/module.slice.js';
// import getSliceTest from './template/__tests__/redux/module.slice.test.js';

import getSelector from './template/redux/module.selector.js';
// import getSelectorTest from './template/__tests__/redux/module.selector.test.js';

import getService from './template/services/module.js';
// import getListPage from './template/pages/list.js';
import { moduleMap } from './template/module/index.js';
import getStore from './template/redux/store.js';


function generate(name, options){
  const module = moduleMap[name];
  console.log(`Gernerating module: ${module.name} ...`);

  const withAsyncCall = options.asyncCall ? options.asyncCall : false;
  const withSaga = options.saga ? options.saga : false;
  const withThunk = options.thunk ? options.thunk : false;

  if(withAsyncCall){
    console.log("generate redux for direct async call ...");
  }else if(withSaga){
    console.log("generate redux for redux-saga ...");
  }else if(withThunk){
    console.log("generate redux for redux-thunk ...");
  }
  // const pascalSingle = pascalcase(module.name, {pascalCase: true});

  const reduxSlice = withThunk ? getSliceWithThunk(module) : getSlice(module);
  const reduxSliceTest = withThunk ? getSliceTestWithThunk(module) : ""; // getSliceTest(module);
  
  const reduxSelector = getSelector(module);
  // const reduxSelectorTest = getSelectorTest(module);

  const modules = Object.keys(moduleMap);
  const reduxStore = getStore(modules);
  const service = getService(module);

  // const listPage = getListPage(module, model);
  const dirRedux = `./dist/redux`;
  const dirReduxModule = `./dist/redux/${module.name}`;
  const dirServices = `./dist/services`;
  const dirReduxTest = `./dist/__tests__/redux`;
  // const dirPages = `./dist/pages`;

  try{
    if(!fs.existsSync(dirReduxTest)){
      fs.mkdirSync(dirReduxTest, {recursive:true}); 
    }
    if(!fs.existsSync(dirServices)){
      fs.mkdirSync(dirServices, null, true); 
    }
    if(!fs.existsSync(dirReduxModule)){
      fs.mkdirSync(dirReduxModule, {recursive:true}); 
    }
    // if(!fs.existsSync(dirPages)){
    //   fs.mkdirSync(dirPages, null, true); 
    // }
    // fs.writeFileSync(`${dirReduxModule}/${module.name}.action.js`, actions);
    // console.log(`${dirReduxModule}/${module.name}.actions.js created!`);

    fs.writeFileSync(`${dirReduxModule}/${module.name}.slice.js`, reduxSlice);
    console.log(`${dirReduxModule}/${module.name}.slice.js created!`);
    fs.writeFileSync(`${dirReduxTest}/${module.name}.slice.test.js`, reduxSliceTest);
    console.log(`${dirReduxTest}/${module.name}.slice.test.js created!`);


    fs.writeFileSync(`${dirReduxModule}/${module.name}.selector.js`, reduxSelector);
    console.log(`${dirReduxModule}/${module.name}.selector.js created!`);
    // fs.writeFileSync(`${dirReduxTest}/${module.name}.selector.test.js`, reduxSelectorTest);
    // console.log(`${dirReduxTest}/${module.name}.selector.test.js created!`);


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
  .name('codeforge')
  .description('CLI to generate react redux template files')
  .version('0.0.1')

program.command('gen')
  .description("generate module for redux slice, selector and restful api")
  .argument("<name>", "module name of the redux and restful api")
  .option('--async-call', "generate template file for async call directly")
  .option('--saga', "generate template file for redux saga")
  .option('--thunk', "generate template file for redux thunk")
  .option('--service', "generate template file for services layer")
  .action(generate);

program.parse();



