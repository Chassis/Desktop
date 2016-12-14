import React, { Component } from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { connect } from 'react-redux';

import { hideModal, showModal, updateGlobalStatus } from './lib/actions';
import CreateModal from './CreateModal';
import Header from './Header';
import Installer from './Installer';
import MachineList from './MachineList';
import Modal from './Modal';
import Settings from './Settings';

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

		return <div className="App">
			{ installed ?
				<Header
					onRefresh={() => dispatch(updateGlobalStatus())}
					onShowCreate={() => dispatch(showModal('create'))}
					onShowSettings={() => dispatch(showModal('settings'))}
				/>
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
