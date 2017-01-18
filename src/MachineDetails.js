import React from 'react';
import {spawn} from 'child_process';
import { shell } from 'electron';
import ansiHTML from 'ansi-html';
// import {AllHtmlEntities} from 'html-entities';

import './MachineDetails.scss';

import Button from './Button';
import MachineActions from './MachineActions';

// const entities = new AllHtmlEntities();

const stateForCommand = terminal => {
	const command = terminal.running ? `${terminal.command} ${terminal.args[0]}` : false;
	switch ( command ) {
		case 'vagrant up':
			return 'launching';

		case 'vagrant halt':
			return 'halting';

		default:
			return null;
	}
};

export default class MachineDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showingConsole: false,
		};
	}

	componentDidUpdate() {
		if (this.terminal) {
			this.terminal.scrollTop = this.terminal.scrollHeight;
		}
	}

	componentWillReceiveProps(nextProps) {
		if (!this.props.terminal) {
			return;
		}

		if (this.props.terminal.running && ! nextProps.terminal.running) {
			this.props.onRefresh();
		}
	}

	onFinder() {
		shell.showItemInFolder( this.props.machine.path );
	}

	/*onEditor() {
		alert('To-do!');
		return;
		//spawn('open', ['-t', '.'], {
		//	cwd: this.props.machine.path,
		//});
	}*/

	onTerminal() {
		spawn('open', ['-a', 'Terminal', '.'], {
			cwd: this.props.machine.path,
		});
	}

	render() {
		// let terminal = ansiHTML(entities.encode(this.state.output));
		let { machine, terminal } = this.props;
		let { showingConsole } = this.state;

		let status = stateForCommand( terminal ) || machine.status;

		let output;
		let last;
		if ( terminal.output ) {
			output = ansiHTML(terminal.output);
			last = ansiHTML(terminal.output.trim('\n').split('\n').slice(-1)[0]);
		} else {
			// Placeholder content for terminal.
			output = last = '<span class="no-content">No output</span>';
		}

		return <div className="MachineDetails">
			<MachineActions
				machine={ machine }
				status={ status }
				onEdit={ this.props.onEdit }
				onFinder={() => this.onFinder()}
				onHalt={() => this.props.onRun( 'vagrant', [ 'halt' ] )}
				onLaunch={() => this.props.onRun( 'vagrant', [ 'up' ] )}
				onRefresh={() => this.props.onRefresh()}
				onTerminal={() => this.onTerminal()}
			/>

			<div className="terminal-wrap">
				<div
					className={ showingConsole ? "terminal full" : "terminal preview" }
					ref={ ref => this.terminal = ref }
				>
					<pre
						dangerouslySetInnerHTML={{ __html: showingConsole ? output : last }}
					/>
				</div>
				<Button
					icon={ showingConsole ? "minus-square-o" : "plus-square-o" }
					light
					tiny
					onClick={ () => this.setState({ showingConsole: !showingConsole }) }
				>{ showingConsole ? "Collapse" : "Expand" }</Button>
			</div>
		</div>;
	}
}
