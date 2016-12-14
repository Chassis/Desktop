import React from 'react';

import Button from '../Button';
import Step from '../Step';
import formatPath from '../lib/formatPath';

import './ImportBoxes.css';

export default class ImportBoxes extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: {},
		};
	}

	onCheck(box, value) {
		this.setState( state => {
			const diff = {};
			diff[ box.directory ] = value;
			return { selected: { ...state.selected, ...diff } };
		});
	}

	render() {
		let boxes = this.props.boxes.slice();
		boxes.sort((a, b) => {
			const left = a.directory.toLowerCase();
			const right = b.directory.toLowerCase();
			if ( left > right ) {
				return -1;
			}

			return left === right ? 0 : -1;
		});

		const selected = Object.keys(this.state.selected).filter(key => this.state.selected[key]);

		return <Step className="ImportBoxes">
			<header>
				<h1>Import Existing Boxes</h1>
			</header>

			<p>We've found some existing boxes on your system. Want to import them?</p>

			<ul className="box-list">
				{ boxes.map( box =>
					<li key={ box.directory }>
						<label>
							<input
								checked={ selected.indexOf( box.directory ) >= 0 }
								type="checkbox"
								readOnly
								onChange={ e => this.onCheck( box, e.target.checked ) }
							/>
							<code>{ formatPath( box.directory ) }</code>
						</label>
					</li>
				)}
			</ul>

			{ selected.length > 0 ?
				<p className="button-hole">
					<span>Importing { selected.length } { selected.length === 1 ? "box" : "boxes" }.</span>
					<Button
						icon="plus-square-o"
						light
						onClick={() => {}}
					>Import</Button>
				</p>
			:
				<p className="button-hole">
					<Button
						icon="arrow-right"
						light
						onClick={ this.props.onNext }
					>Skip Import</Button>
				</p>
			}
		</Step>;
	}
}
