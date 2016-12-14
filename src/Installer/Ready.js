import React from 'react';

import Button from '../Button';
import Step from '../Step';

export default props => <Step>
	<header>
		<h1>Hello.</h1>
	</header>

	<p>You're ready to go!</p>
	<p><strong>Note:</strong> Chassis Desktop is beta software. We'd really appreciate any feedback you have.</p>
	<p>Made with &hearts; by Bronson and Ryan.</p>

	<p>
		<Button
			icon="arrow-right"
			light
			onClick={ props.onNext }
		>Get Started!</Button>
	</p>
</Step>;
