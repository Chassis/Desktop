import React from 'react';

export default props => {
	let className = `fa fa-${props.type}`;
	return <i className={ className } aria-hidden={true} />
}
