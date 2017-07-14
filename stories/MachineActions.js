import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MachineActions from '../src/MachineActions';

const dummy_machine = {
	config: {
		hosts: [
			'vagrant.local',
		],
	},
	path: '/Users/rmccue/path/to/machine',
};

const defaults = {
	changes: {},
	machine: dummy_machine,
	status: 'not_created',
	onLaunch: action( 'launch' ),
	onHalt: action( 'halt' ),
	onEdit: action( 'edit' ),
	onFinder: action( 'finder' ),
	onTerminal: action( 'terminal' ),
	onRefresh: action( 'refresh' ),
};

storiesOf( 'MachineActions', module )
	.addDecorator( story => (
		<div style={{ width: 600, padding: 10, margin: 10, background: '#f6f6f6' }}>
			{ story() }
		</div>
	))
	.add( 'initial state', () => (
		<MachineActions {...defaults} />
	))
	.add( 'off', () => (
		<MachineActions
			{...defaults}
			status="poweroff"
		/>
	))
	.add( 'launching', () => (
		<MachineActions
			{...defaults}
			status="launching"
		/>
	))
	.add( 'loading', () => (
		<MachineActions
			{...defaults}
			status="loading"
		/>
	))
	.add( 'running', () => (
		<MachineActions
			{...defaults}
			status="running"
		/>
	))
	.add( 'halting', () => (
		<MachineActions
			{...defaults}
			status="halting"
		/>
	))
	.add( 'unknown', () => (
		<MachineActions
			{...defaults}
			status="__DUMMY_VAL"
		/>
	));
