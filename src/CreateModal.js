import React from 'react';
import {connect} from 'react-redux';

import Button from './Button';
import Confirm from './CreateModal/Confirm';
import Name from './CreateModal/Name';
import Type, { TYPES } from './CreateModal/Type';
import Steps from './Steps';
import {addBox} from './lib/actions';

import './CreateModal.css';

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
		if (type === TYPES.IMPORT) {
			// We can skip any crazy behaviour because this is a read-only
			// operation on the filesystem.
			this.props.dispatch(addBox(this.state.name, path));
			this.props.onDismiss();
			return;
		}

		this.setState( state => ({
			step: state.step + 1,
			type,
			path
		}));
	}

	render() {
		return <div className="CreateModal">
			<header>
				<h1>Add New Box</h1>
				<Button
					icon="times-circle"
					light
					shortcut="esc"
					onClick={ this.props.onDismiss }
				>Cancel</Button>
			</header>

			<Steps step={ this.state.step }>
				<Name
					onSubmit={ name => this.onNext( name ) }
				/>
				<Type
					name={ this.state.name }
					onSelect={ (...args) => this.onSelect(...args) }
				/>
				<Confirm
					name={ this.state.name }
					path={ this.state.path }
					type={ this.state.type }
				/>
			</Steps>
		</div>;
	}
}

CreateModal.propTypes = {
	onDismiss: React.PropTypes.func.isRequired,
};

export default connect(state => state)(CreateModal);
