import fs from 'fs';

import runCommand from './runCommand';

const CHASSIS_REMOTE = 'https://github.com/Chassis/Chassis.git';

export default function cloneChassis( path ) {
	return (dispatch, getStore) => new Promise((resolve, reject) => {
		try {
			fs.mkdirSync( path );
		} catch ( e ) {
			if ( e.code !== 'EEXIST' ) {
				// Actual error, reject.
				reject( e );
				return;
			}

			// Directory exists, but might be empty. Check.
			const contents = fs.readdirSync( path );
			if ( contents.length > 0 ) {
				reject( e );
				return;
			}

			// Empty dir, allow.
		}

		const args = [
			'clone',
			CHASSIS_REMOTE,
			path,

			// Options
			'--recurse-submodules',
		];
		dispatch( runCommand( path, 'git', args ) ).then(code => {
			if ( code === 0 ) {
				resolve();
			} else {
				reject();
			}
		});
	});
}
