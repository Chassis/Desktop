import React from 'react';
import './Steps.css';

export default class Steps extends React.Component {
	render() {
		let offset = this.props.step * 100;
		let style = {
			transform: 'translatex(-' + offset +'%)',
		};

		return <ul className="Steps" style={ style }>
			{ this.props.children }
		</ul>;
	}
}
