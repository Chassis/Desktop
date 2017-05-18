import { sep } from 'path';
import React from 'react';
import {connect} from 'react-redux';

import { addBox, loadConfig, updateBoxStatus } from './lib/actions';
import Button from './Button';
import Config from './CreateModal/Config';
import Header from './Header';
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
		const { dispatch } = this.props;
		const { name, path, type } = this.state;
		switch ( type ) {
			case TYPES.IMPORT:
				// Add, then refresh.
				dispatch( addBox( name, path ) );
				dispatch( loadConfig( path ) )
					.then(() => {
						console.log('fulfilled');
						dispatch( updateBoxStatus( path ) )
					});
				break;

			default:
				// No-op.
				break;
		}

		this.props.onDismiss();
	}

	render() {
		const { step } = this.state;
		const onBack = () => this.setState( state => ({ step: state.step - 1 }) );

		return <div className="CreateModal">
			<Header icon="plus" title="Add New Box">
				{ step > 1 ?
					<Button
						icon="arrow-left"
						shortcut="esc"
						onClick={ onBack }
					>Back</Button>
				:
					<Button
						icon="times-circle"
						shortcut="esc"
						onClick={ this.props.onDismiss }
					>Cancel</Button>
				}
			</Header>

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
					onChange={ data => this.setState( data ) }
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
