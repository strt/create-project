const inquirer = require('inquirer');
const pathExists = require('path-exists');

module.exports = () => {
	const prompts = [
		{
			type: 'input',
			name: 'name',
			message: 'What`s the project name?'
		}
	];

	return inquirer.prompt(prompts)
		.then(answers => {
			if (pathExists.sync(answers.name)) {
				throw new Error(`A directory named \`${answers.name}\` already exists`);
			}

			return answers.name;
		});
};
