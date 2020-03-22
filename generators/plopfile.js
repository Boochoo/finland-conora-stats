const componentTemplate = data => {
  switch(data.type) {
    case 'Stateless function': {
      return 'component/Component.js.hbs';
    }
    case 'pages': {
      return 'component/Component.js.hbs';
    }
    default: {
      return 'component/Class.js.hbs';
    }
  }
};

const mainPath = `../src/component/{{ folder }}/{{pascalCase name}}/{{pascalCase name}}`;

const isPageTemplate = data => {
  switch(data.type) {
    case 'pages': {
      return '{{ folder }}/{{pascalCase name}}.js';
    }
    default: {
      return `${mainPath}.js`;
    }
  }
};


module.exports = plop => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: `Select the type of component`,
        default: 'Stateless function',
        choices: () => ['Stateless function', 'React.Component']
      }, {
        type: 'input',
        name: 'name',
        message: `What is the component's name?`,
        default: 'ComponentName'
      }, {
        type: 'list',
        name: 'folder',
        message: 'Where should this be?',
        default: 'atoms',
        choices: () => ['atoms', 'molecules', 'organisms', 'templates', 'pages']
      }
    ],

    actions: data => {

      return [
        {
          type: 'add',
          path: isPageTemplate(data),
          templateFile: componentTemplate(data)
        },
        {
          type: 'add',
          path: `${mainPath}.test.js`,
          templateFile: './component/test.js.hbs'
        },
        {
          type: 'add',
          path: `${mainPath}.style.js`,
          templateFile: './component/style.js.hbs'
        },
      ]; 
    }
  });
};