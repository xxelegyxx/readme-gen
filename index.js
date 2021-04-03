// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const generateReadme = require("./utils/generateMarkdown")
const writeFileAsync = util.promisify(fs.writeFile);

// TODO: Create an array of questions for user input
function promptUser(){
        return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your full name?',
            default: 'firstname lastname',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log('Please enter your name');
                    }
                return true;
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your github username? (no @ needed)',
            default: 'xx-elegy-xx',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log('Please enter a valid github username');
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'repo',
            message: 'Enter the title of your Github repo',
            default: 'readme gen',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log('A valid Github repo is required');
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of your project',
            default: 'project title',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log('A valid project title is required.');
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Write a description for your project',
            default: 'Description',
            validate: function (answer) {
                if (answer.length < 1) {
                    return console.log('Please write a valid description for your project');
                }
                return true;
            }
        },
        {
            type: 'input',
            message: "If applicable, describe the steps required to install your project for the Installation section.",
            name: 'installation'
        },
        {
            type: 'input',
            message: "Provide instructions and examples of your project in use for the Usage section.",
            name: 'usage'
        },
        {
            type: 'input',
            message: "If applicable, provide guidelines on how other developers can contribute to your project.",
            name: 'contributing'
        },
        {
            type: 'input',
            message: "If applicable, provide any tests written for your application and provide examples on how to run them.",
            name: 'tests'
        },
        {
            type: 'list',
            message: "Choose a license for your project.",
            choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
            name: 'license'
        },
    ]);
}
async function init() {
    try {
        // Ask user questions and generate responses
        const answers = await promptUser();
        const generateContent = generateReadme(answers);
        // Write new README.md to dist directory
        await writeFileAsync('./README.md', generateContent);
        console.log('✔️  Successfully wrote to README.md');
    }   catch(err) {
        console.log(err);
    }
  }
  
  init();  