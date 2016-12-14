import React, { PropTypes } from 'react';

const RadioOption = props => {
	const value = props.value || "" + props.children;

	return <label>
		<input
			checked={ ( "" + props.current ) === ( "" + value ) }
			type="radio"
			value={ value }
			onChange={ () => props.onChange( value ) }
		/>
		{ props.children }
	</label>;
};

let scalarType = PropTypes.oneOfType([
	PropTypes.number,
	PropTypes.string,
	PropTypes.null,
]);

RadioOption.propTypes = {
	current: scalarType,
	value: scalarType.isRequired,
	onChange: PropTypes.func,
};

export default RadioOption;
