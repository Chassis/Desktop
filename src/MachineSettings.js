import React from 'react';

import Button from './Button';
import FormTable from './FormTable';
import ItemList from './ItemList';
import RadioList from './RadioList';
import RadioOption from './RadioOption';

import './MachineSettings.css';

export default class MachineSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	onChangeHost(index, value) {
		let hosts = (this.state.hosts || this.props.machine.config.hosts).slice();
		hosts[ index ] = value;
		this.setState({ hosts });
	}

	render() {
		const { changes, machine, onChange } = this.props;
		const config = { ...machine.config, ...changes };

		return <form className="MachineSettings">
			<FormTable>
				<div>
					<div>Path:</div>
					<div>
						<code>{ machine.path }</code>
						<p className="description">Paths cannot be changed once added.</p>
					</div>
				</div>
				<label>
					<div>Hosts:</div>
					<ItemList
						value={ config.hosts }
						onChange={ hosts => onChange({ hosts }) }
					/>
				</label>
				<div>
					<div>IP Address:</div>
					<RadioList value={ config.ip } onChange={ ip => onChange({ ip }) }>
						<RadioOption value="dhcp">Auto-Assign</RadioOption>
						<RadioOption value="manual">
							<input
								placeholder="192.168.50.40"
								type="text"
							/>
						</RadioOption>
					</RadioList>
				</div>
				<label>
					<div>PHP Version:</div>
					<select value={ config.php } onChange={ e => onChange({ php: e.target.value }) }>
						<option>5.3</option>
						<option>5.4</option>
						<option>5.5</option>
						<option>5.6</option>
						<option>7.0</option>
						<option>7.1</option>
					</select>
				</label>
				<label>
					<div>Use multisite?</div>
					<input
						checked={ config.multisite }
						type="checkbox"
						value={ true }
						onChange={ e => onChange({ multisite: !config.multisite }) }
					/>
				</label>
				{/*
				<div>
					<div>Extensions:</div>
					<div>
						<Button icon="plus">Add</Button>
					</div>
				</div>
				*/}
			</FormTable>
			<Button icon="pencil">Edit <code>config.local.yaml</code> in your editor</Button>
			<Button icon="trash">Remove this machine</Button>
		</form>;
	}
}
