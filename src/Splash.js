import React from 'react';

// Note: CSS defined in public/loader.css to load before JS does.

export default class Splash extends React.Component {
	render() {
		return <div className="Splash">
			<img role="presentation" src="logo.png" />
			<h1>
				<span>Loading&hellip;</span>
			</h1>
		</div>;
	}
}
