import React from 'react';
import { connect } from 'react-redux';

import { reset } from './lib/actions';
import Button from './Button';
import FormTable from './Form/Table';
import Header from './Header';

import './Settings.css';

class Settings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showRealReset: false,
		};
	}

	render() {
		const { dispatch, onDismiss } = this.props;
		const { showRealReset } = this.state;

		if ( showRealReset ) {
			return <div className="Settings">
				<Header icon="exclamation-triangle" title="Reset Chassis Desktop" />

				<p>You're about to reset Chassis Desktop, and will need to run through the installer again.</p>
				<p>This <strong>will</strong> remove all settings from the app, including boxes you've added.</p>
				<p>This <strong>will not</strong> delete any boxes or machines, nor will it uninstall Vagrant or VirtualBox.</p>

				<p>
					<Button
						icon="bomb"
						onClick={() => dispatch(reset())}
					>Reset Chassis Desktop</Button>
					<Button
						icon="times-circle"
						onClick={ () => this.setState({ showRealReset: false }) }
					>Cancel</Button>
				</p>
			</div>;
		}

		return <div className="Settings">
			<Header icon="gear" title="Settings" />

			<FormTable>
				<label>
					<span>Enable keyboard shortcut overlay</span>
					<input
						checked
						readOnly
						type="checkbox"
					/>
				</label>
			</FormTable>

			<p>
				<Button
					icon="times-circle"
					shortcut="esc"
					onClick={ onDismiss }
				>Cancel</Button>
				<Button
					icon="check"
					onClick={ onDismiss }
				>Save</Button>
			</p>

			<p>
				<Button
					icon="exclamation-triangle"
					onClick={() => this.setState({ showRealReset: true })}
				>Reset Chassis Desktop</Button>
			</p>
		</div>;
	}
}

export default connect(store => store)(Settings);
