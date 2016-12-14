export const SET_STATUS = 'install.SET_STATUS';
export const SET_DOWNLOAD_PROGRESS = 'install.SET_DOWNLOAD_PROGRESS';
export const SET_DOWNLOAD_TOTAL = 'install.SET_DOWNLOAD_TOTAL';

export function setStatus( app, status ) {
	return { type: SET_STATUS, app, status };
}

export function setDownloadTotal( app, total ) {
	return { type: SET_DOWNLOAD_TOTAL, app, total };
}

export function addDownloadProgress( app, progress ) {
	return (dispatch, getStore) => {
		const { installer } = getStore();
		const currentProgress = installer.downloadProgress[ app ] || 0;
		const nextProgress = currentProgress + progress;

		dispatch({ type: SET_DOWNLOAD_PROGRESS, app, progress: nextProgress });
	};
}

export function resetDownload( app ) {
	return dispatch => {
		dispatch({ type: SET_DOWNLOAD_TOTAL, app, total: 0 });
		dispatch({ type: SET_DOWNLOAD_PROGRESS, app, progress: 0 });
	};
}
