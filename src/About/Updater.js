import { ipcRenderer, remote } from 'electron';
import React from 'react';

import Button from '../Button';
import Icon from '../Icon';

export default class Updater extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			status: null,
			available: null,
		};
		ipcRenderer.on( 'update-status', (e, data) => {
			switch ( data.type ) {
				case 'checking-for-update':
				case 'update-not-available':
				case 'update-downloaded':
					this.setState({ status: data.type });
					break;

				case 'update-available':
					this.setState({
						status: data.type,
						available: data.info,
					});
					break;

				default:
					console.log( 'unknown', data );
					break;
			}
		});
	}

	onCheck() {
		ipcRenderer.send( 'check-update' );
	}

	onInstall() {
		ipcRenderer.send( 'install-update' );
	}

	render() {
		const { available, status } = this.state;

		switch ( status ) {
			case 'checking-for-update':
				return <p className="update">
					<Icon type="spinner" /> Checking for updates&hellip;
				</p>;

			case 'update-available':
				return <p className="update">
					<Icon type="spinner" /> Downloading { available.version }&hellip;
				</p>;

			case 'update-not-available':
				return <p className="update">
					You're up to date!
				</p>

			case 'update-downloaded':
				return <p className="update" onClick={() => this.onInstall()}>
					<button type="button">Restart Desktop to Update</button>
				</p>;

			default:
				return <p className="update">
					<button type="button" onClick={ () => this.onCheck() }>
						Check for Updates
					</button>
				</p>;
		}

	}
}
