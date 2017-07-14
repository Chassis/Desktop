import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MachineSettings from '../src/MachineSettings';

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
	onChange: action( 'change' ),
	onDelete: action( 'remove' ),
	onRefresh: action( 'refresh' ),
};

storiesOf( 'MachineSettings', module )
	.add( 'initial state', () => (
		<MachineSettings {...defaults} />
	));
