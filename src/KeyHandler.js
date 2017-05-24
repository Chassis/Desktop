import React from 'react';
import { connect } from 'react-redux';

import './KeyHandler.css';

class KeyHandler extends React.Component {
	constructor(props) {
		super(props);
		this.handler = null
	}

	componentDidMount() {
		// Register key handler.
		this.handler = window.keyHandler.register( this.props.shortcut, e => {
			e.preventDefault();
			this.props.onTrigger();
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.shortcut !== nextProps.shortcut) {
			// Unregister and re-register.
			window.keyHandler.unregister( this.props.shortcut, this.handler );
		}
	}

	componentWillUnmount() {
		// Unregister.
		window.keyHandler.unregister( this.props.shortcut, this.handler );
	}

	render() {
		if ( ! this.props.enabled ) {
			return null;
		}

		let shortcut = this.props.shortcut;
		let keyText = shortcut.toLowerCase()
			.replace('ctrl', '^')
			.replace('cmd', '\u2318')
			.replace('shift', '\u21E7')
			.replace('left', '\u2190')
			.replace('up', '\u2191')
			.replace('right', '\u2192')
			.replace('down', '\u2193')
			.toUpperCase();

		let classes = [ "KeyHandler" ];
		if ( this.props.showKeys ) {
			classes.push( "visible" );
		}

		return <span className={ classes.join( ' ' ) }>
			<span>{ keyText }</span>
		</span>;
	}
};

KeyHandler.propTypes = {
	shortcut: React.PropTypes.string.isRequired,
	onTrigger: React.PropTypes.func,
};

const mapStateToProps = state => {
	return {
		...state.ui,
		enabled: state.preferences.showShortcuts,
	};
};

export default connect( mapStateToProps )( KeyHandler );
