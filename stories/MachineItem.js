import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MachineItem from '../src/MachineItem';

const dummy_machine = {
	config: {
		hosts: [
			'vagrant.local',
		],
	},
	path: '/Users/rmccue/path/to/machine',
};

const defaults = {
	editing: false,
	// changes: {},
	isNext: false,
	isPrevious: false,
	machine: dummy_machine,
	selected: true,
	terminal: false,
	// status: 'not_created',
	onStartEditing: action( 'start-editing' ),
	onFinishEditing: action( 'finish-editing' ),
	onSave: action( 'save' ),
	onSelect: action( 'select' ),
	onDeselect: action( 'deselect' ),
	onDelete: action( '_delete' ),
	onRefresh: action( 'refresh' ),
	onRun: action( 'run' ),
};

storiesOf( 'MachineItem', module )
	.addDecorator( story => (
		<div style={{ width: 600, padding: 10, margin: 10, background: '#f6f6f6' }}>
			{ story() }
		</div>
	))
	.add( 'unselected', () => (
		<MachineItem
			{...defaults}
			selected={ false }
		/>
	))
	.add( 'selected', () => (
		<MachineItem {...defaults} />
	));
