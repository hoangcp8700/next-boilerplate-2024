module.exports = [
  {
    type: 'select',
    name: 'structure',
    message: 'Choose the name structure of page you will generate',
    choices: ['auth', 'private', 'public'],
  },
  {
    type: 'input',
    name: 'name',
    message: "Input your page's name",
  },
];
