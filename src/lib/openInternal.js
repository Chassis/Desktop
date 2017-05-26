import url from 'url';

import { showModal } from './actions';

const parseURL = internalURL => {
	// Parse URL into parts.
	const parsed = url.parse( internalURL, true );
	if ( parsed.protocol !== 'chassis:' ) {
		return null;
	}

	return parsed;
};

export default store => url => {
	const parsed = parseURL( url );

	switch ( parsed.host ) {
		case 'install-extension':
			store.dispatch( showModal( 'extensions' ) );
			break;

		default:
			console.log( 'unknown action' );
			break;
	}
};
