import { sep } from 'path';
import React from 'react';
import {connect} from 'react-redux';

import { addBox, loadConfig } from './lib/actions';
import Config from './CreateModal/Config';
import Type, { TYPES } from './CreateModal/Type';
import Steps from './Steps';

import './CreateModal.css';

const nameForPath = path => {
	const parts = path.split( sep );
	if ( parts[ parts.length - 1 ].toLowerCase() === 'chassis' ) {
		// Ignore.
		parts.pop();
	}

	return parts[ parts.length - 1 ];
};

class CreateModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 0,
			name: null,
			type: null,
			path: null,
		};
	}

	onNext( name ) {
		this.setState( state => ({ name, step: state.step + 1 }) );
	}

	onSelect(type, path) {
		this.setState( state => ({
			step: state.step + 1,
			type,
			name: nameForPath( path ),
			path
		}));
	}

	onCreate() {
		const { name, path, type } = this.state;
		switch ( type ) {
			case TYPES.IMPORT:
				this.props.dispatch( addBox( name, path ) );
				this.props.dispatch( loadConfig( path ) );
				break;
		}

		this.props.onDismiss();
	}

	render() {
		return <div className="CreateModal">
			<header>
				<h1>Add New Box</h1>
			</header>

			<Steps step={ this.state.step }>
				<Type
					key="type"
					onDismiss={ this.props.onDismiss }
					onSelect={ (...args) => this.onSelect(...args) }
				/>
				<Config
					key="config"
					name={ this.state.name }
					path={ this.state.path }
					type={ this.state.type }
					onBack={ () => this.setState( state => ({ step: state.step - 1 }) ) }
					onSubmit={() => this.onCreate()}
				/>
			</Steps>
		</div>;
	}
}

CreateModal.propTypes = {
	onDismiss: React.PropTypes.func.isRequired,
};

export default connect(state => state)(CreateModal);
