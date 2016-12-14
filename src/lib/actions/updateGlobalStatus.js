import {spawn} from 'child_process';

import { UPDATE_BOX } from '../actions';
import { parseGlobalStatus } from '../vagrant/parser';

export default function updateGlobalStatus() {
	return (dispatch, getStore) => {
		const {boxes} = getStore();

		const process = spawn('vagrant', ['global-status', '--machine-readable']);
		let output = '';
		process.stdout.on('data', data => { output += data });
		process.on('close', () => {
			const parsed = parseGlobalStatus(output);
			parsed.forEach( machine => {
				// Find corresponding box.
				let box = boxes.find(box => box.path === machine.directory);
				if ( ! box ) {
					return;
				}

				dispatch({
					type: UPDATE_BOX,
					path: box.path,
					data: { status: machine.state }
				});
			})
		});
	};
}
