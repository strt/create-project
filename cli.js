#!/usr/bin/env node
const meow = require('meow');
const logSymbols = require('log-symbols');
const updateNotifier = require('update-notifier');
const pathExists = require('path-exists');
const app = require('./');

const cli = meow(`
	Usage
		$ strt-create-project <name>

	Example
		$ strt-create-project strateg
	\n
`);

updateNotifier({pkg: cli.pkg}).notify();

Promise.resolve()
	.then(() => {
		if (cli.input.length === 0) {
			throw new Error('Specify a project name');
		}

		if (pathExists.sync(cli.input[0])) {
			throw new Error(`A directory named \`${cli.input[0]}\` already exists`);
		}

		return {
			name: cli.input[0]
		};
	})
	.then(app)
	.then(() => {
		console.log(` ${logSymbols.success} ✨  Done`);
	})
	.catch(err => {
		console.error(`${logSymbols.error} ${err.message}`);
		process.exit(1);
	});
