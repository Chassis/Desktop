import React from 'react';

import './RadioList.css';

export default props => {
	let childProps = {
		current: props.value,
		onChange: props.onChange,
	};
	let children = React.Children.map( props.children, child => React.cloneElement( child, childProps ) );

	return <div className="RadioList">
		{ children }
	</div>;
};
