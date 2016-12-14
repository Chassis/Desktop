import React from 'react';

import Button from './Button';

import './ItemList.css';

const ItemList = props => {
	let onAdd = () => {
		let next = props.value.slice();
		next.push('');
		props.onChange(next);
	};
	let onChange = (index, value) => {
		let next = props.value.slice();
		next[index] = value;
		props.onChange(next);
	};
	let onRemove = index => {
		let next = props.value.slice();
		next.splice(index, 1);
		props.onChange(next);
	};

	return <div className="ItemList">
		{props.value.map((item, index) =>
			<div key={ index }>
				<input
					placeholder={ props.placeholder }
					type="text"
					value={ item }
					onChange={ e => onChange( index, e.target.value ) }
				/>
				{ props.value.length > 1 ?
					<Button
						icon="trash"
						onClick={ e => onRemove( index ) }
					>Remove</Button>
				: null }
			</div>
		)}
		<Button
			icon="plus"
			onClick={ onAdd }
		>Add</Button>
	</div>;
};

ItemList.propTypes = {
	value: React.PropTypes.array.isRequired,
	onChange: React.PropTypes.func.isRequired,
};

export default ItemList;
