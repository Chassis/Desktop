import React from 'react';

import Button from '../Button';
import Step from '../Step';
import { TYPES } from './Type';

export default props => {
	let message;
	switch (props.type) {
		case TYPES.CREATE:
			message = <div>
				<p>You are about to create a new Chassis install.</p>;
				<p>
					<strong>Project Directory:</strong>
					<code>{ props.path }/</code>
				</p>
			</div>;
			break;

		case TYPES.RETROFIT:
			message = <p>You are adding Chassis to an existing WordPress installation.</p>;
			break;

		case TYPES.IMPORT:
			message = <p>You are adding a Chassis install to the client.</p>;
			break;

		default:
			return <Step><p>Unknown type!</p></Step>;
	}

	return <Step>
		<h2>Ready?</h2>
		{ message }
		<p>
			<strong>Chassis Directory:</strong>
			{ props.path }
		</p>
		<Button light>Cancel</Button>
		<Button light>Create</Button>
	</Step>;
};
