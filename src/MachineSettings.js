import React from 'react';
import tildify from 'tildify';

import Button from './Button';
import FormTable from './Form/Table';
import ItemList from './ItemList';
import RadioList from './RadioList';
import RadioOption from './RadioOption';
import FixedValue from './Form/FixedValue';

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
		const { changes, machine, onChange, onDelete, onRefresh } = this.props;
		const config = { ...machine.config, ...changes };

		return <form className="MachineSettings">
			<FormTable>
				<div>
					<div>Path:</div>
					<div>
						<FixedValue value={ tildify( machine.path ) } />
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
					<select
						value={ config.php === 7 ? '7.0' : config.php }
						onChange={ e => onChange({ php: e.target.value }) }
					>
						<option>5.3</option>
						<option>5.4</option>
						<option>5.5</option>
						<option>5.6</option>
						<option>7.0</option>
						<option>7.1</option>
					</select>
				</label>
				<div className="no-label">
					<div>
						<label><input
							checked={ config.multisite }
							type="checkbox"
							value={ true }
							onChange={ e => onChange({ multisite: !config.multisite }) }
						/>
						Use multisite?</label>
						<p className="description">Only subdirectory-based multisite is currently supported.</p>
					</div>
				</div>
				{/*
				<div>
					<div>Extensions:</div>
					<div>
						<Button icon="plus">Add</Button>
					</div>
				</div>
				*/}
			</FormTable>
			{/*<Button icon="pencil">Edit <code>config.local.yaml</code> in your editor</Button>*/}

			<div className="machine-actions">
				<h3>Actions</h3>

				<p><Button icon="refresh" shortcut="cmd+r" onClick={() => onRefresh()}>Refresh details</Button></p>
				<p className="description">This will refresh config details from the Vagrant and YAML data.</p>

				<p><Button icon="trash" onClick={ onDelete }>Remove this machine</Button></p>
				<p className="description">This will remove this box from the app. It will not delete any files.</p>
			</div>
		</form>;
	}
}
