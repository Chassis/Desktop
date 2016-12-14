import React from 'react';

import Button from '../Button';
import Step from '../Step';

export default class Name extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
		};
	}

	render() {
		const { onSubmit } = this.props;
		const { name } = this.state;

		return <Step>
			<h2>Pick a Name</h2>
			<form onSubmit={e => { e.preventDefault(); onSubmit( name ); }}>
				<p>
					<input
						placeholder="My Project"
						type="text"
						value={ this.state.name }
						onChange={ e => this.setState({ name: e.target.value }) }
					/>
				</p>
				<div className="actions">
					<Button light onClick={ () => onSubmit( name ) }>Next</Button>
				</div>
			</form>
		</Step>;
	}
}
