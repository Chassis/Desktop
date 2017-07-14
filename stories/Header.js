import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../src/Button';
import Header from '../src/Header';
import Icon from '../src/Icon';

storiesOf( 'Header', module )
	.addDecorator( story => (
		<div
			style={{
				width: 600,
				margin: 10,
			}}
		>
			{ story() }
		</div>
	))
	.add( 'with title', () => (
		<Header
			title="Hello"
		/>
	))
	.add( 'with custom title component', () => (
		<Header
			title={ <s>Title inside a Component</s> }
		/>
	))
	.add( 'with icon (as string)', () => (
		<Header
			icon="gear"
			title="Title"
		/>
	))
	.add( 'with icon (as component)', () => (
		<Header
			icon={ <span style={{ color: 'black' }}><Icon type="gear" /></span> }
			title="Title"
		/>
	))
	.add( 'with children', () => (
		<Header>
			<Button>Child Button</Button>
		</Header>
	))
	.add( 'with everything', () => (
		<Header
			icon="gear"
			title="Title"
		>
			<Button icon="bullhorn">Child Button</Button>
		</Header>
	));
