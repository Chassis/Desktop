import { remote } from 'electron';
import React from 'react';

import packageData from '../package.json';
import Icon from './Icon';

import './About.css';

export default class About extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			update: null,
		}
	}

	render() {
		const { update } = this.state;

		return <div className="About">
			<div className="description">
				<div className="logo">
					<img role="presentation" src="logo.png" />
				</div>
				<div className="name">
					<h2>Chassis Desktop</h2>
					<p className="version">
						<strong>{ packageData.version }</strong>
						{' '}
						<a href="https://github.com/Chassis/Desktop/releases">View releases</a>
					</p>
					{ /*update ? (
						update === 'download' ? (
							<p className="update" onClick={() => this.setState({ update: 'ready' })}>
								<Icon type="spinner" /> Downloading update&hellip;
							</p>
						) : (
							<p className="update" onClick={() => {remote.app.relaunch();remote.app.quit();}}>
								<button type="button">Restart Desktop to Update</button>
							</p>
						)
					) : (
						<p className="update">
							<button type="button" onClick={() => this.setState({ update: 'download' })}>
								Check for Updates
							</button>
						</p>
					)*/}
					<p className="credits">
						Chassis is produced by {' '}
						<a href="https://bronsonquick.com.au/">Bronson Quick</a>, {' '}
						<a href="https://rmccue.io/">Ryan McCue</a>,
						and <a href="https://github.com/Chassis/Chassis/graphs/contributors">contributors</a>.
						🇦🇺
					</p>
					<p className="commercial">
						Supported by <a href="https://hmn.md/">Human Made</a>,
						an enterprise WordPress agency.
						😘
					</p>
					<p className="design">
						Logo by <a href="http://sonjaleix.com/">Sonja Leix</a>.
						🥕
					</p>
				</div>
			</div>
			<footer>
				<nav>
					<ul>
						<li>
							<a href="https://github.com/Chassis/Desktop/blob/master/license.md">
								View license
							</a>
						</li>
						<li>
							<a href="https://github.com/Chassis/Desktop/graphs/contributors">
								View contributors
							</a>
						</li>
					</ul>
				</nav>
				<p className="for-you">
					Made with ❤️ just for you.
				</p>
			</footer>
		</div>
	}
}
