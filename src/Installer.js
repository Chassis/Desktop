import React from 'react';
import { connect } from 'react-redux';

import './Installer.css';

import { setStatus } from './lib/actions/install';
import Downloads from './Installer/Downloads';
import ImportBoxes from './Installer/ImportBoxes';
import Ready from './Installer/Ready';
import Steps from './Steps';
import Welcome from './Installer/Welcome';

class Installer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 0,
		};
	}

	onNext() {
		this.setState( state => ({ step: state.step + 1 }) );
	}

	onFinish() {
		this.props.dispatch( setStatus( 'chassis', true ) );
	}

	render() {
		const { vagrant } = this.props;

		return <div id="app" className="Installer">
			<Steps step={ this.state.step }>
				<Welcome key="welcome" onNext={() => this.onNext()} />
				<Downloads key="downloads" onNext={() => this.onNext()} />

				{ vagrant.machines.length > 0 ?
					<ImportBoxes
						key="importboxes"
						boxes={ vagrant.machines }
						onNext={() => this.onNext()}
					/>
				: null }

				<Ready key="ready" onNext={() => this.onFinish()}/>
			</Steps>
		</div>;
	}
}

export default connect(state => state)(Installer);
