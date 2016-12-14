import React from 'react';
import tildify from 'tildify';

import Button from '../Button';
import FormTable from '../FormTable';
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
			message = <p>You are adding an existing Chassis box to the list.</p>;
			break;

		default:
			return <Step><p>Unknown type!</p></Step>;
	}

	return <Step>
		<h2>Ready?</h2>
		{ message }

		<FormTable>
			<label>
				<div>Name</div>
				<input type="text" value={ props.name } />
			</label>
			<div>
				<div>Chassis Directory</div>
				<div style={{ textAlign: "left" }}>
					<code>{ tildify( props.path ) }</code>
				</div>
			</div>
		</FormTable>

		<Button light>Cancel</Button>
		<Button light onClick={ props.onSubmit }>Create</Button>
	</Step>;
};
