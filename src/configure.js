/**
 * Setup for global handlers.
 */
import ansiHTML from 'ansi-html';
import which from 'which';

import * as actions from './lib/actions';
import { loadAllConfig } from './lib/actions/loadConfig';
import Keys from './lib/keys';

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
