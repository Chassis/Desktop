import React from 'react';

import Icon from './Icon';

import './Header.css';

export default class Header extends React.Component {
	render() {
		const { children, icon, title } = this.props;

		// `icon` can be an element, an icon type, or null
		const iconElement = icon ? ( typeof icon === "string" ? <Icon type={ icon } /> : icon ) : null;

		return <div className="Header">
			<div className="title">
				{ iconElement }
				<span>{ title }</span>
			</div>
			<div className="actions">{ children }</div>
		</div>;
	}
}

Header.propTypes = {
	icon: React.PropTypes.oneOfType([
		React.PropTypes.element,
		React.PropTypes.string
	]),
	title: React.PropTypes.string.isRequired,
};
