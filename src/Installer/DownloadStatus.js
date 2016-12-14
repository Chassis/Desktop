import React from 'react';

import Button from '../Button';
import Downloader from './Downloader';
import Icon from '../Icon';

export default props => {
	if ( props.installed ) {
		return <div className="DownloadStatus"><Icon type="check" /> Installed</div>;
	}

	if ( props.progress ) {
		if ( props.progress === props.total ) {
			return <div className="DownloadStatus">
				<Button
					icon="arrow-right"
					light
					onClick={ props.onInstall }
				>Install</Button>
			</div>;
		}

		return <div className="DownloadStatus">
			<Downloader
				current={ props.progress }
				status="downloading"
				total={ props.total }
			/>
		</div>;
	}

	return <div className="DownloadStatus">Not Installed</div>
};
