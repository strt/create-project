const fs = require('fs');
const readPkgUp = require('read-pkg-up');

module.exports.updatePkg = ({name, version = '1.0.0', description = ''}) => {
	const pkg = readPkgUp.sync().pkg;
	const print = obj => JSON.stringify(obj, null, 2);
	const data = Object.assign(pkg, {
		name,
		version,
		description,
		license: undefined,
		_id: undefined,
		readme: undefined,
		scripts: Object.assign(pkg.scripts, {postinstall: undefined})
	});

	fs.writeFile('package.json', print(data));
};
