import React, { Component } from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { connect } from 'react-redux';

import { hideModal, showModal } from './lib/actions';
import CreateModal from './CreateModal';
import Header from './Header';
import Installer from './Installer';
import MachineList from './MachineList';
import Modal from './Modal';
import Settings from './Settings';

import openBrowser from './lib/openBrowser';
import Button from './Button';

import './App.css';

class App extends Component {
	render() {
		const { dispatch, installer } = this.props;
		const { modal } = this.props.ui;
		const installed = installer.installed.chassis;

		let modalComponent = null;
		const onDismiss = () => dispatch(hideModal());

		switch ( modal ) {
			case 'create':
				modalComponent = <Modal key="create"><CreateModal onDismiss={onDismiss} /></Modal>;
				break;

			case 'settings':
				modalComponent = <Modal key="settings"><Settings onDismiss={onDismiss} /></Modal>;
				break;

			default:
				// No-op
				break;
		}

		// Installation override.
		if ( ! installed ) {
			modalComponent = <Modal key="install"><Installer onDismiss={onDismiss} /></Modal>;
		}

		const logo = <img role="presentation" src="logo.png" />;
		return <div className="App">
			{ installed ?
				<Header icon={ logo } title="Chassis">
					<Button
						icon="bullhorn"
						light
						noborder
						onClick={ () => openBrowser( 'https://github.com/Chassis/Desktop/issues' ) }
					>
						Feedback
					</Button>
					<Button
						icon="gear"
						light
						noborder
						shortcut="Cmd+,"
						onClick={ () => dispatch(showModal('settings')) }
					>
						Settings
					</Button>
					<Button
						icon="plus"
						light
						noborder
						shortcut="Cmd+N"
						onClick={ () => dispatch(showModal('create')) }
					>
						Add&hellip;
					</Button>
				</Header>
			: null }

			<CSSTransitionGroup
				component="div"
				transitionEnterTimeout={ 150 }
				transitionLeaveTimeout={ 150 }
				transitionName="splash-fade"
			>
				{ modalComponent }
			</CSSTransitionGroup>

			{ installed ?
				<div className="app-content">
					<MachineList />
				</div>
			: null }
		</div>;
	}
}

export default connect(state => state)(App);
