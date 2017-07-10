import ansiHTML from 'ansi-html';
import React from 'react';

import './Terminal.scss';

export default class Terminal extends React.Component {
	constructor(props) {
		super(props);

		// Store element ref.
		this.terminal = null;
	}

	componentDidUpdate() {
		if (this.terminal) {
			this.terminal.scrollTop = this.terminal.scrollHeight;
		}
	}

	render() {
		const { expanded, output } = this.props;

		let formattedOutput;
		let last;
		if ( output ) {
			formattedOutput = ansiHTML(output);
			last = ansiHTML(output.trim('\n').split('\n').slice(-1)[0]);
		} else {
			// Placeholder content for terminal.
			formattedOutput = last = '<span class="no-content">No output</span>';
		}

		return <div
			className={ expanded ? "Terminal full" : "Terminal preview" }
			ref={ ref => this.terminal = ref }
		>
			<pre
				dangerouslySetInnerHTML={{ __html: expanded ? formattedOutput : last }}
			/>
		</div>;
	}
}
