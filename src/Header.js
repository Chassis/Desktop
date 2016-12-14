import React from 'react';

import Button from './Button';

import './Header.css';

export default class Header extends React.Component {
	render() {
		let { onShowCreate, onShowSettings } = this.props;

		return <div className="Header">
			<div className="title">
				<img role="presentation" src="logo.png" />
				<span>Chassis</span>
			</div>
			<div className="actions">
				<Button
					icon="gear"
					light
					shortcut="Cmd+,"
					onClick={ onShowSettings }
				>
					Settings
				</Button>
				<Button
					icon="plus"
					light
					shortcut="Cmd+N"
					onClick={ onShowCreate }
				>
					Add&hellip;
				</Button>
			</div>
		</div>;
	}
}

Header.propTypes = {
	onShowCreate: React.PropTypes.func.isRequired,
	onShowSettings: React.PropTypes.func.isRequired,
};
