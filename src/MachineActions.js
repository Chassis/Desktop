import React from 'react';

import openBrowser from './lib/openBrowser';
import Button from './Button';
import LoadingIndicator from './LoadingIndicator';

import './MachineActions.css';

export default props => {
	let mainActions, status;
	let refreshButton = null; //<Button icon="refresh" shortcut="cmd+r" onClick={() => props.onRefresh()}>Refresh</Button>;
	switch (props.status) {
		case 'not_created':
		case 'poweroff':
			status = <p>Status: <strong>Off</strong> { refreshButton }</p>
			mainActions = <p className="primary">
				<Button icon="play-circle" shortcut="cmd+u" onClick={() => props.onLaunch()}>Launch</Button>
			</p>;
			break;

		case 'running':
			status = <p>Status: <strong>Running</strong> { refreshButton }</p>;
			mainActions = <p className="primary">
				<Button icon="play-circle" shortcut="cmd+u" onClick={() => props.onLaunch()}>Launch</Button>
				<Button icon="stop-circle" shortcut="cmd+k" onClick={() => props.onHalt()}>Stop</Button>
			</p>;
			break;

		case 'loading':
			status = <p>Status: <strong>Loading</strong> <LoadingIndicator /> { refreshButton }</p>;
			mainActions = <p className="primary"></p>;
			break;

		case 'launching':
			status = <p>Status: <strong>Launching</strong> <LoadingIndicator /></p>;
			// mainActions = <p className="primary"><Button>Cancel</Button></p>;
			break;

		case 'halting':
			status = <p>Status: <strong>Halting</strong> <LoadingIndicator /></p>;
			// mainActions = <p className="primary"><Button>Cancel</Button></p>;
			break;

		default:
			status = <p>Status: <strong>Unknown</strong> { refreshButton }</p>;
			mainActions = <p className="primary"></p>;
			break;
	}

	let domain = ( props.machine.config && "hosts" in props.machine.config ) ? props.machine.config.hosts[0] : null;

	return <div className="MachineActions">
		<div>
			{ status }
			{ mainActions }
		</div>

		<div className="secondary">
			<p>
				<Button
					icon="gear"
					shortcut="cmd+s"
					onClick={() => props.onEdit()}
				>Settings</Button>
			</p>
			<p>
				{ props.status === 'running' && domain ?
					<Button
						icon="external-link"
						shortcut="cmd+o"
						title="Open in Browser"
						onClick={() => openBrowser(`http://${domain}/`)}
					>Open</Button>
				: null }

				<Button
					icon="folder-open-o"
					shortcut="cmd+f"
					title="Reveal in Browser"
					onClick={() => props.onFinder()}
				>Reveal</Button>
				<Button
					icon="terminal"
					shortcut="cmd+t"
					title="Open in Terminal"
					onClick={() => props.onTerminal()}
				>Terminal</Button>
			</p>
		</div>
	</div>;
};
