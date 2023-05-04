
# codeforge

codeforge is a tool to generate react redux web app module. By using this tool, you can:
 - Generate redux reducer, action, thunk
 - Generate service layer files by module
 


## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Next](#Next)
- [Contributing](#contributing)
- [License](#license)

## Requirements
The code that codeforge generated has the following dependencies, which means your project need to use the following npm packages (list the affected files):
- react (mandatory)
- redux (mandatory)
- redux toolkit (mandatory /redux/*.js)
- query-string (optional /services/utils.js, you can manually create utils.js if you don't like query-string)
- axios (optional /services/http.js, you can manually create http.js if you don't like axios)

Also your project need to follow some conventions or patterns:
- Your project use restful api, and use http POST /search/entityName for search api (mandatory for services)
- Your project's restful api with query is like https://example.com/path/to/page?name=ferret&color=purple


## Installation

Git clone the project, then cd to the project root folder and issue following command to install the dependencies.

```bash
npm install
```

## Usage

Firstly you need to define your modules and entities in /template/module/index.js

For example, we want to create a finance module, and under the finance module we have
deposit, expense and payment entity (all the name must be camalcase), then our define in template will be as following:

```javascript
export const moduleMap = {
    finance:{
        name: 'finance',
        entities: [
            'deposit',
            'expense',
            'payment',
        ]
    },
}
```

Then we can issue a command:
```nodejs
node codeforge.js gen finance --thunk
```

Now under the /dist folder you will see the following files and you can then copy the files to your project.
```
├── redux
│   ├── store.js
│   ├── finance
│   │   ├── finance.slice.js
│   │   └── finance.selector.js
└── services
    ├── utils.js
    └── financeApi.js
```

## Next

To use the generated services layer files, the next thing you need to do is find a http client lib like axios or fetch, and then create an http.js file to implement your own get, post, put and del function:
- get(url, header) header is optional
- post(url, body, header) header is optional
- put(url, body, header) header is optional
- del(url, header) header is optional

You can also define your own template by modify and re-run `node codefore.js gen finance --thunk` command:
- /services/module.js
- /services/utils.js
- /template/redux/module.slice.js
- /template/redux/module.selector.js

## Contributing

We welcome contributions to this project! To get started, please follow these steps:

1. Fork the repository and clone it to your local machine.
2. Install the project's dependencies by running `npm install`.
3. Create a new branch for your changes: `git checkout -b my-new-branch`.
4. Make your changes to the codebase.
5. Test your changes thoroughly.
6. Submit a pull request to the `master` branch of the original repository, explaining your changes in detail and providing a summary of the changes you've made.

Please make sure to adhere to the project's code style and formatting guidelines when making changes. If you're unsure about anything, don't hesitate to reach out to the project maintainers for guidance.

By contributing to this project, you agree to abide by the project's code of conduct.

Thank you for your interest in contributing to this project!

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).