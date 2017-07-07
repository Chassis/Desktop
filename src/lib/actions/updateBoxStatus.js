import {spawn} from 'child_process';

import { UPDATE_BOX } from '../actions';
import parser from '../vagrant/parser';

export default function updateBoxStatus(path) {
	return (dispatch, getStore) => {
		const {boxes} = getStore();
		let machine = boxes.find(box => box.path === path);
		if (!machine) {
			return;
		}

		dispatch({ type: UPDATE_BOX, path, data: { status: 'loading' } });

		const process = spawn('vagrant', ['status', '--machine-readable'], {
			cwd: machine.path,
		});
		let output = '';
		let error = '';
		process.stdout.on('data', data => { output += data });
		process.stderr.on('data', data => { error += data });
		process.on('close', code => {
			if ( code != 0 ) {
				console.log( error );
				dispatch({ type: UPDATE_BOX, path, data: { status: 'not_created' }});
				return;
			}

			const parsed = parser(output);
			console.log( parsed );
			const stateItem = parsed.find(item => item.type === 'state' );
			const state = stateItem.data[0];

			dispatch({ type: UPDATE_BOX, path, data: { status: state } });
		});
	};
}
