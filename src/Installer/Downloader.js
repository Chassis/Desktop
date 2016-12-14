import React from 'react';

import Button from '../Button';

import './Downloader.css';

function formatProgress(current, total) {
	let percentage = ( current / total ) * 100;
	return percentage.toFixed( 1 );
}

/*const STATES = [
	'waiting',
	'starting',
	'downloading',
	'completed',
];*/

export default class Downloader extends React.Component {
	render() {
		const { status, current, total } = this.props;

		switch ( status ) {
			case 'start':
				return <div className="Downloader">
					<p>Starting download...</p>
				</div>;

			case 'downloading':
				return <div className="Downloader">
					<progress max={ total } value={ current } />
					<p>Downloading, { formatProgress( current, total ) }% complete.</p>
				</div>;

			case 'waiting':
				return <div className="Downloader">
					<Button
						icon="download"
						light
						onClick={ this.props.onDownload }
					>Download and Install</Button>
				</div>;

			default:
				return <div className="Downloader">
					<p>{ status }</p>
				</div>;
		}
	}
}

Downloader.propTypes = {
	status: React.PropTypes.string.isRequired,
	current: React.PropTypes.number,
	total: React.PropTypes.number,
	onDownload: React.PropTypes.func.isRequired,
};
