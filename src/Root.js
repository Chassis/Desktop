import React, { Component } from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Splash from './Splash';

export default class Root extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showingSplash: true,
		};
	}

	componentDidMount() {
		this.setState({ showingSplash: false });
	}

	render() {
		let rootComponent = props => <div className="fader">{ props.children }</div>;

		return <CSSTransitionGroup
			component={ rootComponent }
			transitionEnterTimeout={ 400 }
			transitionLeaveTimeout={ 400 }
			transitionName="splash-fade"
		>
			{ this.state.showingSplash ?
				<div key="splash">
					<Splash />
				</div>
			:
				<div key="loaded">
					{ this.props.children }
				</div>
			}
		</CSSTransitionGroup>;
	}
}
