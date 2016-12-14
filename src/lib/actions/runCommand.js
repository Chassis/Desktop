import { spawn } from 'child_process';

window.running = {};

const vagrantEnv = {
	...process.env,
	CLICOLOR_FORCE: 'yes',
	GIT_COLOR: 'yes',

	// Only supported in >1.8.3, --color is used for older versions.
	VAGRANT_FORCE_COLOR: 'yes',
};

export default function runCommand(machine, command, args = [], opts = {}) {
	return (dispatch, getStore) => {
		if ( machine.path in window.running ) {
			return;
		}

		let spawnOpts = Object.assign({}, {
			cwd: machine.path,
			env: vagrantEnv,
		}, opts);

		const proc = spawn( command, args, spawnOpts );
		window.running[ machine.path ] = proc;

		dispatch({ type: 'COMMAND_START', command, args, machine: machine.path });

		proc.stdout.on('data', data => {
			dispatch({ type: 'COMMAND_OUTPUT', data, machine: machine.path, stream: 'stdout' });
		});
		proc.stderr.on('data', data => {
			dispatch({ type: 'COMMAND_OUTPUT', data, machine: machine.path, stream: 'stderr' });
		});
		proc.on('close', code => {
			dispatch({ type: 'COMMAND_END', code, machine: machine.path });
			delete window.running[ machine.path ];
		});
	};
}
