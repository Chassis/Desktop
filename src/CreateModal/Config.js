import React from 'react';
import tildify from 'tildify';

import Button from '../Button';
import FormTable from '../FormTable';
import FixedValue from '../Form/FixedValue';
import Step from '../Step';
import { TYPES } from './Type';

export default props => {
	let message, buttonText;
	switch (props.type) {
		case TYPES.CREATE:
			message = <div>
				<p>You are about to create a new Chassis install.</p>;
				<p>
					<strong>Project Directory:</strong>
					<code>{ props.path }/</code>
				</p>
			</div>;
			buttonText = 'Create';
			break;

		case TYPES.RETROFIT:
			message = <p>You are adding Chassis to an existing WordPress installation.</p>;
			buttonText = 'Create';
			break;

		case TYPES.IMPORT:
			message = <p>You are adding an existing Chassis box to the list.</p>;
			buttonText = 'Add';
			break;

		default:
			return <Step><p>Unknown type!</p></Step>;
	}

	return <Step>
		<h2>Ready?</h2>
		{ message }

		<FormTable>
			<label>
				<div>Name:</div>
				<input
					type="text"
					value={ props.name }
					onChange={ e => props.onChange({ name: e.target.value }) }
				/>
			</label>
			<div>
				<div>Chassis Directory:</div>
				<FixedValue
					value={ tildify( props.path ) }
				/>
			</div>
		</FormTable>

		<Button icon="plus-circle" onClick={ props.onSubmit }>{ buttonText }</Button>
	</Step>;
};
