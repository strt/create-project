#!/usr/bin/env node
const meow = require('meow');
const logSymbols = require('log-symbols');
const updateNotifier = require('update-notifier');
const ui = require('./lib/ui');
const app = require('./');

const cli = meow(`
	Usage
		$ strt-create-project
`);

updateNotifier({pkg: cli.pkg}).notify();

Promise.resolve()
	.then(ui)
	.then(app)
	.then(() => {
		console.log(` ${logSymbols.success} ✨ Done`);
	})
	.catch(err => {
		console.error(`\n${logSymbols.error} ${err.message}`);
		process.exit(1);
	});
