const del = require('del');
const execa = require('execa');
const Listr = require('listr');
const util = require('./lib/util');

module.exports = ({name}) => {
	const tasks = new Listr([
		{
			title: `🚚  Fetching files`,
			task: () => execa('git', ['clone', '--depth=1', 'git@github.com:strt/boilerplate.git', name])
				.catch(() => {
					throw new Error('Git clone failed');
				})
		},
		{
			title: `🚀  Setting up project`,
			task: () => {
				process.chdir(name);
				util.updatePkg({name});
				util.addReadme({name});
				del(['.git', 'readme.md'])
					.then(() => execa('git', ['init']))
					.then(() => execa.shell('cp .hooks/* .git/hooks && chmod +x .git/hooks/* || exit 0'));
			}
		},
		{
			title: `🔧  Installing packages`,
			task: (ctx, task) => execa('yarn')
				.catch(() => {
					ctx.yarn = false;
					task.skip('Yarn not available, get it here https://yarnpkg.com');
				})
		},
		{
			title: `🔧  Installing packages with npm`,
			enabled: ctx => ctx.yarn === false,
			task: () => execa('npm', ['install'])
		},
		{
			title: `🗑  Cleaning up`,
			task: () => del(['license', '.hooks'])
		}
	]);

	return tasks.run();
};
