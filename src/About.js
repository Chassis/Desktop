import React from 'react';

import packageData from '../package.json';

import './About.css';

export default class About extends React.Component {
	render() {
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
