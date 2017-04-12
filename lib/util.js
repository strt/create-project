const fs = require('fs');
const readPkgUp = require('read-pkg-up');

module.exports.updatePkg = ({name, version = '1.0.0', description = ''}) => {
	const pkg = readPkgUp.sync().pkg;
	const print = obj => JSON.stringify(obj, null, 2);
	const data = Object.assign(pkg, {
		name,
		version,
		description,
		private: true,
		license: undefined,
		_id: undefined,
		readme: undefined,
		scripts: Object.assign(pkg.scripts, {
			postinstall: undefined,
			'docker:build': pkg.scripts['docker:build'].replace('YOUR_REGISTRY', name),
			'docker:push': pkg.scripts['docker:push'].replace('YOUR_REGISTRY', name)
		})
	});

	fs.writeFile('package.json', print(data), 'utf8');
};

module.exports.addReadme = ({name}) => {
	fs.readFile('../template/readme.md', 'utf8', (err, data) => {
		if (err) {
			throw new Error(err);
		}

		const updated = data.replace(/<%= projectName %>/g, name);

		fs.writeFile(`readme.md`, updated, 'utf8', err => {
			if (err) {
				throw new Error(err);
			}
		});
	});
};
