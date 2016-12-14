import React from 'react';

import Button from './Button';
import FormTable from './FormTable';

export default props => <div className="Settings">
	<header>
		<h1>Settings</h1>
	</header>

	<FormTable>
		<label>
			<span>Enable keyboard shortcut overlay</span>
			<input
				checked
				readOnly
				type="checkbox"
			/>
		</label>
	</FormTable>

	<p>
		<Button
			icon="times-circle"
			light
			shortcut="esc"
			onClick={ props.onDismiss }
		>Cancel</Button>
		<Button
			icon="check"
			light
			onClick={ props.onDismiss }
		>Save</Button>
	</p>
</div>;
