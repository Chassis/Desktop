import React from 'react';

import Button from '../Button';
import Step from '../Step';


export default props => <Step>
	<header>
		<h1>Welcome to Chassis Desktop</h1>
	</header>

	<img role="presentation" src="logo.png" />
	<p>Welcome to Chassis Desktop. To help you get set up, we're going to run through some installation checks and make sure everything's installed.</p>
	<p>
		<Button
			icon="github"
			light
			shortcut="Cmd+L"
			onClick={ () => console.log('Worked.') }
		>
		 Connect
		</Button>
		<Button
			icon="arrow-right"
			light
			noborder
			onClick={ props.onNext }
		>
			Skip for now
		</Button>
	</p>
</Step>;
