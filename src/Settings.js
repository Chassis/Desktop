import React from 'react';
import { connect } from 'react-redux';

import { reset } from './lib/actions';
import Button from './Button';
import Icon from './Icon';
import FormTable from './FormTable';

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
				<header>
					<h2><Icon type="exclamation-triangle" /> Reset Chassis Desktop</h2>
				</header>

				<p>You're about to reset Chassis Desktop, and will need to run through the installer again.</p>
				<p>This <strong>will</strong> remove all settings from the app, including boxes you've added.</p>
				<p>This <strong>will not</strong> delete any boxes or machines, nor will it uninstall Vagrant or VirtualBox.</p>

				<p>
					<Button
						icon="bomb"
						light
						onClick={() => dispatch(reset())}
					>Reset Chassis Desktop</Button>
					<Button
						icon="times-circle"
						light
						onClick={ () => this.setState({ showRealReset: false }) }
					>Cancel</Button>
				</p>
			</div>;
		}

		return <div className="Settings">
			<header>
				<h1>Settings</h1>
			</header>

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
					light
					shortcut="esc"
					onClick={ onDismiss }
				>Cancel</Button>
				<Button
					icon="check"
					light
					onClick={ onDismiss }
				>Save</Button>
			</p>

			<p>
				<Button
					icon="exclamation-triangle"
					light
					onClick={() => this.setState({ showRealReset: true })}
				>Reset Chassis Desktop</Button>
			</p>
		</div>;
	}
}

export default connect(store => store)(Settings);
