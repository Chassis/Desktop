/**
 * Setup for global handlers.
 */
import ansiHTML from 'ansi-html';
import fixPath from 'fix-path';
import which from 'which';

import * as actions from './actions';
import { loadAllConfig } from './actions/loadConfig';
import Keys from './keys';

// Refresh every 10 seconds.
const REFRESH_INTERVAL = 10000;

export default store => {
	const state = store.getState();

	ansiHTML.setColors({
		'reset': ['fff', 'transparent'],
		'black': 'transparent',
	});

	window.keyHandler = new Keys();
	window.keyHandler.listen( store );

	// Fix the process.env path, which isn't inherited by the shell on macOS.
	fixPath();

	if ( ! state.installer.installed.chassis ) {
		// Search for installed applications.
		which( 'vagrant', err => {
			store.dispatch( actions.install.setStatus( 'vagrant', !err ) );
		});
		which( 'VirtualBox', err => {
			store.dispatch( actions.install.setStatus( 'virtualbox', !err ) );
		});
	} else {
		// Refresh machine state constantly.
		store.dispatch(actions.updateGlobalStatus());
		window.setInterval(() => store.dispatch(actions.updateGlobalStatus()), REFRESH_INTERVAL);

		// Refresh configuration.
		store.dispatch(loadAllConfig());
	}
};
