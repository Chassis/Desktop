import React from 'react';

import KeyHandler from './KeyHandler';
import Icon from './Icon';
import './Button.css';

export default props => {
	let classes = ["Button"];
	if (props.light) {
		classes.push("light");
	}
	if (props.noborder) {
		classes.push("noborder");
	}
	if (props.tiny) {
		classes.push("tiny");
	}

	let keyHandler = props.shortcut ? <KeyHandler shortcut={ props.shortcut } onTrigger={ props.onClick } /> : null;

	return <button
		className={ classes.join(' ') }
		title={ props.title || "" }
		type={ props.submit ? "submit" : "button" }
		onClick={ props.onClick }
	>
		{ props.icon ? <Icon type={ props.icon } /> : null }
		{ props.children }
		{ keyHandler }
	</button>;
};
