import React from 'react';
import { remote } from 'electron';

import Button from '../Button';
import KeyHandler from '../KeyHandler';
import Icon from '../Icon';
import Step from '../Step';

import './Type.css';

const dialog = remote.dialog;

export const TYPES = {
	CREATE: 'CREATE',
	RETROFIT: 'RETROFIT',
	IMPORT: 'IMPORT',
};

const comingSoon = () => {
	alert('Coming soon!');
};

export default class Type extends React.Component {
	handleSelectCreate() {
		return comingSoon();
		/*const title = 'Select new folder for "%s".'
		const path = dialog.showSaveDialog({
			title: title.replace( '%s', this.props.name ),
			properties: [ 'createDirectory' ],
			buttonLabel: 'Create',
			defaultPath: this.props.name,
		});
		if ( ! path ) {
			return;
		}

		this.props.onSelect( TYPES.CREATE, path[0] );*/
	}

	handleSelectRetrofit() {
		return comingSoon();
		/*const path = dialog.showOpenDialog({
			title: 'Choose an existing WordPress installation.\nA folder named "chassis" will be created inside the folder you select.',
			properties: [ 'openDirectory' ]
		});
		if ( ! path ) {
			return;
		}

		this.props.onSelect( TYPES.RETROFIT, path[0] );*/
	}

	handleSelectImport() {
		const path = dialog.showOpenDialog({
			title: 'Select existing Chassis folder.',
			properties: [ 'openDirectory' ]
		});
		if ( ! path ) {
			return;
		}

		this.props.onSelect( TYPES.IMPORT, path[0] );
	}

	render() {
		return <Step className="Type">
			<h2>Select Your Project Type</h2>
			<ul className="create-type">
				<li>
					<a onClick={ e => { e.preventDefault(); this.handleSelectCreate() } }>
						<KeyHandler shortcut="cmd+1" onTrigger={ () => this.handleSelectCreate() } />
						<Icon type="plus" />
						<div>
							<p className="name">Create new box</p>
							<p className="description">Create an entirely new Chassis box in a new directory.</p>
						</div>
					</a>
				</li>
				<li>
					<a onClick={ e => { e.preventDefault(); this.handleSelectRetrofit() } }>
						<KeyHandler shortcut="cmd+2" onTrigger={ () => this.handleSelectRetrofit() } />
						<Icon type="wrench" />
						<div>
							<p className="name">Add Chassis to existing project</p>
							<p className="description">Add a Chassis box to your existing WordPress project</p>
						</div>
					</a>
				</li>
				<li>
					<a onClick={ e => { e.preventDefault(); this.handleSelectImport() } }>
						<KeyHandler shortcut="cmd+3" onTrigger={ () => this.handleSelectImport() } />
						<Icon type="download" />
						<div>
							<p className="name">Add existing Chassis box</p>
							<p className="description">Add an existing Chassis box to the UI.</p>
						</div>
					</a>
				</li>
			</ul>
		</Step>;
	}
}
Type.propTypes = {
	/**
	 * ( type, directory ) => void
	 */
	onSelect: React.PropTypes.func.isRequired
};
