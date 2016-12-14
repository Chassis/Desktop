import * as actions from '../actions';

export default function installer(state = {}, action) {
	switch ( action.type ) {
		case actions.install.SET_STATUS:
			return { ...state, installed: { ...state.installed, [ action.app ]: action.status } };

		case actions.install.SET_DOWNLOAD_PROGRESS:
			let downloadProgress = state.downloadProgress || {};
			downloadProgress[ action.app ] = action.progress;
			console.log( downloadProgress );
			return { ...state, downloadProgress };

		case actions.install.SET_DOWNLOAD_TOTAL:
			let downloadTotal = state.downloadTotal || {};
			downloadTotal[ action.app ] = action.total;
			return { ...state, downloadTotal };

		default:
			return state;
	}
}
