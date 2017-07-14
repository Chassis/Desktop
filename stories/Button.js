import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../src/Button';

const lightStyle = {
	padding: 10,
}
const darkStyle = {
	// width: '100%',
	background: '#66f',
	color: 'red',
	padding: 10,
};

storiesOf( 'Button', module )
	.addDecorator( story => (
		<div style={{
			width: 200,
			margin: 10,
		}}>{ story() }</div>
	))
	.add( 'default', () => (
		<div>
			<p style={ lightStyle }>
				<Button onClick={ action( 'click' ) }>Text</Button>
			</p>
			<p style={ darkStyle }>
				<Button onClick={ action( 'click' ) } light>Text</Button>
			</p>
		</div>
	))
	.add( 'noborder', () => (
		<div>
			<p style={ lightStyle }>
				<Button onClick={ action( 'click' ) } noborder>Text</Button>
			</p>
			<p style={ darkStyle }>
				<Button onClick={ action( 'click' ) } noborder light>Text</Button>
			</p>
		</div>
	))
	.add( 'tiny', () => (
		<div>
			<p style={ lightStyle }>
				<Button onClick={ action( 'click' ) } tiny>Text</Button>
			</p>
			<p style={ darkStyle }>
				<Button onClick={ action( 'click' ) } tiny light>Text</Button>
			</p>
		</div>
	))
	.add( 'icon', () => (
		<div>
			<p style={ lightStyle }>
				<Button icon="gear">Text</Button>
			</p>
			<p style={ darkStyle }>
				<Button icon="gear" light>Text</Button>
			</p>
		</div>
	));
