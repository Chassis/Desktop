import { spawn } from 'child_process';

window.running = {};

const vagrantEnv = {
	CLICOLOR_FORCE: 'yes',
	GIT_COLOR: 'yes',

	// Only supported in >1.8.3, --color is used for older versions.
	VAGRANT_FORCE_COLOR: 'yes',
};

export default function runCommand(path, command, args = [], opts = {}) {
	return (dispatch, getStore) => new Promise((resolve, reject) => {
		if ( path in window.running ) {
			return;
		}

		let spawnOpts = Object.assign({}, {
			cwd: path,
			env: {
				...process.env,
				...vagrantEnv,
			},
		}, opts);

		const proc = spawn( command, args, spawnOpts );
		window.running[ path ] = proc;

		dispatch({ type: 'COMMAND_START', command, args, machine: path });

		proc.stdout.on('data', data => {
			dispatch({ type: 'COMMAND_OUTPUT', data, machine: path, stream: 'stdout' });
		});
		proc.stderr.on('data', data => {
			dispatch({ type: 'COMMAND_OUTPUT', data, machine: path, stream: 'stderr' });
		});
		proc.on('close', code => {
			dispatch({ type: 'COMMAND_END', code, machine: path });
			delete window.running[ path ];
			resolve( code );
		});
	});
}
