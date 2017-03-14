const inquirer = require('inquirer');
const pathExists = require('path-exists');

module.exports = () => {
	const prompts = [
		{
			type: 'input',
			name: 'name',
			message: 'What\'s the project name?',
			validate: input => {
				if (pathExists.sync(input)) {
					return `A directory named \`${input}\` already exists`;
				}

				return true;
			}
		}
	];

	return inquirer.prompt(prompts);
};
