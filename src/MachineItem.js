import isEqual from 'is-equal';
import React from 'react';

import formatPath from './lib/formatPath';
import Button from './Button';
import KeyHandler from './KeyHandler';
import MachineDetails from './MachineDetails';
import MachineSettings from './MachineSettings';

import './MachineItem.css';

const eachObject = (obj, callback) => {
	Object.keys(obj).map(key => [key, obj[key]]).forEach(([key, value]) => {
		callback( value, key );
	});
};

const empty = obj => Object.keys( obj ).length === 0;

export default class MachineItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			nextConfig: {},
			editing: false,
			name: props.machine.name,
		};
	}

	componentWillReceiveProps(nextProps) {
		if ( ! nextProps.selected && this.state.editing ) {
			this.onDismiss();
		}
	}

	getChanges() {
		const { nextConfig } = this.state;
		const { config } = this.props.machine;

		let nextMachine = {};
		console.log( nextConfig, config );

		if (nextConfig.name !== this.props.machine.name) {
			nextMachine.name = nextConfig.name;
		}

		// Filter out any values that match existing.
		let changes = {};
		eachObject( nextConfig.config, (value, key) => {
			if ( ! ( key in config ) || isEqual( value, config[key] ) ) {
				return;
			}

			changes[key] = value;
		});

		if ( ! empty( changes ) ) {
			nextMachine.config = changes;
		}

		return nextMachine;
	}

	onDismiss() {
		this.props.onFinishEditing();
	}

	onStartEditing() {
		this.setState({
			nextConfig: {
				name: this.props.machine.name || "",
				config: this.props.machine.config || {},
			},
		});
		this.props.onStartEditing();
	}

	onEdit( data ) {
		this.setState( state => ({ nextConfig: { ...state.nextConfig, ...data} }) );
	}

	onSave() {
		const nextMachine = this.getChanges();

		if ( ! empty( nextMachine ) ) {
			this.props.onSave( nextMachine );
		}

		this.onDismiss();
	}

	render() {
		const props = this.props;
		const { editing, machine, terminal } = props;
		const { nextConfig } = this.state;

		let classes = [ 'MachineItem' ];
		if ( props.selected ) {
			classes.push('selected');
		}
		switch ( machine.status ) {
			case 'running':
				classes.push('running');
				break;

			case 'loading':
				classes.push('indeterminate');
				break;

			default:
				break;
		}

		let className = classes.join(' ');

		let domain = ( machine.config && "hosts" in machine.config ) ? machine.config.hosts[0] : null;

		return <div className={ className }>
			<div className="row" onClick={ () => props.selected ? props.onDeselect() : props.onSelect() }>
				<div className="status">
					<svg viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
					</svg>
				</div>
				<div className="info">
					{ editing ?
						<h1>
							<input
								type="text"
								value={ nextConfig.name }
								onChange={ e => this.onEdit({ name: e.target.value }) }
								onClick={ e => e.stopPropagation() }
							/>
						</h1>
					:
						<h1>{ machine.name }</h1>
					}
					<p>{ domain }</p>

					{ props.isNext ?
						<KeyHandler shortcut="cmd+down" onTrigger={() => props.onSelect()} />
					: null }
					{ props.isPrevious ?
						<KeyHandler shortcut="cmd+up" onTrigger={() => props.onSelect()} />
					: null }
				</div>

				{ editing ?
					<div onClick={e => e.stopPropagation()}>
						<Button
							icon="check"
							light
							shortcut="cmd+s"
							onClick={ () => this.onSave() }
						>{ empty( this.getChanges() ) ? "Done" : "Save" }</Button>
					</div>
				:
					<div className="domain">
						<p><code>{ formatPath( machine.path ) }</code></p>
					</div>
				}
			</div>

			{ props.selected ? (
				editing ? (
					<MachineSettings
						changes={ nextConfig.config }
						machine={ machine }
						onChange={ config => this.onEdit({ config }) }
						onDelete={ props.onDelete }
						onDismiss={ () => this.onDismiss() }
						onSave={ () => this.onSave() }
					/>
				) : (
					<MachineDetails
						machine={ machine }
						terminal={ terminal }
						onEdit={ () => this.onStartEditing() }
						onRun={ ( ...args ) => props.onRun(...args) }
						onRefresh={ props.onRefresh }
					/>
				)
			) : null }
		</div>
	}
}
