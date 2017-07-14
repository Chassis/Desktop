import chalk from 'chalk';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Terminal from '../src/Terminal';

const chalker = new chalk.constructor({
	enabled: true,
});

const dummy_output = [
	'$ echo This is an example.',
	'This is an example',
].join( '\n' );

const all_colors = Object.keys( chalk.styles ).map( color => chalker[ color ]( color ) );
const dummy_colored_output = [
	'$ ./output_colors',
	`Here is ${chalker.red('some red text')}, followed by ${chalker.blue('blue text')}`,
	...all_colors,
].join( '\n' );


storiesOf( 'Terminal', module )
	.add( 'default', () => (
		<Terminal expanded />
	))
	.add( 'collapsed', () => (
		<Terminal />
	))
	.add( 'with output', () => (
		<Terminal
			expanded
			output={ dummy_output }
		/>
	))
	.add( 'collapsed with output', () => (
		<Terminal
			output={ dummy_output }
		/>
	))
	.add( 'colored output', () => (
		<Terminal
			expanded
			output={ dummy_colored_output }
		/>
	));
