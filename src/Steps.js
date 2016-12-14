import React from 'react';
import CSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import './Steps.scss';

const transitionProps = {
	className: "Steps",
	component: "ul",
	transitionEnterTimeout: 700,
	transitionLeaveTimeout: 700,
};

export default class Steps extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			direction: "next",
		};
	}

	componentWillReceiveProps(nextProps) {
		if ( nextProps.step > this.props.step ) {
			this.setState({ direction: "next" });
		} else if ( nextProps.step < this.props.step ) {
			this.setState({ direction: "back" });
		}
	}

	render() {
		let current = this.props.children.filter(item => !!item).slice( this.props.step, this.props.step + 1 );

		const transitionName = this.state.direction === "next" ? "step-next" : "step-back";

		return <CSSTransitionGroup { ...transitionProps } transitionName={ transitionName }>
			{ current }
		</CSSTransitionGroup>
	}
}
